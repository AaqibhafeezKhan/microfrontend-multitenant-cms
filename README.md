# Multi-Tenant CMS Platform — Microfrontend Architecture Showcase

A production-grade monorepo demonstrating microfrontend architecture with intentional framework choices, multi-tenant design, and three cross-app communication strategies — built to the standard a staff engineer would expect.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser                                   │
│                                                             │
│   ┌──────────────────────────────────────────────────────┐  │
│   │              apps/shell  (port 3000)                 │  │
│   │         Single-SPA Root Orchestrator                 │  │
│   │         Webpack 5 Module Federation Host             │  │
│   │                                                      │  │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │  │
│   │  │editorial │ │  media   │ │   auth   │            │  │
│   │  │ React 18 │ │  Vue 3   │ │Angular17 │            │  │
│   │  │  :3001   │ │  :3002   │ │  :3003   │            │  │
│   │  └──────────┘ └──────────┘ └──────────┘            │  │
│   │                                                      │  │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │  │
│   │  │  collab  │ │analytics │ │ settings │            │  │
│   │  │ Svelte 4 │ │ Next.js  │ │  Lit 3   │            │  │
│   │  │  :3004   │ │  :3005   │ │  :3006   │            │  │
│   │  └──────────┘ └──────────┘ └──────────┘            │  │
│   └──────────────────────────────────────────────────────┘  │
│                         ▲                                    │
│            ┌────────────┼────────────┐                      │
│            │            │            │                      │
│   ┌────────────┐ ┌──────────┐ ┌──────────────┐            │
│   │ event-bus  │ │shared-   │ │tenant-config │            │
│   │ DOM events │ │ store    │ │ CSS vars +   │            │
│   │ + registry │ │ Zustand  │ │ feature flags│            │
│   └────────────┘ └──────────┘ └──────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## Framework Selection Rationale

Every framework choice reflects a real team constraint or capability trade-off, not a showcase for its own sake.

| App | Framework | Justification |
|---|---|---|
| `shell` | Single-SPA + Webpack 5 | Industry standard MFE orchestrator. Module Federation handles shared dependency deduplication at the network layer — React, Vue, Zustand are loaded once regardless of how many remotes consume them. |
| `editorial` | React 18 | Largest ecosystem, best TypeScript DX for complex form state. React Router + Zustand is a battle-tested composition for content editing flows with draft/publish lifecycles. |
| `media` | Vue 3 + Pinia | Vue 3's Composition API + `<script setup>` is genuinely the most ergonomic DX for reactive list/grid UI with local state. Pinia's devtools integration is valuable for debugging asset state. |
| `auth` | Angular 17 | Angular's opinionated DI and reactive forms are the correct choice for auth forms that require strict validation, service isolation, and testability. Angular standalone components avoid the NgModule ceremony. |
| `collab` | Svelte 4 | Svelte compiles away the framework. Real-time collaborative UI (cursor tracking, participant presence) benefits enormously from Svelte's fine-grained reactivity without VDOM diffing overhead. |
| `analytics` | Next.js 14 (App Router) | Analytics dashboards are read-heavy and benefit from RSC server rendering. The App Router's async components allow data co-location without client JS overhead for the metrics server component. |
| `settings` | Lit 3 | Settings panels map directly to Web Components — they are genuinely framework-agnostic UI primitives. Shadow DOM provides CSS isolation without build-time tooling. This is the correct use case for custom elements. |

---

## Monorepo Structure

```
/
├── pnpm-workspace.yaml
├── package.json            ← root scripts via Turborepo
├── turbo.json              ← pipeline: build → type-check → lint
├── .gitignore
├── .nvmrc                  ← Node 20.11.0
├── .env.example
│
├── apps/
│   ├── shell/              ← Single-SPA host, Webpack MF host
│   ├── editorial/          ← React 18, React Router, Zustand
│   ├── media/              ← Vue 3, Vue Router, Pinia
│   ├── auth/               ← Angular 17, Reactive Forms
│   ├── collab/             ← Svelte 4, event bus cursor tracking
│   ├── analytics/          ← Next.js 14 App Router, Recharts
│   └── settings/           ← Lit 3 custom elements
│
└── packages/
    ├── event-bus/          ← Typed CustomEvent bus (singleton on window)
    ├── tenant-config/      ← TenantConfig interface, resolveTenant(), isFlagEnabled()
    ├── shared-store/       ← Federated Zustand singleton + useQueryParam
    └── ui-tokens/          ← CSS custom properties design token system
```

---

## Communication Strategies

Three patterns are implemented with working TypeScript — each suited to a different category of problem.

### 1. Custom DOM Events via `@cms/event-bus`

Used for fire-and-forget cross-app notifications (auth events, publish events, media uploads). Each event is strictly typed via `CmsEventMap`. The bus is a singleton on `window.__CMS_EVENT_BUS__` so it survives Module Federation boundary crossings.

```typescript
import { eventBus } from "@cms/event-bus";

eventBus.emit("editorial:content-published", {
  contentId: "content_001",
  slug: "my-article",
  tenantId: "tenant_acme_001",
  publishedBy: "user_abc",
});

const unsubscribe = eventBus.on("editorial:content-published", (payload) => {
  console.log(payload.slug);
});
unsubscribe();
```

### 2. Federated Zustand Singleton via `@cms/shared-store`

Used for shared session state (auth user, current path, notifications). The store is mounted once on `window.__CMS_SHARED_STORE__`. Every MFE reads from the same object reference, making it safe across independently deployed remotes.

