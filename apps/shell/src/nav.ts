import type { TenantConfig } from "@cms/tenant-config";
import { isFlagEnabled } from "@cms/tenant-config";
import { useSharedStore } from "@cms/shared-store";

interface NavItem {
  label: string;
  path: string;
  featureFlag?: keyof TenantConfig["featureFlags"];
}

const navItems: NavItem[] = [
  { label: "Editorial", path: "/editorial" },
  { label: "Media", path: "/media", featureFlag: "mediaLibrary" },
  { label: "Collab", path: "/collab", featureFlag: "collaborativeEditing" },
  { label: "Analytics", path: "/analytics", featureFlag: "advancedAnalytics" },
  { label: "Settings", path: "/settings" },
];

export function renderNav(tenant: TenantConfig): void {
  const navEl = document.getElementById("cms-nav");
  if (!navEl) return;

  const visibleItems = navItems.filter(
    (item) => !item.featureFlag || isFlagEnabled(tenant, item.featureFlag)
  );

  navEl.innerHTML = `
    <div class="nav-shell">
      <div class="nav-brand">
        <span class="nav-brand-text">${tenant.branding.logoText}</span>
        <span class="nav-tenant-badge">${tenant.plan.tier}</span>
      </div>
      <ul class="nav-items" role="navigation" aria-label="Main navigation">
        ${visibleItems
          .map(
            (item) => `
          <li class="nav-item">
            <a href="${item.path}" class="nav-link" data-path="${item.path}">${item.label}</a>
          </li>
        `
          )
          .join("")}
      </ul>
      <div class="nav-user" id="nav-user-area">
        <a href="/login" class="nav-login-btn">Sign In</a>
      </div>
    </div>
  `;

  navEl.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const path = (link as HTMLAnchorElement).dataset["path"];
      if (path) {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new PopStateEvent("popstate"));
        updateActiveLink(navEl, path);
      }
    });
  });

  updateActiveLink(navEl, window.location.pathname);

  useSharedStore.subscribe(
    (state) => state.auth.user,
    (user) => {
      const userArea = document.getElementById("nav-user-area");
      if (!userArea) return;
      if (user) {
        userArea.innerHTML = `
          <div class="nav-user-info">
            <span class="nav-user-name">${user.displayName}</span>
            <button class="nav-logout-btn" id="nav-logout">Sign Out</button>
          </div>
        `;
        document
          .getElementById("nav-logout")
          ?.addEventListener("click", () => {
            useSharedStore.getState().clearAuth();
            window.history.pushState({}, "", "/login");
            window.dispatchEvent(new PopStateEvent("popstate"));
          });
      } else {
        userArea.innerHTML = `<a href="/login" class="nav-login-btn">Sign In</a>`;
      }
    }
  );
}

function updateActiveLink(navEl: HTMLElement, currentPath: string): void {
  navEl.querySelectorAll(".nav-link").forEach((link) => {
    const path = (link as HTMLAnchorElement).dataset["path"];
    if (path && currentPath.startsWith(path)) {
      link.classList.add("nav-link--active");
    } else {
      link.classList.remove("nav-link--active");
    }
  });
}
