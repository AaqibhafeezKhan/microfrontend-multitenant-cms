import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  getAvailableMethods(): string[] {
    return ['Email', 'Google', 'GitHub', 'SAML SSO'];
  }
}
