<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
    <div 
      class="sprite"
      :data-type="sprite.type"
      :data-state="sprite.state"
      :data-injured="sprite.injured ? 'true' : 'false'"
      :style="{
        'display': sprite.eaten ? 'none' : 'block',
        'background-color': sprite.color || 'rgba(0,0,0,0)',
        'background-image': sprite.image ? `url('/${sprite.image}-${sprite.state || 'idle'}.png')` : undefined,
        'background-position': `${(Math.round(-1 * sprite.frame || 0)) * sprite.width}px`,
        'opacity': sprite.opacity || 1, 
        'left': `${sprite.x - offset}px`,
        'top': `${sprite.y || 0}px`,
        'z-index': `${sprite.z || 1}`,
        'width': `${sprite.width}px`,
        'height': `${sprite.height}px`,
        'font-size': '30px',
        'font-weight': '200',
        'color': 'white',
        'font-family': 'DotGothic16, VT323, Roboto, Helvetica, Arial, sans-serif',
      }"
    >{{ this.sprite.text }}</div>
  </template>
  
<!-- JavaScript --> 
<!-- Functionality: What does it do? -->
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Sprite as SpriteType } from '../data/types'
  
  export default defineComponent({
    props: {
      sprite: { type: Object as PropType<SpriteType>, required: true },
      offset: { type: Number, required: false }
    },
  })
  
</script>
  
<!-- CSS --> 
<!-- Style: How does it look? -->
<style scoped>
  
  .sprite {
    position: absolute;
    width: 20px;
    height: 20px;
    user-select: none !important;
    -webkit-user-select: none !important;
    -webkit-touch-callout: none !important;
    -webkit-user-drag: none !important;
    touch-action: manipulation !important;
  }
  .sprite[data-type='hero'] {
    background-repeat: none;
    background-position: 0px 0px;
    width: 132px;
    height: 108px;
    background-size: cover;
    image-rendering: crisp-edges;
  }
  .sprite[data-type='hero'][data-state='jumping'],
  .sprite[data-type='hero'][data-state='falling'] {
    background-repeat: none;
    background-position: 0px 0px;
    width: 132px;
    background-size: cover;
    height: 108px;
    image-rendering: crisp-edges;
  }
  .sprite[data-type='hero'][data-injured='true'] {
    animation: blink-animation 0.2s steps(2, start) infinite;
  }
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

</style>