import { registerApplication, start } from "single-spa";
import type { TenantConfig } from "@cms/tenant-config";
import { useSharedStore } from "@cms/shared-store";
import { renderNav } from "./nav";
import { renderNotifications } from "./notifications";

export function bootstrapShell(tenant: TenantConfig): void {
  renderNav(tenant);
  renderNotifications();

  registerApplication({
    name: "auth",
    app: () => import("auth/bootstrap") as Promise<any>,
    activeWhen: ["/login", "/logout", "/session-expired"],
    customProps: { tenant },
  });

  registerApplication({
    name: "editorial",
    app: () => import("editorial/bootstrap") as Promise<any>,
    activeWhen: ["/editorial"],
    customProps: { tenant },
  });

  registerApplication({
    name: "media",
    app: () => import("media/bootstrap") as Promise<any>,
    activeWhen: ["/media"],
    customProps: { tenant },
  });

  registerApplication({
    name: "collab",
    app: () => import("collab/bootstrap") as Promise<any>,
    activeWhen: ["/collab"],
    customProps: { tenant },
  });

  registerApplication({
    name: "analytics",
    app: () => import("analytics/bootstrap") as Promise<any>,
    activeWhen: ["/analytics"],
    customProps: { tenant },
  });

  registerApplication({
    name: "settings",
    app: () => import("settings/bootstrap") as Promise<any>,
    activeWhen: ["/settings"],
    customProps: { tenant },
  });

  const store = useSharedStore;

  window.addEventListener("single-spa:routing-event", () => {
    store.getState().setCurrentPath(window.location.pathname);
  });

  start({ urlRerouteOnly: true });
}
