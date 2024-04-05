<template>
    <div class="static-crawl-container">
      <div class="static-crawl-content">
        <!-- Display only the last two lines -->
        <div v-if="lines.length > 2">{{ lines.slice(-3, -1)[0] }}</div>
        <div v-if="lines.length > 1">{{ lines.slice(-2, -1)[0] }}</div>
        <div v-if="lines.length > 0">
          <span>{{ lastLineWrittenPortion }}</span>
          <span class="current-portion">{{ currentPortion }}</span>
          <span class="unwritten-portion">{{ lastLineUnwrittenPortion }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Crawl',
    props: {
      story: Object,
    },
    computed: {
      lines() {
        return this.story.lines.slice(0, this.story.lineIndex + 1)
      },
      characterIndex() {
        return this.story.characterIndex
      },
      lineIndex() {
        return this.story.lineIndex
      },
      lastLineWrittenPortion() {
        const lastLine = this.lines.slice(-1)[0]
        const portion = lastLine.slice(0, Math.max(0, this.story.characterIndex - 1))
        return portion
      },
      currentPortion() {
        return ''
      },
      lastLineUnwrittenPortion() {
        const lastLine = this.lines.slice(-1)[0]
        const portion = lastLine.slice(Math.max(0, this.story.characterIndex - 1), lastLine.length)
        return portion
      }
    },
  }
  </script>
  
  <style scoped>
  .static-crawl-container {
    position: absolute;
    perspective: 250px;
    width: 640px;
    left: 0px;
    top: 400px;
    height: 100px; /* Adjust based on your design */
    overflow: hidden;
    position: relative;
    background-color: black; /* Optional */
  }
  
  .static-crawl-content {
    position: absolute;
    width: 640px;
    bottom: 0;
    transform: rotateX(50deg);
    transform-origin: bottom;
    color: #ffffff;   /*#feda4a;*/
    font-family: 'DotGothic16', 'VT323', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 30px; /* Adjust based on your design */
    white-space: nowrap;
  }

  @media screen and (max-width: 480px){
    .static-crawl-container {
      width: 390px;
    }
    .static-crawl-content {
      width: 390px;
      font-size: 22px;
    }
  }

  .unwritten-portion {
    opacity: 0.25;
  }

  .current-portion {
    background-color: #777777;
    display: inline-block;
  }

  </style>