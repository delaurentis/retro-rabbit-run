<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
    <div class="hearts">
      <div class="hearts-container">
        <heart key="heart1" :quarters="Math.max(Math.min((this.hearts * 4), 4), 0)"/>
        <heart key="heart2" :quarters="Math.max(Math.min((this.hearts * 4) - 4, 4), 0)"/>
        <heart key="heart3" :quarters="Math.max(Math.min((this.hearts * 4) - 8, 4), 0)"/>
      </div>
    </div>
  </template>
  
  <!-- JavaScript --> 
  <!-- Functionality: What does it do? -->
  <script>
  
  import Heart from './Heart.vue'
  
  export default {
    components: {
      'heart': Heart
    },
    props: {
      hearts: Number
    }
  }
  
  </script>
  
  <!-- CSS --> 
  <!-- Style: How does it look? -->
  <style scoped>
  .hearts {
    position: absolute;
    top: 15px;
    right: 5px;
    height: 40px;
    white-space: nowrap;
  }

  .hearts-container {
    position: relative;
    display: block;
  }

  </style>