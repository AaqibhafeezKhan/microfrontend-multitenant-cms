import { useSharedStore } from "@cms/shared-store";
import type { NotificationItem } from "@cms/shared-store";

export function renderNotifications(): void {
  const container = document.getElementById("cms-notifications");
  if (!container) return;

  container.className = "notifications-container";

  useSharedStore.subscribe(
    (state) => state.notifications.notifications,
    (notifications) => {
      const visible = notifications.filter((n) => !n.dismissed);
      container.innerHTML = visible
        .map((n) => buildNotificationHtml(n))
        .join("");

      container.querySelectorAll("[data-dismiss-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = (btn as HTMLElement).dataset["dismissId"];
          if (id) {
            useSharedStore.getState().dismissNotification(id);
          }
        });
      });
    }
  );
}

function buildNotificationHtml(notification: NotificationItem): string {
  return `
    <div class="notification notification--${notification.type}" role="alert">
      <span class="notification-message">${notification.message}</span>
      <button class="notification-dismiss" data-dismiss-id="${notification.id}" aria-label="Dismiss">
        Close
      </button>
    </div>
  `;
}
