<template>
  <div class="asset-grid-container">
    <aside class="asset-sidebar">
      <h2 class="sidebar-title">Library Stats</h2>
      <div class="stats-item">
        <span class="stats-label">Total Assets</span>
        <span class="stats-value">{{ assets.length }}</span>
      </div>
      <div class="stats-item" v-for="count, type in typeCounts" :key="type">
        <span class="stats-label">{{ type }}s</span>
        <span class="stats-value">{{ count }}</span>
      </div>
      
      <div class="sidebar-info-card mt-6">
        <div class="framework-badge framework-badge--vue">Vue Reactivity</div>
        <p class="text-xs text-slate-400 mt-2">
          This sidebar uses computed properties to stay in sync with the asset list in real-time.
        </p>
      </div>
    </aside>

    <div class="asset-grid-main">
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

      <div class="batch-actions-bar" v-if="selectedIds.size > 0">
        <span>{{ selectedIds.size }} items selected</span>
        <button class="btn btn-sm btn-secondary" @click="selectedIds.clear()">Clear</button>
        <button class="btn btn-sm btn-primary" @click="handleBatchDelete">Delete Selected</button>
      </div>

      <div class="asset-grid" role="list" aria-label="Media assets">
        <div
          v-for="asset in filteredAssets"
          :key="asset.id"
          :class="['asset-card', { 'asset-card--selected': selectedIds.has(asset.id) }]"
          role="listitem"
          @click="toggleSelection(asset.id)"
        >
          <div :class="['asset-preview', `asset-preview--${asset.type}`]">
            <span class="asset-type-badge">{{ asset.type.toUpperCase() }}</span>
            <input 
              type="checkbox" 
              class="asset-checkbox" 
              :checked="selectedIds.has(asset.id)"
              @click.stop
              @change="toggleSelection(asset.id)"
            />
          </div>
          <div class="asset-info">
            <p class="asset-name">{{ asset.name }}</p>
            <p class="asset-meta">{{ asset.size }} &middot; {{ asset.dimensions }}</p>
          </div>
          <div class="asset-actions" @click.stop>
            <button class="asset-btn" @click="copyAssetUrl(asset)">URL</button>
          </div>
        </div>
      </div>

      <p v-if="filteredAssets.length === 0" class="asset-empty">
        No assets match your search.
      </p>
    </div>
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
const selectedIds = ref(new Set<string>());

const typeCounts = computed(() => {
  return assets.value.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
});

function toggleSelection(id: string) {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id);
  } else {
    selectedIds.value.add(id);
  }
}

function handleBatchDelete() {
  const count = selectedIds.value.size;
  assets.value = assets.value.filter(a => !selectedIds.value.has(a.id));
  selectedIds.value.clear();
  store.getState().addNotification({ 
    type: "info", 
    message: `Batch deleted ${count} assets successfully.` 
  });
}

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
