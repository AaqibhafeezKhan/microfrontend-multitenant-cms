<script lang="ts">
  import { resolveTenant } from "@cms/tenant-config";
  import CollabSession from "./components/CollabSession.svelte";
  import ParticipantList from "./components/ParticipantList.svelte";
  import StickyNote from "./components/StickyNote.svelte";
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

  let lines: { points: string, color: string }[] = [];
  let isDrawing = false;
  let currentPoints = "";

  function startDrawing(e: MouseEvent) {
    isDrawing = true;
    currentPoints = `${e.offsetX},${e.offsetY}`;
    lines = [...lines, { points: currentPoints, color: "#6366f1" }];
  }

  function draw(e: MouseEvent) {
    if (!isDrawing) return;
    currentPoints += ` ${e.offsetX},${e.offsetY}`;
    lines[lines.length - 1].points = currentPoints;
    lines = lines; // Trigger reactivity for nested update
  }

  function stopDrawing() {
    isDrawing = false;
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
        <StickyNote 
          bind:text={note.text}
          x={note.x}
          y={note.y}
          color={note.color}
          onDrag={(e) => handleDrag(note.id, e)}
        />
      {/each}
    </div>
    
    <div class="reactive-playground mt-8">
      <div class="flex items-center justify-between mb-4">
        <label class="text-xs font-semibold uppercase text-slate-500">Shared Whiteboard (Fine-grained SVG)</label>
        <button class="btn btn-xs btn-secondary" on:click={() => lines = []}>Clear Board</button>
      </div>
      
      <svg 
        class="whiteboard-canvas" 
        on:mousedown={startDrawing}
        on:mousemove={draw}
        on:mouseup={stopDrawing}
        on:mouseleave={stopDrawing}
      >
        {#each lines as line}
          <polyline 
            points={line.points} 
            fill="none" 
            stroke={line.color} 
            stroke-width="3" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        {/each}
      </svg>
      
      <p class="text-[10px] text-slate-500 mt-2 italic">
        Svelte compiles SVG properties into direct DOM updates, making complex drawing operations extremely fast.
      </p>
    </div>
  </div>
</div>

<style src="./collab.css"></style>
