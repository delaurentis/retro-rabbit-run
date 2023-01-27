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
<script>
  
  export default {
    props: {
      points: Number
    }
  }
  
</script>
  
<!-- CSS --> 
<!-- Style: How does it look? -->
<style scoped>
  .point-container {
    position: absolute;
    top: 13px;
    left: 20px;
  }

  .points {
    color: white;
    font-family: DotGothic16, VT323, Roboto, Helvetica, Arial, sans-serif;
    font-size: 24px;
    font-weight: 200;
  }
  </style>