<script lang="ts">
  import { resolveTenant } from "@cms/tenant-config";
  import CollabSession from "./components/CollabSession.svelte";
  import ParticipantList from "./components/ParticipantList.svelte";

  const tenant = resolveTenant();

  let activeView: "session" | "participants" = "session";
  let content = "";
  let isTyping = false;
  let typingTimeout: any;

  $: charCount = content.length;
  $: wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  function handleInput() {
    isTyping = true;
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      isTyping = false;
    }, 1000);
  }
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
    <div class="framework-badge framework-badge--svelte">Built with Svelte 4</div>
    
    <div class="reactive-playground">
      <textarea 
        bind:value={content} 
        on:input={handleInput}
        placeholder="Type here to see Svelte's reactivity..."
        class="collab-textarea"
      ></textarea>
      
      <div class="collab-stats">
        <span>{charCount} characters</span>
        <span>{wordCount} words</span>
        {#if isTyping}
          <span class="typing-indicator italic">Typing...</span>
        {/if}
      </div>
    </div>

    {#if activeView === "session"}
      <CollabSession {tenant} />
    {:else}
      <ParticipantList {tenant} />
    {/if}
  </div>
</div>

<style src="./collab.css"></style>
