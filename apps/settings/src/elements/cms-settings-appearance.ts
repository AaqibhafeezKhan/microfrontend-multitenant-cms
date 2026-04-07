import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { eventBus } from "@cms/event-bus";
import { getTenantBySlug } from "@cms/tenant-config";

type ThemeMode = "light" | "dark";

@customElement("cms-settings-appearance")
export class CmsSettingsAppearance extends LitElement {
  static styles = css`
    :host { display: block; }

    .appearance-card {
      background: var(--color-surface, #1e1e2e);
      border: 1px solid var(--color-border, rgba(255,255,255,0.08));
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 560px;
    }

    .section-title {
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-secondary, #94a3b8);
      margin-bottom: 1rem;
    }

    .theme-options {
      display: flex;
      gap: 1rem;
    }

    .theme-option {
      flex: 1;
      padding: 1.25rem;
      border-radius: 12px;
      border: 2px solid var(--color-border, rgba(255,255,255,0.08));
      cursor: pointer;
      transition: all 200ms ease;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      background: transparent;
      font-family: inherit;
    }

    .theme-option:hover {
      border-color: var(--color-border-strong, rgba(255,255,255,0.16));
    }

    .theme-option--active {
      border-color: var(--color-primary, #6366f1);
      background: rgba(99, 102, 241, 0.05);
    }

    .theme-preview {
      width: 64px;
      height: 40px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .theme-preview--dark { background: linear-gradient(135deg, #13131f 50%, #1e1e2e 50%); }
    .theme-preview--light { background: linear-gradient(135deg, #f8fafc 50%, #f1f5f9 50%); }

    .theme-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-primary, #e2e8f0);
    }

    .color-swatches {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: transform 200ms ease;
    }

    .color-swatch:hover { transform: scale(1.15); }
    .color-swatch--active { border-color: var(--color-text-primary, #e2e8f0); }

    .apply-btn {
      align-self: flex-start;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      background: var(--color-primary, #6366f1);
      color: #fff;
      font-size: 0.875rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      font-family: inherit;
      transition: all 200ms ease;
    }

    .apply-btn:hover { background: var(--color-secondary, #4f46e5); }
    .design-studio {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px dashed var(--color-border, rgba(255,255,255,0.08));
    }

    .component-preview {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 1rem;
      padding: 1.5rem;
      background: rgba(0,0,0,0.1);
      border-radius: 12px;
    }

    .preview-btn {
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: all 200ms ease;
    }

    .preview-btn--primary {
      background: var(--preview-color, #6366f1);
      color: white;
      border: none;
    }

    .preview-btn--outline {
      background: transparent;
      border: 2px solid var(--preview-color, #6366f1);
      color: var(--preview-color, #6366f1);
    }
  `;

  @property({ type: String, attribute: "tenant-id" }) tenantId = "";
  @property({ type: String, attribute: "tenant-slug" }) tenantSlug = "";
  @state() private selectedTheme: ThemeMode = "dark";
  @state() private selectedColor = "#6366f1";

  private readonly colorPalette = [
    { label: "Indigo", value: "#6366f1" },
    { label: "Emerald", value: "#10b981" },
    { label: "Amber", value: "#f59e0b" },
    { label: "Rose", value: "#f43f5e" },
    { label: "Sky", value: "#0ea5e9" },
    { label: "Violet", value: "#8b5cf6" },
  ];

  private applyAppearance() {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", this.selectedColor);

    const tenant = getTenantBySlug(this.tenantSlug);
    const tenantId = tenant?.id ?? this.tenantId;

    eventBus.emit("settings:theme-changed", {
      tenantId,
      theme: this.selectedTheme,
    });
  }

  render() {
    return html`
      <div class="appearance-card">
        <div class="framework-badge framework-badge--lit mb-6">Lit Property Binding</div>
        
        <div>
          <p class="section-title">Theme</p>
          <div class="theme-options">
            ${(["dark", "light"] as ThemeMode[]).map(
              (mode) => html`
                <button
                  class="theme-option ${this.selectedTheme === mode ? "theme-option--active" : ""}"
                  @click=${() => (this.selectedTheme = mode)}
                  aria-pressed="${this.selectedTheme === mode}"
                >
                  <div class="theme-preview theme-preview--${mode}"></div>
                  <span class="theme-label">${mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
                </button>
              `
            )}
          </div>
        </div>

        <div>
          <p class="section-title">Accent Color</p>
          <div class="color-swatches" role="radiogroup" aria-label="Select accent color">
            ${this.colorPalette.map(
              (c) => html`
                <button
                  class="color-swatch ${this.selectedColor === c.value ? "color-swatch--active" : ""}"
                  style="background-color: ${c.value}"
                  title="${c.label}"
                  aria-label="${c.label}"
                  @click=${() => (this.selectedColor = c.value)}
                ></button>
              `
            )}
          </div>
        </div>

        <div class="design-studio">
          <p class="section-title">Component Laboratory</p>
          <div class="component-preview" style="--preview-color: ${this.selectedColor}">
            <button class="preview-btn preview-btn--primary">Primary Button</button>
            <button class="preview-btn preview-btn--outline">Outline Button</button>
          </div>
          <p class="text-xs text-slate-400 mt-2">
            Lit efficiently patches the DOM when state properties like <b>selectedColor</b> change.
          </p>
        </div>

        <button class="apply-btn" @click=${this.applyAppearance}>Apply Globally</button>
      </div>
    `;
  }
}
