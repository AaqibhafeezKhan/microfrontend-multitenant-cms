import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { useSharedStore } from "@cms/shared-store";

@customElement("cms-settings-profile")
export class CmsSettingsProfile extends LitElement {
  static styles = css`
    :host { display: block; }

    .profile-card {
      background: var(--color-surface, #1e1e2e);
      border: 1px solid var(--color-border, rgba(255,255,255,0.08));
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 560px;
    }

    .profile-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary, #6366f1), var(--color-secondary, #4f46e5));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary, #94a3b8);
    }

    input {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--color-border-strong, rgba(255,255,255,0.16));
      background: rgba(255, 255, 255, 0.04);
      color: var(--color-text-primary, #e2e8f0);
      font-size: 1rem;
      font-family: inherit;
      outline: none;
      transition: border-color 200ms ease;
    }

    input:focus { border-color: var(--color-primary, #6366f1); }
    input::placeholder { color: var(--color-text-secondary, #94a3b8); }

    .save-btn {
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

    .save-btn:hover { background: var(--color-secondary, #4f46e5); }

    .save-confirm {
      font-size: 0.875rem;
      color: var(--color-success, #10b981);
      display: none;
    }

    .save-confirm--visible { display: block; }
  `;

  @property({ type: String, attribute: "tenant-id" }) tenantId = "";
  @state() private displayName = "";
  @state() private email = "";
  @state() private saved = false;

  connectedCallback() {
    super.connectedCallback();
    const store = useSharedStore;
    const user = store.getState().auth.user;
    if (user) {
      this.displayName = user.displayName;
      this.email = user.email;
    } else {
      this.displayName = "Alex Chen";
      this.email = "admin@acme.com";
    }
  }

  private handleSave() {
    const store = useSharedStore;
    const user = store.getState().auth.user;
    if (user) {
      store.getState().setUser({ ...user, displayName: this.displayName, email: this.email });
    }
    this.saved = true;
    setTimeout(() => (this.saved = false), 3000);
  }

  render() {
    const initials = this.displayName.split(" ").map((n) => n[0] ?? "").join("").slice(0, 2).toUpperCase();

    return html`
      <div class="profile-card">
        <div class="profile-avatar">${initials}</div>

        <div class="form-field">
          <label for="display-name">Display Name</label>
          <input
            id="display-name"
            type="text"
            .value=${this.displayName}
            @input=${(e: InputEvent) => (this.displayName = (e.target as HTMLInputElement).value)}
            placeholder="Your display name"
          />
        </div>

        <div class="form-field">
          <label for="email">Email Address</label>
          <input
            id="email"
            type="email"
            .value=${this.email}
            @input=${(e: InputEvent) => (this.email = (e.target as HTMLInputElement).value)}
            placeholder="you@company.com"
          />
        </div>

        <button class="save-btn" @click=${this.handleSave}>Save Changes</button>
        <span class="save-confirm ${this.saved ? "save-confirm--visible" : ""}">
          Profile updated successfully.
        </span>
      </div>
    `;
  }
}
