<script lang="ts">
  import type { TenantConfig } from "@cms/tenant-config";
  import { eventBus } from "@cms/event-bus";
  import { useSharedStore } from "@cms/shared-store";

  export let tenant: TenantConfig;

  interface Participant {
    userId: string;
    displayName: string;
    color: string;
    role: string;
    status: "active" | "idle" | "away";
    joinedAt: number;
  }

  let participants: Participant[] = [
    { userId: "user_alice", displayName: "Alice Chen", color: "#6366f1", role: "admin", status: "active", joinedAt: Date.now() - 120000 },
    { userId: "user_bob", displayName: "Bob Okafor", color: "#10b981", role: "editor", status: "active", joinedAt: Date.now() - 60000 },
    { userId: "user_priya", displayName: "Priya Sharma", color: "#f59e0b", role: "viewer", status: "idle", joinedAt: Date.now() - 300000 },
  ];

  function formatDuration(joinedAt: number): string {
    const seconds = Math.floor((Date.now() - joinedAt) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  }

  function removeParticipant(userId: string) {
    eventBus.emit("collab:user-left", { sessionId: `session_collab`, userId, tenantId: tenant.id });
    participants = participants.filter((p) => p.userId !== userId);
    useSharedStore.getState().addNotification({ type: "info", message: `Participant removed from session.` });
  }
</script>

<div class="participant-list">
  <div class="participant-list-header">
    <h2 class="participant-list-title">Session Participants</h2>
    <span class="participant-count">{participants.length} active</span>
  </div>

  <div class="participant-rows">
    {#each participants as p}
      <div class="participant-row">
        <div class="participant-avatar-large" style="background-color: {p.color}">
          {p.displayName.charAt(0)}
        </div>
        <div class="participant-details">
          <span class="participant-name">{p.displayName}</span>
          <span class="participant-role">{p.role}</span>
        </div>
        <span class="participant-joined">Joined {formatDuration(p.joinedAt)}</span>
        <span class="participant-status participant-status--{p.status}">{p.status}</span>
        <button class="participant-remove-btn" on:click={() => removeParticipant(p.userId)}>
          Remove
        </button>
      </div>
    {/each}
  </div>
</div>
