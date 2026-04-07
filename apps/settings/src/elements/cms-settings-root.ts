import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./cms-toast";
import { CmsToast } from "./cms-toast";

@customElement("cms-settings-root")
export class CmsSettingsRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-family-base, 'Inter', sans-serif);
      color: var(--color-text-primary, #e2e8f0);
    }

    .settings-root {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .settings-header {
      display: flex;
      align-items: baseline;
      gap: 1rem;
    }

    h1 {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--color-text-primary, #e2e8f0);
      margin: 0;
    }

    .settings-subtitle {
      font-size: 0.875rem;
      color: var(--color-text-secondary, #94a3b8);
    }

    .settings-nav {
      display: flex;
      gap: 0.25rem;
      border-bottom: 1px solid var(--color-border, rgba(255,255,255,0.08));
      padding-bottom: 0.75rem;
    }

    .nav-btn {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      border: none;
      background: transparent;
      color: var(--color-text-secondary, #94a3b8);
      cursor: pointer;
      transition: all 200ms ease;
      font-family: inherit;
    }

    .nav-btn:hover {
      color: var(--color-text-primary, #e2e8f0);
      background: rgba(255, 255, 255, 0.06);
    }

    .nav-btn--active {
      color: var(--color-primary, #6366f1);
      background: rgba(99, 102, 241, 0.1);
    }

    .settings-content {
      display: block;
    }
  `;

  @property({ type: String, attribute: "tenant-id" }) tenantId = "";
  @property({ type: String, attribute: "tenant-slug" }) tenantSlug = "";
  @property({ type: String, attribute: "tenant-name" }) tenantName = "";
  @state() private activeView: "profile" | "appearance" = "profile";

  render() {
    return html`
      <div class="settings-root">
        <header class="settings-header">
          <h1>Settings</h1>
          <p class="settings-subtitle">${this.tenantName}</p>
          <div class="framework-badge framework-badge--lit">Built with Lit 3</div>
        </header>
        <div class="complementary-feature card">
          <label class="text-sm font-semibold mb-2 block">Complementary Feature: Theme Sync</label>
          <div class="flex items-center gap-4">
            <input 
              type="color" 
              @input=${(e: any) => {
                const color = e.target.value;
                document.documentElement.style.setProperty("--color-primary", color);
                CmsToast.instance.show(`Theme updated to ${color}`, 'success');
              }} 
              value="#6366f1"
            />
            <span class="text-xs text-slate-400">Update global primary color and notify system.</span>
          </div>
        </div>
        <nav class="settings-nav" aria-label="Settings navigation">
          <button
            class="nav-btn ${this.activeView === "profile" ? "nav-btn--active" : ""}"
            @click=${() => (this.activeView = "profile")}
          >
            Profile
          </button>
          <button
            class="nav-btn ${this.activeView === "appearance" ? "nav-btn--active" : ""}"
            @click=${() => (this.activeView = "appearance")}
          >
            Appearance
          </button>
        </nav>
        <div class="settings-content">
          ${this.activeView === "profile"
            ? html`<cms-settings-profile tenant-id="${this.tenantId}"></cms-settings-profile>`
            : html`<cms-settings-appearance tenant-id="${this.tenantId}" tenant-slug="${this.tenantSlug}"></cms-settings-appearance>`}
        </div>
        <cms-toast></cms-toast>
      </div>
    `;
  }
}
