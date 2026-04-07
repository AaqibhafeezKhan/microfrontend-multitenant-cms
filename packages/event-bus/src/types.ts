export type CmsEventMap = {
  "auth:login": { userId: string; tenantId: string; roles: string[] };
  "auth:logout": { userId: string; tenantId: string };
  "auth:session-expired": { tenantId: string };
  "editorial:content-published": {
    contentId: string;
    slug: string;
    tenantId: string;
    publishedBy: string;
  };
  "editorial:content-saved": {
    contentId: string;
    tenantId: string;
    isDraft: boolean;
  };
  "media:asset-uploaded": {
    assetId: string;
    fileName: string;
    mimeType: string;
    tenantId: string;
  };
  "media:asset-deleted": { assetId: string; tenantId: string };
  "collab:user-joined": {
    sessionId: string;
    userId: string;
    contentId: string;
    tenantId: string;
  };
  "collab:user-left": {
    sessionId: string;
    userId: string;
    tenantId: string;
  };
  "collab:cursor-moved": {
    sessionId: string;
    userId: string;
    position: { line: number; column: number };
  };
  "settings:theme-changed": { tenantId: string; theme: "light" | "dark" };
  "settings:feature-flag-toggled": {
    tenantId: string;
    flag: string;
    enabled: boolean;
  };
  "analytics:pageview": {
    path: string;
    tenantId: string;
    userId: string;
    timestamp: number;
  };
  "navigation:route-changed": { from: string; to: string; tenantId: string };
};

export type CmsEventName = keyof CmsEventMap;
export type CmsEventPayload<T extends CmsEventName> = CmsEventMap[T];

export type CmsEventHandler<T extends CmsEventName> = (
  payload: CmsEventPayload<T>
) => void;

export interface ICmsEventBus {
  emit<T extends CmsEventName>(event: T, payload: CmsEventPayload<T>): void;
  on<T extends CmsEventName>(event: T, handler: CmsEventHandler<T>): () => void;
  off<T extends CmsEventName>(event: T, handler: CmsEventHandler<T>): void;
  once<T extends CmsEventName>(event: T, handler: CmsEventHandler<T>): void;
}
