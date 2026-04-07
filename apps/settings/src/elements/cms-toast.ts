import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("cms-toast")
export class CmsToast extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 9999;
      pointer-events: none;
    }

    .toast-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-end;
    }

    .toast {
      background: var(--color-surface, #1e1e2e);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      border-left: 4px solid var(--toast-color, var(--color-primary, #6366f1));
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      font-size: 0.875rem;
      font-weight: 500;
      pointer-events: auto;
      animation: slideIn 0.3s ease-out;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 280px;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .toast-icon { font-size: 1.25rem; }
    .toast-close { margin-left: auto; cursor: pointer; opacity: 0.6; }
    .toast-close:hover { opacity: 1; }
  `;

  @state() private toasts: { id: number, message: string, type: string }[] = [];

  static instance: CmsToast;

  constructor() {
    super();
    CmsToast.instance = this;
  }

  show(message: string, type: string = "info") {
    const id = Date.now();
    this.toasts = [...this.toasts, { id, message, type }];
    setTimeout(() => this.removeToast(id), 4000);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  render() {
    return html`
      <div class="toast-container">
        ${this.toasts.map(t => html`
          <div class="toast" style="--toast-color: ${this.getTypeColor(t.type)}">
            <span class="toast-icon">${this.getTypeIcon(t.type)}</span>
            <span>${t.message}</span>
            <span class="toast-close" @click=${() => this.removeToast(t.id)}>×</span>
          </div>
        `)}
      </div>
    `;
  }

  private getTypeColor(type: string) {
    switch (type) {
      case "success": return "#10b981";
      case "error": return "#f43f5e";
      case "warning": return "#f59e0b";
      default: return "#6366f1";
    }
  }

  private getTypeIcon(type: string) {
    switch (type) {
      case "success": return "✓";
      case "error": return "✕";
      case "warning": return "⚠";
      default: return "ℹ";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cms-toast": CmsToast;
  }
}
