import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cms-auth-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-card">
      <h2 class="auth-title">Create Account</h2>
      <div class="framework-badge framework-badge--angular mb-6">Angular Reactive Forms</div>
      
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input id="email" type="email" formControlName="email" class="auth-input" [class.error]="isInvalid('email')">
          <div *ngIf="isInvalid('email')" class="error-text">Please enter a valid email</div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" formControlName="password" class="auth-input" [class.error]="isInvalid('password')">
          <div *ngIf="isInvalid('password')" class="error-text">Password must be at least 8 characters</div>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" formControlName="terms">
            I agree to the Terms of Service
          </label>
        </div>

        <button type="submit" class="auth-btn auth-btn--primary" [disabled]="registerForm.invalid">
          Register Project
        </button>
      </form>
    </div>
  `,
  styleUrls: ['../auth.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registering:', this.registerForm.value);
    }
  }
}
