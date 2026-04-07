import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TenantConfig } from "../models/tenant.model";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "cms-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-branding">
          <span class="auth-logo">{{ tenant?.branding?.logoText ?? "CMS" }}</span>
          <p class="auth-tagline">Sign in to your workspace</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form" novalidate>
          <div class="form-field">
            <label class="form-label" for="email">Email address</label>
            <input
              id="email"
              type="email"
              class="form-input"
              [class.form-input--error]="emailInvalid"
              formControlName="email"
              placeholder="you@company.com"
              autocomplete="email"
            />
            <span class="form-error" *ngIf="emailInvalid">
              Please enter a valid email address.
            </span>
          </div>

          <div class="form-field">
            <label class="form-label" for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-input"
              [class.form-input--error]="passwordInvalid"
              formControlName="password"
              placeholder="Your password"
              autocomplete="current-password"
            />
            <span class="form-error" *ngIf="passwordInvalid">
              Password must be at least 8 characters.
            </span>
          </div>

          <div *ngIf="errorMessage" class="auth-error-banner" role="alert">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="auth-submit-btn"
            [disabled]="isLoading || loginForm.invalid"
          >
            {{ isLoading ? "Signing in..." : "Sign In" }}
          </button>
        </form>

        <div class="auth-demo-hint">
          <p>Demo credentials: <strong>admin@acme.com</strong> / <strong>password123</strong></p>
        </div>

        <div class="jwt-debug-panel mt-8">
          <div class="framework-badge framework-badge--angular mb-4">Angular DevTools</div>
          <p class="text-[10px] uppercase font-bold text-slate-500 mb-2">Internal Claims Explorer</p>
          <div class="claims-json">
            <pre>{{ mockClaims | json }}</pre>
          </div>
          <p class="text-[10px] text-slate-400 mt-2 italic">
            This panel uses Angular's built-in <b>JsonPipe</b> to debug runtime session claims.
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../auth.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = "";
  tenant: TenantConfig | null = null;
  private subscription = new Subscription();

  mockClaims = {
    sub: "1234567890",
    name: "John Doe",
    iat: 1516239022,
    roles: ["admin", "editor"],
    tenant: "acme"
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });

    this.subscription.add(
      this.authService.tenant$.subscribe((t: any) => (this.tenant = t))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get emailInvalid(): boolean {
    const ctrl = this.loginForm.get("email");
    return !!(ctrl?.invalid && ctrl.touched);
  }

  get passwordInvalid(): boolean {
    const ctrl = this.loginForm.get("password");
    return !!(ctrl?.invalid && ctrl.touched);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.errorMessage = "";

    this.subscription.add(
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          window.history.pushState({}, "", "/editorial");
          window.dispatchEvent(new PopStateEvent("popstate"));
        },
        error: (err: Error) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        },
      })
    );
  }
}
