<script lang="ts">
  import { resolveTenant } from "@cms/tenant-config";
  import CollabSession from "./components/CollabSession.svelte";
  import ParticipantList from "./components/ParticipantList.svelte";

  const tenant = resolveTenant();

  let activeView: "session" | "participants" = "session";
</script>

<div class="collab-root">
  <header class="collab-header">
    <h1 class="collab-title">Collaboration</h1>
    <p class="collab-subtitle">{tenant.branding.companyName} — Real-time editing</p>
  </header>

  <nav class="collab-subnav" aria-label="Collaboration navigation">
    <button
      class="collab-nav-btn {activeView === 'session' ? 'collab-nav-btn--active' : ''}"
      on:click={() => (activeView = "session")}
    >
      Active Session
    </button>
    <button
      class="collab-nav-btn {activeView === 'participants' ? 'collab-nav-btn--active' : ''}"
      on:click={() => (activeView = "participants")}
    >
      Participants
    </button>
  </nav>

  <div class="collab-content">
    {#if activeView === "session"}
      <CollabSession {tenant} />
    {:else}
      <ParticipantList {tenant} />
    {/if}
  </div>
</div>

<style src="./collab.css"></style>
