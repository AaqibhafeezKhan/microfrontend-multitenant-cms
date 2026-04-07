<template>
  <div class="asset-grid-page">
    <div class="asset-grid-toolbar">
      <div class="asset-filter-group" role="group" aria-label="Filter by type">
        <button
          v-for="type in filterTypes"
          :key="type"
          :class="['asset-filter-btn', { 'asset-filter-btn--active': activeFilter === type }]"
          @click="activeFilter = type"
        >
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}
        </button>
      </div>
      <div class="asset-search">
        <input
          v-model="searchQuery"
          type="text"
          class="asset-search-input"
          placeholder="Search assets..."
          aria-label="Search assets"
        />
      </div>
    </div>

    <div class="asset-grid" role="list" aria-label="Media assets">
      <div
        v-for="asset in filteredAssets"
        :key="asset.id"
        class="asset-card"
        role="listitem"
      >
        <div :class="['asset-preview', `asset-preview--${asset.type}`]">
          <span class="asset-type-label">{{ asset.type.toUpperCase() }}</span>
        </div>
        <div class="asset-info">
          <p class="asset-name">{{ asset.name }}</p>
          <p class="asset-meta">{{ asset.size }} &middot; {{ asset.dimensions }}</p>
          <p class="asset-date">{{ formatDate(asset.uploadedAt) }}</p>
        </div>
        <div class="asset-actions">
          <button class="asset-btn" @click="copyAssetUrl(asset)">Copy URL</button>
          <button class="asset-btn asset-btn--danger" @click="handleDelete(asset.id)">Delete</button>
        </div>
      </div>
    </div>

    <p v-if="filteredAssets.length === 0" class="asset-empty">
      No assets match your search.
    </p>
  </div>
</template>

<script lang="ts">
export const filterTypes = ["all", "image", "video", "document", "audio"] as const;
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { TenantConfig } from "@cms/tenant-config";
import { eventBus } from "@cms/event-bus";
import { useSharedStore } from "@cms/shared-store";

defineProps<{ tenant: TenantConfig }>();

interface MediaAsset {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "audio";
  size: string;
  dimensions: string;
  uploadedAt: string;
  url: string;
  tenantId: string;
}

const store = useSharedStore;

const assets = ref<MediaAsset[]>([
  { id: "asset_001", name: "hero-banner.jpg", type: "image", size: "2.4 MB", dimensions: "1920x1080", uploadedAt: "2024-03-15T11:00:00Z", url: "https://cdn.acme.cms.com/assets/hero-banner.jpg", tenantId: "tenant_acme_001" },
  { id: "asset_002", name: "product-overview.mp4", type: "video", size: "48 MB", dimensions: "1280x720", uploadedAt: "2024-03-14T09:30:00Z", url: "https://cdn.acme.cms.com/assets/product-overview.mp4", tenantId: "tenant_acme_001" },
  { id: "asset_003", name: "brand-guidelines.pdf", type: "document", size: "5.1 MB", dimensions: "—", uploadedAt: "2024-03-12T14:00:00Z", url: "https://cdn.acme.cms.com/assets/brand-guidelines.pdf", tenantId: "tenant_acme_001" },
  { id: "asset_004", name: "team-photo.png", type: "image", size: "3.8 MB", dimensions: "2400x1600", uploadedAt: "2024-03-10T16:45:00Z", url: "https://cdn.acme.cms.com/assets/team-photo.png", tenantId: "tenant_acme_001" },
  { id: "asset_005", name: "podcast-ep42.mp3", type: "audio", size: "62 MB", dimensions: "—", uploadedAt: "2024-03-08T08:00:00Z", url: "https://cdn.acme.cms.com/assets/podcast-ep42.mp3", tenantId: "tenant_acme_001" },
  { id: "asset_006", name: "feature-diagram.png", type: "image", size: "1.2 MB", dimensions: "1600x900", uploadedAt: "2024-03-05T13:00:00Z", url: "https://cdn.acme.cms.com/assets/feature-diagram.png", tenantId: "tenant_acme_001" },
]);

type FilterType = (typeof filterTypes)[number];

const activeFilter = ref<FilterType>("all");
const searchQuery = ref("");

const filteredAssets = computed(() => {
  return assets.value.filter((asset) => {
    const matchesType = activeFilter.value === "all" || asset.type === activeFilter.value;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesType && matchesSearch;
  });
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function copyAssetUrl(asset: MediaAsset) {
  navigator.clipboard.writeText(asset.url);
  store.getState().addNotification({ type: "success", message: `URL copied for ${asset.name}` });
}

function handleDelete(assetId: string) {
  const asset = assets.value.find((a) => a.id === assetId);
  if (!asset) return;
  assets.value = assets.value.filter((a) => a.id !== assetId);
  eventBus.emit("media:asset-deleted", { assetId, tenantId: asset.tenantId });
  store.getState().addNotification({ type: "info", message: `${asset.name} has been deleted.` });
}
</script>
