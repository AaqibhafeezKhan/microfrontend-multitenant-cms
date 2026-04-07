<script lang="ts">
  import { resolveTenant } from "@cms/tenant-config";
  import CollabSession from "./components/CollabSession.svelte";
  import ParticipantList from "./components/ParticipantList.svelte";
  import { spring } from "svelte/motion";
  const tenant = resolveTenant();

  let activeView: "session" | "participants" = "session";
  let content = "";
  let isTyping = false;
  let typingTimeout: any;

  // Sticky Notes Showcase
  let notes = [
    { id: 1, text: "Welcome to CMS!", x: spring(100), y: spring(100), color: "#fef3c7" },
    { id: 2, text: "Try dragging me!", x: spring(300), y: spring(150), color: "#dcfce7" }
  ];

  function addNote() {
    notes = [...notes, { 
      id: Date.now(), 
      text: "New Note", 
      x: spring(Math.random() * 400), 
      y: spring(Math.random() * 300), 
      color: "#f1f5f9" 
    }];
  }

  function handleDrag(id: number, event: MouseEvent) {
    if (event.buttons !== 1) return;
    const note = notes.find(n => n.id === id);
    if (note) {
      note.x.set(event.clientX - 300); // Offset for demo
      note.y.set(event.clientY - 200);
    }
  }

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
    <div class="framework-header">
      <div class="framework-badge framework-badge--svelte">Built with Svelte 4</div>
      <button class="btn btn-sm btn-secondary" on:click={addNote}>+ Add Note</button>
    </div>

    <div class="sticky-notes-canvas">
      {#each notes as note (note.id)}
        <div 
          class="sticky-note" 
          style="transform: translate({$note.x}px, {$note.y}px); background: {note.color};"
          on:mousedown={() => (true)}
          on:mousemove={(e) => handleDrag(note.id, e)}
        >
          <textarea bind:value={note.text}></textarea>
        </div>
      {/each}
    </div>
    
    <div class="reactive-playground mt-8">
      <label class="text-xs font-semibold mb-2 block uppercase text-slate-500">Live Editor Sync (Local State)</label>
      <textarea 
        bind:value={content} 
        on:input={handleInput}
        placeholder="Type here to see Svelte's direct reactive binding..."
        class="collab-textarea"
      ></textarea>
      
      <div class="collab-stats">
        <span>{charCount} chars</span>
        <span>{wordCount} words</span>
        {#if isTyping}
          <span class="typing-indicator text-primary italic">Typing...</span>
        {/if}
      </div>
    </div>
  </div>
</div>

<style src="./collab.css"></style>
