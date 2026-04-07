<template>
  <div class="upload-page">
    <div class="upload-zone"
      :class="{ 'upload-zone--dragover': isDragOver }"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @drop.prevent="handleDrop"
    >
      <p class="upload-zone-title">Drop files here</p>
      <p class="upload-zone-subtitle">or</p>
      <label class="upload-browse-btn" for="file-input">
        Browse Files
        <input
          id="file-input"
          type="file"
          multiple
          class="upload-file-input"
          @change="handleFileInput"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />
      </label>
      <p class="upload-hint">Supports: Images, Videos, Audio, Documents</p>
    </div>

    <div v-if="queue.length > 0" class="upload-queue">
      <h2 class="upload-queue-title">Upload Queue</h2>
      <div class="upload-queue-list">
        <div v-for="item in queue" :key="item.name" class="upload-queue-item">
          <div class="upload-item-info">
            <span class="upload-item-name">{{ item.name }}</span>
            <span class="upload-item-size">{{ formatSize(item.size) }}</span>
          </div>
          <div class="upload-progress-bar">
            <div
              class="upload-progress-fill"
              :style="{ width: `${item.progress}%` }"
            ></div>
          </div>
          <span :class="['upload-item-status', `upload-item-status--${item.status}`]">
            {{ item.status }}
          </span>
        </div>
      </div>
      <button class="upload-submit-btn" @click="startUpload" :disabled="isUploading">
        {{ isUploading ? "Uploading..." : "Start Upload" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TenantConfig } from "@cms/tenant-config";
import { eventBus } from "@cms/event-bus";
import { useSharedStore } from "@cms/shared-store";

const props = defineProps<{ tenant: TenantConfig }>();
const store = useSharedStore;

interface QueueItem { name: string; size: number; progress: number; status: "pending" | "uploading" | "done" | "error"; }

const isDragOver = ref(false);
const isUploading = ref(false);
const queue = ref<QueueItem[]>([]);

function addFilesToQueue(files: FileList | File[]) {
  Array.from(files).forEach((file) => {
    queue.value.push({ name: file.name, size: file.size, progress: 0, status: "pending" });
  });
}

function handleDrop(e: any) {
  isDragOver.value = false;
  if (e.dataTransfer?.files) addFilesToQueue(e.dataTransfer.files);
}

function handleFileInput(e: any) {
  const input = e.target as HTMLInputElement;
  if (input.files) addFilesToQueue(input.files);
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function startUpload() {
  isUploading.value = true;
  queue.value.forEach((item, index) => {
    item.status = "uploading";
    const interval = setInterval(() => {
      item.progress = Math.min(item.progress + 20, 100);
      if (item.progress >= 100) {
        clearInterval(interval);
        item.status = "done";
        eventBus.emit("media:asset-uploaded", {
          assetId: `asset_${Date.now()}_${index}`,
          fileName: item.name,
          mimeType: "application/octet-stream",
          tenantId: props.tenant.id,
        });
        if (queue.value.every((q) => q.status === "done")) {
          isUploading.value = false;
          store.getState().addNotification({ type: "success", message: "All files uploaded successfully." });
        }
      }
    }, 300);
  });
}
</script>
