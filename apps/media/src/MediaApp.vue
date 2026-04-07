<template>
  <div class="media-root">
    <header class="media-header">
      <h1 class="media-title">Media Library</h1>
      <p class="media-subtitle">{{ tenant.branding.companyName }}</p>
    </header>
    <nav class="media-subnav" aria-label="Media navigation">
      <RouterLink to="/media" class="media-nav-link" active-class="media-nav-link--active" exact>
        All Assets
      </RouterLink>
      <RouterLink to="/media/upload" class="media-nav-link" active-class="media-nav-link--active">
        Upload
      </RouterLink>
    </nav>
    <div class="media-content">
      <RouterView :tenant="tenant" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TenantConfig } from "@cms/tenant-config";

defineProps<{ tenant: TenantConfig }>();
</script>

<style src="./media.css"></style>
