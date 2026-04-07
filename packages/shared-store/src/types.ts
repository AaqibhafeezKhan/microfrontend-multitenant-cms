export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  roles: string[];
  tenantId: string;
}

export interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  sessionExpiresAt: number | null;
}

export interface NavigationState {
  activeMicrofrontend: string | null;
  previousPath: string | null;
  currentPath: string;
  breadcrumbs: Array<{ label: string; path: string }>;
}

export interface NotificationItem {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  timestamp: number;
  dismissed: boolean;
}

export interface NotificationState {
  notifications: NotificationItem[];
}

export interface SharedStoreState {
  auth: AuthState;
  navigation: NavigationState;
  notifications: NotificationState;
  setUser: (user: AuthenticatedUser | null) => void;
  setAuthLoading: (loading: boolean) => void;
  setAccessToken: (token: string | null, expiresAt: number | null) => void;
  clearAuth: () => void;
  setCurrentPath: (path: string) => void;
  setActiveMicrofrontend: (name: string | null) => void;
  pushBreadcrumb: (crumb: { label: string; path: string }) => void;
  clearBreadcrumbs: () => void;
  addNotification: (
    notification: Omit<NotificationItem, "id" | "timestamp" | "dismissed">
  ) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
}
