export interface TenantBranding {
  logoText: string;
  primaryColor: string;
  companyName: string;
}

export interface TenantConfig {
  id: string;
  slug: string;
  displayName: string;
  branding: TenantBranding;
  plan: { tier: string };
}
