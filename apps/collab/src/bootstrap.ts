import singleSpaSvelte from "single-spa-svelte";
import CollabApp from "./CollabApp.svelte";
import type { TenantConfig } from "@cms/tenant-config";

const lifecycles = singleSpaSvelte({
  component: CollabApp,
  domElementGetter: () =>
    document.getElementById("single-spa-application:collab") ?? document.body,
});

export const { bootstrap, mount, unmount } = lifecycles;
