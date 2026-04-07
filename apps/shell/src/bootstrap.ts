import "@cms/ui-tokens/tokens.css";
import "./styles/shell.css";
import { resolveTenant, injectTenantCssVariables } from "@cms/tenant-config";
import { bootstrapShell } from "./shell";

const tenant = resolveTenant();
injectTenantCssVariables(tenant);

document.title = `${tenant.branding.companyName} CMS`;

bootstrapShell(tenant);
