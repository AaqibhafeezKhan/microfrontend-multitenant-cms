<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { eventBus } from "@cms/event-bus";
  import { useSharedStore } from "@cms/shared-store";
  import type { TenantConfig } from "@cms/tenant-config";

  export let tenant: TenantConfig;

  interface CollabParticipant {
    userId: string;
    displayName: string;
    color: string;
    cursorLine: number;
    cursorCol: number;
    joinedAt: number;
  }

  const PARTICIPANT_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"];

  let sessionId = `session_${Date.now()}`;
  let participants: CollabParticipant[] = [
    { userId: "user_alice", displayName: "Alice Chen", color: "#6366f1", cursorLine: 12, cursorCol: 34, joinedAt: Date.now() - 120000 },
    { userId: "user_bob", displayName: "Bob Okafor", color: "#10b981", cursorLine: 28, cursorCol: 5, joinedAt: Date.now() - 60000 },
  ];

  let documentContent = `# Getting Started with Headless CMS

## Introduction

A headless CMS separates the content repository from the presentation layer, enabling teams to deliver content across multiple channels.

## Architecture

The key insight is that content and presentation are separate concerns. By decoupling them, you gain:

- Framework flexibility — use React, Vue, Angular, or any other renderer
- Channel independence — same content served to web, mobile, email, and IoT
- Team autonomy — editorial teams work independently of frontend engineers

## Multi-Tenant Considerations

When running a headless CMS for multiple tenants, the primary concerns are:
1. Content isolation — each tenant's data is strictly partitioned
2. Feature differentiation — enterprise plans unlock advanced features
3. Branding — per-tenant CSS variables drive visual identity`;

  let unsubscribeCursorMoved: (() => void) | null = null;
  let unsubscribeUserJoined: (() => void) | null = null;
  let unsubscribeUserLeft: (() => void) | null = null;

  onMount(() => {
    const store = useSharedStore;
    const user = store.getState().auth.user;
    if (user) {
      eventBus.emit("collab:user-joined", {
        sessionId,
        userId: user.id,
        contentId: "content_001",
        tenantId: tenant.id,
      });
    }

    unsubscribeCursorMoved = eventBus.on("collab:cursor-moved", (payload) => {
      participants = participants.map((p) =>
        p.userId === payload.userId
          ? { ...p, cursorLine: payload.position.line, cursorCol: payload.position.column }
          : p
      );
    });

    unsubscribeUserJoined = eventBus.on("collab:user-joined", (payload) => {
      if (!participants.find((p) => p.userId === payload.userId)) {
        participants = [...participants, {
          userId: payload.userId,
          displayName: payload.userId,
          color: PARTICIPANT_COLORS[participants.length % PARTICIPANT_COLORS.length] ?? "#6366f1",
          cursorLine: 1,
          cursorCol: 1,
          joinedAt: Date.now(),
        }];
      }
    });

    unsubscribeUserLeft = eventBus.on("collab:user-left", (payload) => {
      participants = participants.filter((p) => p.userId !== payload.userId);
    });
  });

  onDestroy(() => {
    unsubscribeCursorMoved?.();
    unsubscribeUserJoined?.();
    unsubscribeUserLeft?.();
  });

  function handleTextareaKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLTextAreaElement;
    const text = target.value.substring(0, target.selectionStart);
    const lines = text.split("\n");
    const line = lines.length;
    const col = (lines[lines.length - 1] ?? "").length + 1;

    const store = useSharedStore;
    const user = store.getState().auth.user;
    if (user) {
      eventBus.emit("collab:cursor-moved", {
        sessionId,
        userId: user.id,
        position: { line, column: col },
      });
    }
  }
</script>

<div class="collab-session">
  <div class="session-header">
    <div class="session-info">
      <span class="session-label">Session</span>
      <span class="session-id">{sessionId.slice(0, 16)}...</span>
    </div>
    <div class="participant-avatars">
      {#each participants as p}
        <div
          class="participant-avatar"
          style="background-color: {p.color}"
          title="{p.displayName} — Line {p.cursorLine}:{p.cursorCol}"
        >
          {p.displayName.charAt(0)}
        </div>
      {/each}
    </div>
  </div>

  <div class="editor-container">
    <div class="line-numbers" aria-hidden="true">
      {#each documentContent.split("\n") as _, i}
        <span class="line-number">{i + 1}</span>
      {/each}
    </div>
    <textarea
      class="collab-editor"
      bind:value={documentContent}
      on:keyup={handleTextareaKeyUp}
      spellcheck="false"
      aria-label="Collaborative document editor"
    ></textarea>
  </div>

  <div class="cursor-indicators">
    {#each participants as p}
      <div class="cursor-indicator" style="border-color: {p.color}; color: {p.color}">
        {p.displayName} — L{p.cursorLine}:{p.cursorCol}
      </div>
    {/each}
  </div>
</div>
