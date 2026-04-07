import type {
  CmsEventName,
  CmsEventPayload,
  CmsEventHandler,
  ICmsEventBus,
} from "./types";

const DOM_EVENT_PREFIX = "cms:" as const;

class CmsEventBus implements ICmsEventBus {
  private readonly handlerRegistry = new Map<
    CmsEventName,
    Set<CmsEventHandler<CmsEventName>>
  >();

  emit<T extends CmsEventName>(event: T, payload: CmsEventPayload<T>): void {
    const domEvent = new CustomEvent(`${DOM_EVENT_PREFIX}${event}`, {
      detail: payload,
      bubbles: true,
      composed: true,
    });

    window.dispatchEvent(domEvent);

    const handlers = this.handlerRegistry.get(event);
    if (handlers) {
      handlers.forEach((handler) => {
        (handler as CmsEventHandler<T>)(payload);
      });
    }
  }

  on<T extends CmsEventName>(
    event: T,
    handler: CmsEventHandler<T>
  ): () => void {
    if (!this.handlerRegistry.has(event)) {
      this.handlerRegistry.set(event, new Set());
    }

    const handlers = this.handlerRegistry.get(event)!;
    handlers.add(handler as CmsEventHandler<CmsEventName>);

    return () => this.off(event, handler);
  }

  off<T extends CmsEventName>(event: T, handler: CmsEventHandler<T>): void {
    const handlers = this.handlerRegistry.get(event);
    if (handlers) {
      handlers.delete(handler as CmsEventHandler<CmsEventName>);
    }
  }

  once<T extends CmsEventName>(event: T, handler: CmsEventHandler<T>): void {
    const unsubscribe = this.on(event, (payload) => {
      handler(payload);
      unsubscribe();
    });
  }
}

declare global {
  interface Window {
    __CMS_EVENT_BUS__?: ICmsEventBus;
  }
}

function createOrReuseEventBus(): ICmsEventBus {
  if (!window.__CMS_EVENT_BUS__) {
    window.__CMS_EVENT_BUS__ = new CmsEventBus();
  }
  return window.__CMS_EVENT_BUS__;
}

export const eventBus: ICmsEventBus = createOrReuseEventBus();
