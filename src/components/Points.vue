<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
  <span class="point-container">
    <span class="points">
      {{ points }}
    </span>
  </span>
</template>
  
<!-- JavaScript --> 
<!-- Functionality: What does it do? -->
<script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    props: {
      points: { type: Number, required: true }
    }
  })
  
</script>
  
<!-- CSS --> 
<!-- Style: How does it look? -->
<style scoped>
  .point-container {
    position: absolute;
    top: 8px;
    left: 16px;
  }

  .points {
    color: white;
    font-family: DotGothic16, VT323, Roboto, Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: 200;
  }
</style>