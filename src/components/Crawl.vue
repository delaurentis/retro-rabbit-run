<template>
  <div class="static-crawl-container">
    <div class="static-crawl-content">
      <!-- Display only the last two lines -->
      <div v-if="lines.length > 2">{{ lines.slice(-3, -1)[0] }}</div>
      <div v-if="lines.length > 1">{{ lines.slice(-2, -1)[0] }}</div>
      <div v-if="lines.length > 0">
        <span>{{ lastLineWrittenPortion }}</span>
        <span class="unwritten-portion">{{ lastLineUnwrittenPortion }}</span>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Story as StoryType } from '../data/types'

  export default defineComponent({
    name: 'Crawl',
    props: {
      story: { type: Object as PropType<StoryType>, required: true },
    },
    computed: {
      lines(): string[] {
        return this.story.lines.slice(0, this.story.lineIndex + 1)
      },
      characterIndex(): number {
        return this.story.characterIndex
      },
      lineIndex(): number {
        return this.story.lineIndex
      },
      lastLineWrittenPortion(): string {
        const lastLine = this.lines.slice(-1)[0]
        if ( this.story.lineIndex < this.story.lines.length ) {
          return lastLine.slice(0, Math.max(0, this.story.characterIndex - 1))
        }
        else {
          // Special handling if we're on the last line
          return lastLine
        }
      },
      lastLineUnwrittenPortion(): string {
        const lastLine = this.lines.slice(-1)[0]
        if ( this.story.lineIndex < this.story.lines.length ) {
          return lastLine.slice(Math.max(0, this.story.characterIndex - 1), lastLine.length)
        }
        else {
          // Special handling if we're on the last line
          return ''
        }
      }
    },
  })
</script>
  
<style scoped>
  .static-crawl-container {
    position: absolute;
    perspective: 250px;
    width: 640px;
    left: 0px;
    top: 400px;
    height: 100px;
    overflow: hidden;
    position: relative;
  }
  
  .static-crawl-content {
    position: absolute;
    width: 640px;
    bottom: 0;
    transform: rotateX(50deg);
    transform-origin: bottom;
    color: #ffffff;   
    font-family: 'DotGothic16', 'VT323', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 30px; 
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

</style>