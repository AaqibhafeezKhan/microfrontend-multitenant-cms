import { Injectable } from "@angular/core";
import { Observable, of, throwError, BehaviorSubject } from "rxjs";
import { delay } from "rxjs/operators";
import type { TenantConfig } from "../models/tenant.model";
import { resolveTenant } from "@cms/tenant-config";
import { eventBus } from "@cms/event-bus";
import { useSharedStore } from "@cms/shared-store";

const DEMO_USERS: Record<string, { password: string; displayName: string; roles: string[] }> = {
  "admin@acme.com": { password: "password123", displayName: "Alex Chen", roles: ["admin", "editor"] },
  "editor@acme.com": { password: "password123", displayName: "Sarah Okafor", roles: ["editor"] },
  "admin@globex.com": { password: "password123", displayName: "James Watanabe", roles: ["admin"] },
};

@Injectable({ providedIn: "root" })
export class AuthService {
  private tenantSubject = new BehaviorSubject<TenantConfig>(resolveTenant());
  public tenant$ = this.tenantSubject.asObservable();

  login(email: string, password: string): Observable<void> {
    const user = DEMO_USERS[email];
    if (!user || user.password !== password) {
      return throwError(() => new Error("Invalid email or password."));
    }

    const tenant = this.tenantSubject.getValue();
    const sharedStore = useSharedStore;

    return new Observable<void>((observer) => {
      setTimeout(() => {
        const userId = `user_${email.replace(/[@.]/g, "_")}`;
        sharedStore.getState().setUser({
          id: userId,
          email,
          displayName: user.displayName,
          avatarUrl: null,
          roles: user.roles,
          tenantId: tenant.id,
        });
        sharedStore.getState().setAccessToken(
          `demo_token_${Date.now()}`,
          Date.now() + 3600 * 1000
        );
        eventBus.emit("auth:login", {
          userId,
          tenantId: tenant.id,
          roles: user.roles,
        });
        observer.next();
        observer.complete();
      }, 600);
    });
  }

  logout(): void {
    const tenant = this.tenantSubject.getValue();
    const store = useSharedStore.getState();
    const userId = store.auth.user?.id ?? "";
    store.clearAuth();
    eventBus.emit("auth:logout", { userId, tenantId: tenant.id });
  }
}
