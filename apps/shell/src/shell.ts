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
    activeWhen: (location: Location) => location.hash.startsWith("#/login") || location.hash.startsWith("#/logout") || location.hash.startsWith("#/session-expired"),
    customProps: { tenant },
  });

  registerApplication({
    name: "editorial",
    app: () => import("editorial/bootstrap") as Promise<any>,
    activeWhen: (location: Location) => location.hash.startsWith("#/editorial") || location.hash === "" || location.hash === "#/",
    customProps: { tenant },
  });

  registerApplication({
    name: "media",
    app: () => import("media/bootstrap") as Promise<any>,
    activeWhen: (location: Location) => location.hash.startsWith("#/media"),
    customProps: { tenant },
  });

  registerApplication({
    name: "collab",
    app: () => import("collab/bootstrap") as Promise<any>,
    activeWhen: (location: Location) => location.hash.startsWith("#/collab"),
    customProps: { tenant },
  });

  registerApplication({
    name: "analytics",
    app: () => import("analytics/bootstrap") as Promise<any>,
    activeWhen: (location: Location) => location.hash.startsWith("#/analytics"),
    customProps: { tenant },
  });

  registerApplication({
    name: "settings",
    app: () => import("settings/bootstrap") as Promise<any>,
    activeWhen: (location: Location) => location.hash.startsWith("#/settings"),
    customProps: { tenant },
  });

  const store = useSharedStore;

  window.addEventListener("single-spa:routing-event", () => {
    store.getState().setCurrentPath(window.location.hash || "#/");
  });

  start({ urlRerouteOnly: true });
}
