import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { SharedStoreState, AuthenticatedUser, NotificationItem } from "./types";

declare global {
  interface Window {
    __CMS_SHARED_STORE__?: ReturnType<typeof createSharedStore>;
  }
}

function createSharedStore() {
  return create<SharedStoreState>()(
    subscribeWithSelector((set) => ({
      auth: {
        user: null,
        isAuthenticated: false,
        isLoading: true,
        accessToken: null,
        sessionExpiresAt: null,
      },
      navigation: {
        activeMicrofrontend: null,
        previousPath: null,
        currentPath: "/",
        breadcrumbs: [],
      },
      notifications: {
        notifications: [],
      },

      setUser: (user: AuthenticatedUser | null) =>
        set((state) => ({
          auth: {
            ...state.auth,
            user,
            isAuthenticated: user !== null,
            isLoading: false,
          },
        })),

      setAuthLoading: (loading: boolean) =>
        set((state) => ({
          auth: { ...state.auth, isLoading: loading },
        })),

      setAccessToken: (token: string | null, expiresAt: number | null) =>
        set((state) => ({
          auth: { ...state.auth, accessToken: token, sessionExpiresAt: expiresAt },
        })),

      clearAuth: () =>
        set((state) => ({
          auth: {
            ...state.auth,
            user: null,
            isAuthenticated: false,
            accessToken: null,
            sessionExpiresAt: null,
            isLoading: false,
          },
        })),

      setCurrentPath: (path: string) =>
        set((state) => ({
          navigation: {
            ...state.navigation,
            previousPath: state.navigation.currentPath,
            currentPath: path,
          },
        })),

      setActiveMicrofrontend: (name: string | null) =>
        set((state) => ({
          navigation: { ...state.navigation, activeMicrofrontend: name },
        })),

      pushBreadcrumb: (crumb: { label: string; path: string }) =>
        set((state) => ({
          navigation: {
            ...state.navigation,
            breadcrumbs: [...state.navigation.breadcrumbs, crumb],
          },
        })),

      clearBreadcrumbs: () =>
        set((state) => ({
          navigation: { ...state.navigation, breadcrumbs: [] },
        })),

      addNotification: (
        notification: Omit<NotificationItem, "id" | "timestamp" | "dismissed">
      ) =>
        set((state) => ({
          notifications: {
            notifications: [
              ...state.notifications.notifications,
              {
                ...notification,
                id: `notification_${Date.now()}_${Math.random().toString(36).slice(2)}`,
                timestamp: Date.now(),
                dismissed: false,
              },
            ],
          },
        })),

      dismissNotification: (id: string) =>
        set((state) => ({
          notifications: {
            notifications: state.notifications.notifications.map((n) =>
              n.id === id ? { ...n, dismissed: true } : n
            ),
          },
        })),

      clearNotifications: () =>
        set(() => ({
          notifications: { notifications: [] },
        })),
    }))
  );
}

export type SharedStore = ReturnType<typeof createSharedStore>;

function getOrCreateSharedStore(): SharedStore {
  if (!window.__CMS_SHARED_STORE__) {
    window.__CMS_SHARED_STORE__ = createSharedStore();
  }
  return window.__CMS_SHARED_STORE__;
}

export const useSharedStore = getOrCreateSharedStore();
