<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
    <span class="heart-container">
      <span class="heart">
        <sprite :sprite="sprite" offset="0"/>
      </span>
    </span>
</template>
  
<!-- JavaScript --> 
<!-- Functionality: What does it do? -->
<script>
  import Sprite from './Sprite.vue'

  export default {
    components: {
      'sprite': Sprite
    },
    props: {
      quarters: Number
    },
    computed: {
      sprite() {
        return {
          type: 'heart',
          state: `${Math.ceil(this.quarters)}`,
          x: 0,
          y: 0,
          z: 0,
          width: 128,
          height: 128,
        }
      }
    }
  }
  
</script>
  
<!-- CSS --> 
<!-- Style: How does it look? -->
<style scoped>
  .heart-container {
    display: inline-block;
    transform: scale(0.5);
    width: 64px;  
    margin-left: -20px;

  }
  .heart {
    margin-top: -60px;
    position: relative;
    display: block;
    width: 128px;
    height: 128px;
  }
  </style>