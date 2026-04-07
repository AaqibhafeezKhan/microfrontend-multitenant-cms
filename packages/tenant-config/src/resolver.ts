import type { TenantConfig, FeatureFlags } from "./types";
import { tenantRegistry } from "./registry";

const DEFAULT_TENANT_SLUG = "acme";

function extractSubdomain(hostname: string): string | null {
  const parts = hostname.split(".");
  if (parts.length >= 3) {
    return parts[0] ?? null;
  }
  return null;
}

function extractQueryParamTenant(search: string): string | null {
  const params = new URLSearchParams(search);
  return params.get("tenant");
}

export function resolveTenant(): TenantConfig {
  const hostname = window.location.hostname;
  const search = window.location.search;

  const queryParamTenant = extractQueryParamTenant(search);
  if (queryParamTenant && tenantRegistry[queryParamTenant]) {
    return tenantRegistry[queryParamTenant]!;
  }

  const subdomain = extractSubdomain(hostname);
  if (subdomain && tenantRegistry[subdomain]) {
    return tenantRegistry[subdomain]!;
  }

  return tenantRegistry[DEFAULT_TENANT_SLUG]!;
}

export function getTenantById(id: string): TenantConfig | null {
  return (
    Object.values(tenantRegistry).find((tenant) => tenant.id === id) ?? null
  );
}

export function getTenantBySlug(slug: string): TenantConfig | null {
  return tenantRegistry[slug] ?? null;
}

export function isFlagEnabled(
  tenant: TenantConfig,
  flag: keyof FeatureFlags
): boolean {
  return tenant.featureFlags[flag] === true;
}

export function injectTenantCssVariables(tenant: TenantConfig): void {
  const root = document.documentElement;
  const { branding } = tenant;

  root.style.setProperty("--color-primary", branding.primaryColor);
  root.style.setProperty("--color-secondary", branding.secondaryColor);
  root.style.setProperty("--color-accent", branding.accentColor);
  root.style.setProperty("--color-surface", branding.surfaceColor);
  root.style.setProperty("--color-background", branding.backgroundColor);
  root.style.setProperty("--color-text-primary", branding.textPrimaryColor);
  root.style.setProperty(
    "--color-text-secondary",
    branding.textSecondaryColor
  );
  root.style.setProperty("--font-family-base", branding.fontFamily);
}
