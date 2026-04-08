<script lang="ts">


  export let text: string;
  export let x: number;
  export let y: number;
  export let color: string;
  export let onDrag: (event: MouseEvent) => void;

  function handleMouseMove(e: MouseEvent) {
    if (e.buttons === 1) {
      onDrag(e);
    }
  }
</script>

<div 
  class="sticky-note" 
  style="transform: translate({x}px, {y}px); background: {color};"
  on:mousemove={handleMouseMove}
>
  <textarea bind:value={text}></textarea>
</div>