```typescript
import { useSharedStore } from "@cms/shared-store";

const user = useSharedStore.getState().auth.user;
useSharedStore.subscribe(
  (state) => state.auth.user,
  (user) => console.log("user changed", user)
);
```

### 3. URL-Based State via `useQueryParam`

Used for link-shareable, browser-history-friendly cross-app coordination. The `useQueryParam` hook works in React components; `getQueryParam`/`setQueryParam` utilities work anywhere.

```typescript
import { useQueryParam } from "@cms/shared-store";

const [contentId, setContentId] = useQueryParam("contentId");
```

---

## Multi-Tenancy Design

Tenant resolution occurs at shell bootstrap before any microfrontend mounts:

1. `resolveTenant()` checks `?tenant=` query parameter first (localhost dev)
2. Falls back to subdomain extraction (`acme.cms.com` → `acme`)
3. Defaults to `acme` tenant if no match

After resolution:
- `injectTenantCssVariables(tenant)` writes all branding values to `:root` CSS custom properties
- Each MFE receives `tenant` as `customProps` from Single-SPA
- Feature flags are checked with `isFlagEnabled(tenant, "collaborativeEditing")` — flagged features are hidden from nav and disabled in UI

### Available Tenants (mock registry)

| Slug | Plan | Features |
|---|---|---|
| `acme` | Enterprise | All features enabled, SSO, multi-language |
| `globex` | Professional | No webhooks, no multi-language, no SSO |

Switch tenant locally: `http://localhost:3000?tenant=globex`

---

## Getting Started

### Prerequisites

- Node.js 20.11.0 (via `.nvmrc`)
- pnpm 9.1.0

```bash
npm install -g pnpm@9.1.0
```

### Install

```bash
pnpm install
```

### Build shared packages first

```bash
pnpm turbo run build --filter=@cms/event-bus --filter=@cms/tenant-config --filter=@cms/shared-store --filter=@cms/ui-tokens
```

### Run all apps in development

```bash
pnpm dev
```

This runs all 7 dev servers in parallel via Turborepo:

| App | URL |
|---|---|
| shell | http://localhost:3000 |
| editorial | http://localhost:3001 |
| media | http://localhost:3002 |
| auth | http://localhost:3003 |
| collab | http://localhost:3004 |
| analytics | http://localhost:3005 |
| settings | http://localhost:3006 |

Navigate to `http://localhost:3000` — the shell loads all remotes from localhost.

### Run a single app

```bash
pnpm turbo run dev --filter=@cms/editorial
```

### Type-check all apps

```bash
pnpm type-check
```

### Build for production

```bash
pnpm build
```

---

## Deployment

### Vercel

Each MFE is deployed as an independent Vercel project. The shell rewrites `/analytics/*` to the Next.js deployment.

1. Import each `apps/*` directory as a separate Vercel project
2. Set environment variables (from `.env.example`) as Vercel environment variables
3. Set the `*_REMOTE_URL` variables to each deployment's `remoteEntry.js` URL
4. Deploy the shell — it wires all remotes together at runtime

Required secrets:
```
EDITORIAL_REMOTE_URL
MEDIA_REMOTE_URL
AUTH_REMOTE_URL
COLLAB_REMOTE_URL
ANALYTICS_REMOTE_URL
SETTINGS_REMOTE_URL
```

### Netlify

The root `netlify.toml` builds the shell by default. Each MFE can be deployed to a separate Netlify site using the per-context build commands.

1. Connect the repo to Netlify
2. The root site builds and deploys `apps/shell`
3. Create additional Netlify sites for each `apps/*` using the context commands in `netlify.toml`
4. Update `[build.environment]` remote URL values to match each site's deploy URL

All sites include `/* /index.html 200` redirect for SPA routing.

### GitHub Pages

The `deploy.yml` workflow triggers on push to `main`:

1. Builds all MFE remotes
2. Builds the shell pointing at the correct remote URLs (from GitHub Secrets)
3. Assembles everything into a `gh-pages/` directory:
   - `/` — shell
   - `/editorial/` — editorial remote
   - `/media/` — media remote
   - etc.
4. Deploys to the `gh-pages` branch

Required GitHub Secrets:
```
TURBO_TOKEN
TURBO_TEAM
EDITORIAL_REMOTE_URL
MEDIA_REMOTE_URL
AUTH_REMOTE_URL
COLLAB_REMOTE_URL
ANALYTICS_REMOTE_URL
SETTINGS_REMOTE_URL
```

Enable GitHub Pages from the `gh-pages` branch in repository settings.

---

## CI/CD

| Workflow | Trigger | Steps |
|---|---|---|
| `ci.yml` | PR to `main` | Install → type-check → lint → build |
| `deploy.yml` | Push to `main` | Install → build remotes → build shell → deploy |

Both workflows use Turborepo remote caching. Set `TURBO_TOKEN` and `TURBO_TEAM` in GitHub Secrets to enable across-run cache hits.

---

## Design Token System

All visual tokens live in `packages/ui-tokens/src/tokens.css` as CSS custom properties on `:root`. Framework-specific code never hardcodes color values — it references tokens only.

Tenant branding overrides these tokens at shell bootstrap:
```css
/* Injected by injectTenantCssVariables(tenant) */
--color-primary: #6366f1;
--color-secondary: #4f46e5;
--color-surface: #1e1e2e;
```

Changing tenant at runtime updates all MFEs simultaneously because they all reference the same CSS custom properties.


## For multiple apps site

https://github.com/aaqib-dev-labs/microfrontends-multitenant-cms

