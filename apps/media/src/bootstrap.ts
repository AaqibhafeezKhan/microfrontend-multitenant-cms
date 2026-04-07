import singleSpaVue from "single-spa-vue";
import { createApp, h } from "vue";
import { createPinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";
import type { TenantConfig } from "@cms/tenant-config";
import MediaApp from "./MediaApp.vue";
import AssetGrid from "./views/AssetGrid.vue";
import UploadModal from "./views/UploadModal.vue";

interface MediaCustomProps {
  tenant: TenantConfig;
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/media", component: AssetGrid },
    { path: "/media/upload", component: UploadModal },
  ],
});

const pinia = createPinia();

const lifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render(props: MediaCustomProps) {
      return h(MediaApp, { tenant: props.tenant });
    },
  },
  handleInstance(app: ReturnType<typeof createApp>) {
    app.use(router);
    app.use(pinia);
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
