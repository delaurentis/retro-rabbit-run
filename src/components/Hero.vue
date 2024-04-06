<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
  <div 
    class="hero"
    :data-type="sprite.type"
    :style="{
      'left': `${sprite.x - offset}px`,
      'top': `${sprite.y}px`,
      'z-index': `${sprite.z}`,
      'width': `${sprite.width}px`,
      'height': `${sprite.height}px`,
    }"
  >
  </div>
</template>
  
<!-- JavaScript --> 
<!-- Functionality: What does it do? -->
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Sprite as SpriteType } from '../data/types'
  
  export default defineComponent({
    props: {
      sprite: { type: Object as PropType<Sprite>, required: true },
      offset: { type: Number, required: true }
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
  }
  img {
    image-rendering: pixelated;
    width: 20px;
    height: 20px;
  }

</style>