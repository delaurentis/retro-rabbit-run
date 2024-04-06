<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
  <div class="stage">
    <sprite :sprite="hero.sprite" :offset="stageOffset"/>
    <sprite  
      v-for="(sprite, index) in spritesInFrame" 
      :key="index"
      :sprite="sprite"
      :offset="stageOffset"
    />
    <points :points="hero.points"/>
    <hearts :hearts="hero.hearts"/>
    <crawl :story="story"/>
  </div>
</template>
  
<!-- JavaScript --> 
<!-- Functionality: What does it do? -->
<script lang="ts">
  import Sprite from './Sprite.vue'
  import Hero from './Hero.vue'
  import Hearts from './Hearts.vue'
  import Points from './Points.vue'
  import Crawl from './Crawl.vue'

  import { defineComponent, PropType } from 'vue'
  import { Sprite as SpriteType } from '../data/types'
  import { Hero as HeroType } from '../data/types'
  import { Story as StoryType } from '../data/types'

  export default defineComponent({
    components: {
      'sprite': Sprite,
      'hero': Hero,
      'hearts': Hearts,
      'points': Points,
      'crawl': Crawl,
    },
    props: {
      hero: { type: Object as PropType<HeroType>, required: true },
      sprites: {
        type: Array as PropType<SpriteType[]>,
        default: [],
      },
      story: { type: Object as PropType<StoryType>, required: true },
    },
    data() {
      return {
      }
    },
    computed: {
      stageOffset(): number {
        const mobileOffset: number = 50
        const desktopOffset: number = 150
        const isMobile: boolean = (window.innerWidth <= 480)
        return this.hero.sprite.x - (isMobile ? mobileOffset : desktopOffset)
      },
      spritesInFrame(): Sprite[] {
        const offset: number = this.stageOffset
        return this.sprites.filter(sprite => {
          return (((sprite.x - offset) + sprite.width) > 0) && ((sprite.x - offset) < 640)
        })
      }
    },
    methods: {
      clickBox(index) {
      },
      switchPlayer() {
      },
    },
    watch: {
    },
    mounted() {
    },
  })
  
</script>
  
<!-- CSS --> 
<!-- Style: How does it look? -->
<style scoped>
  .stage {
    display: block;
    position: relative;
    background-color: black;
    max-width: 640px;
    width: 100%;
    height: 540px;
    border: 1px solid #DADADA;
    overflow: hidden;
    user-select: none !important;
    -webkit-user-select: none !important;
    -webkit-touch-callout: none !important;
    -webkit-user-drag: none !important;
    touch-action: manipulation !important;
}

  @media only screen and (max-width: 480px) {
    .stage {
      border: none;
    }
  }

  @media only screen and (max-height: 480px) {
    .stage {
      border: none;
    }
  }
</style>