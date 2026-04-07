import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { resolveTenant, type TenantConfig } from '@cms/tenant-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tenantSubject = new BehaviorSubject<TenantConfig>(resolveTenant());
  public tenant$ = this.tenantSubject.asObservable();

  login(email: string, password: string) {
    if (email === 'admin@acme.com' && password === 'password123') {
      return of({ success: true });
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  getAvailableMethods(): string[] {
    return ['Email', 'Google', 'GitHub', 'SAML SSO'];
  }
}
