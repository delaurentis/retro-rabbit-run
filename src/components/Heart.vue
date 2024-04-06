<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
    <span class="heart-container">
      <span class="heart">
        <sprite :sprite="sprite"/>
      </span>
    </span>
</template>
  
<!-- JavaScript --> 
<!-- Functionality: What does it do? -->
<script lang="ts">
  import { defineComponent } from 'vue'
  import Sprite from './Sprite.vue'
  import { Sprite as SpriteType } from '../data/types'

  export default defineComponent({
    components: {
      'sprite': Sprite
    },
    props: {
      quarters: { type: Number, required: true }
    },
    computed: {
      sprite(): SpriteType {
        return {
          type: 'heart',
          image: 'heart',
          state: `${Math.ceil(this.quarters)}`,
          x: 0,
          y: 0,
          z: 0,
          width: 128,
          height: 128,
        }
      }
    }
  })
  
</script>
  
<!-- CSS --> 
<!-- Style: How does it look? -->
<style scoped>
  .heart-container {
    display: inline-block;
    transform: scale(0.75);
    width: 96px;  
    margin-left: -40px;
  }
  .heart {
    margin-top: -60px;
    position: relative;
    display: block;
    width: 128px;
    height: 128px;
  }
  </style>