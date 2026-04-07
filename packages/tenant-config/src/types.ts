export interface TenantBranding {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  backgroundColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  fontFamily: string;
  logoText: string;
  companyName: string;
}

export interface FeatureFlags {
  collaborativeEditing: boolean;
  advancedAnalytics: boolean;
  mediaLibrary: boolean;
  multiLanguage: boolean;
  versionHistory: boolean;
  webhooks: boolean;
  apiAccess: boolean;
  customWorkflows: boolean;
  auditLog: boolean;
  ssoEnabled: boolean;
}

export interface TenantPlan {
  tier: "starter" | "professional" | "enterprise";
  maxUsers: number;
  maxStorageGb: number;
  maxContentItems: number;
}

export interface TenantConfig {
  id: string;
  slug: string;
  displayName: string;
  branding: TenantBranding;
  featureFlags: FeatureFlags;
  plan: TenantPlan;
  allowedDomains: string[];
  defaultLocale: string;
  supportedLocales: string[];
  timezone: string;
  apiBaseUrl: string;
}
