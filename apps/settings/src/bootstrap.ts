import "./elements/cms-settings-root";
import "./elements/cms-settings-profile";
import "./elements/cms-settings-appearance";
import { resolveTenant } from "@cms/tenant-config";

const domElementId = "single-spa-application:settings";

function getDomElement(): Element {
  const el = document.getElementById(domElementId);
  if (el) return el;
  const created = document.createElement("div");
  created.id = domElementId;
  document.body.appendChild(created);
  return created;
}

export async function bootstrap(): Promise<void> {}

export async function mount(): Promise<void> {
  const tenant = resolveTenant();
  const el = getDomElement();
  const root = document.createElement("cms-settings-root");
  root.setAttribute("tenant-id", tenant.id);
  root.setAttribute("tenant-slug", tenant.slug);
  root.setAttribute("tenant-name", tenant.displayName);
  el.appendChild(root);
}

export async function unmount(): Promise<void> {
  const el = getDomElement();
  el.innerHTML = "";
}
