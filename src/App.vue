<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
  <h1 class="title">Retro Rabbit</h1>
  <stage 
    :hero="hero"
    :sprites="allSprites" 
    :story="story"
  />
  <button class="cover-button"></button>
  <div class="container">
    <img id="hero-sprite-sheet" style="position: absolute; left: 0px; display: none;"/>
    <img id="colliding-sprite-sheet" style="position: absolute; left: 0px; display: none;"/>
    <canvas id="collision-canvas" width="132" height="108"/>
  </div>
  
</template>

<!-- JavaScript --> 
<!-- Functionality: What does it do? -->
<script>
import Stage from './components/Stage.vue'
import { ToneGenerator } from './util/toneGenerator';
import { collideHeroAndSprites } from './util/collider';
import { rabbit } from './data/heroes'
import { textToMorseArray } from './util/morse'
import { terrainLibrary } from './data/terrain'
import { createStory, nextCharacterFromStoryExcept } from './util/story'
import { generateTileForMorse, generateTileForCharacter } from './util/tile'
import { createHero, advanceHero, jumpHeroAndDetectDash, askHeroToJump, injureHero, healHero, isHeroJumping, isHeroAlive } from './util/hero'
import { danceSprite } from './util/sprite'
import { tiles } from './data/tiles';

// Options API
export default {
  components: {
    'stage': Stage
  },
  props: {},
  data() {
    return {
      gameOver: false,
      jumpButtonPressed: false,
      toneGenerator: new ToneGenerator(),
      story: createStory(),
      hero: createHero(rabbit),
      tiles: [],
      sprites: [],
      terrain: [terrainLibrary.terrain]
    }
  },
  computed: {
    allSprites() {
      return [...this.sprites, ...this.terrain]      
    },
  },
  methods: {
    gameLoop() {

      // Move our hero forward
      advanceHero(this.hero)

      // Check for collisions
      this.handleCollisions()

      // Handle any jumps
      this.handleJumping()

      // Handle moving sprites
      this.handleDancingSprites()

      // Generate sprites and terrain
      this.generateTerrain()
      this.generateTiles()

      // Prune sprites and tiles
      this.pruneTiles()

      // Keep running the animation loop
      window.requestAnimationFrame(this.gameLoop)
    },
    handleCollisions() {

      // Get a list of sprites that the hero collides with
      const confirmedCollisions = collideHeroAndSprites(this.hero.sprite, this.sprites, { debug: false })
      confirmedCollisions.forEach(sprite => {
        if ( !sprite.eaten && isHeroAlive(this.hero) ) {

          // If the sprite is edible and not already eaten, eat it up
          if ( sprite.edible ) {
            sprite.eaten = true
          }

          // See what the health effect is
          if ( sprite.nutrition > 0 ) {

            // Positive health effect, yay!
            healHero(this.hero, sprite)
            this.toneGenerator.playHappy()
          }
          else if ( sprite.nutrition < 0 ) {
            // If we're not already hurt and blinking, then we will be now
            // and we'll play a sound when it happens
            if ( injureHero(this.hero, sprite) ) {
              if ( isHeroAlive(this.hero) ) {
                this.toneGenerator.playOuch()
              }
              else {
                this.toneGenerator.playDeath()
                this.onGameOver()
              }
            }
          }
        }

        // Are we triggering any actions
        if ( sprite.actionToTrigger === 'restart') {
          this.onRestart()
        }
      })
    },
    handleJumping() {
      const isDashJustStarted = jumpHeroAndDetectDash(this.hero, this.jumpButtonPressed)
      if ( isDashJustStarted ) {
        this.toneGenerator.playDash()
      }
    },
    handleDancingSprites() {
      this.sprites.filter(sprite => sprite.dance !== undefined ).forEach(sprite => {
        danceSprite(sprite)
      })
    },
    generateTiles() {
        
      // ## How it works
      // We move through one story character at a time
      // And that turns into a set of morse code characters
      // And for each of those, we have 1 tile generated
      // And for each of those, we have N sprites generated
      // 1 story -> N characters -> N morse characters -> 1 tile -> N sprites

      // Get the last tile to determine where to start
      const lastTile = this.tiles.slice(-1)[0] || { x: 0, width: 640 }
      if ( (lastTile.x - this.hero.sprite.x) < 640 ) {

        // Do letters and morse code tiles if we're alive
        if ( isHeroAlive(this.hero) ) {

          // Get the next character from our story
          const nextCharacter = nextCharacterFromStoryExcept(this.story, { skip: [',', '.', '!', '?', '-', '–', '=', '+' ] })
          if ( nextCharacter === undefined ) {

            // If we reach the end, restart the game
            // In the future it would be great to add a special tile for winning
            // like a trophy or something
            this.onRestart()
            return
          }

          // Add the letter tile
          const letterTile = generateTileForCharacter(this.story.currentCharacter, lastTile.x + lastTile.width)
          this.tiles.push(letterTile)
          this.sprites = [...this.sprites, ...letterTile.sprites]

          // Translate to morse code, and add all those tiles now too
          const morseArray = textToMorseArray(nextCharacter)
          morseArray.forEach(morseCharacter => {
            const newTile = generateTileForMorse(morseCharacter, this.tiles.slice(-1)[0].x + this.tiles.slice(-1)[0].width)
            this.tiles.push(newTile)
            this.sprites = [...this.sprites, ...newTile.sprites]
          })
        }
        else {
          // If we're dead, we'll just keep generating tiles with gravestones
          const newTile = generateTileForMorse('💀', this.tiles.slice(-1)[0].x + this.tiles.slice(-1)[0].width)
          this.tiles.push(newTile)
          this.sprites = [...this.sprites, ...newTile.sprites]
        }
      }
    },
    pruneTiles() {
      
      // Prune tiles
      this.tiles = this.tiles.filter(tile => tile.x > this.hero.sprite.x - 1000)

      // Prune sprites
      this.sprites = this.sprites.filter(sprite => sprite.x > this.hero.sprite.x - 1000)
      
      // Prune terrain
      this.terrain = this.terrain.filter(terrain => terrain.x > this.hero.sprite.x - 1000)
    },
    generateTerrain() {
      // Generate more terrain as needed.  Note: this might feel like overkill for a simple
      // line that the character stands on, but in the future, would love to add different heights
      // and varied terrain for the player to keep it interesting
      const lastTerrain = this.terrain.slice(-1)[0] || { x: 0, width: 0, minDistance: 0 }
      if ((lastTerrain.x - this.hero.sprite.x) < 640 ) {
        const lastTerrain = this.terrain.slice(-1)[0]
        const terrainSprite = {...terrainLibrary.terrain, x: lastTerrain.x + lastTerrain.width}
        this.terrain = [...this.terrain, terrainSprite]
      }
    },
    doCommand(e) {
      let cmd = String.fromCharCode(e.keyCode).toLowerCase();
      if ( cmd === ' ') {
        this.onJumpPress()
      }
    },
    onJumpPress() {
      this.jumpButtonPressed = true
      askHeroToJump(this.hero)
    },
    onJumpRelease() {
      this.jumpButtonPressed = false

      // We know we're just doing a short jump when the space bar is released
      // and the sound will play right away after the release, so will feel right
      if ( isHeroJumping(this.hero, 'small') ) {
        this.toneGenerator.playDot()
      }
    },
    onGameOver() {
      this.gameOver = true

      // Clear as many upcoming tiles as we can that already exist
      this.tiles = this.tiles.filter(tile => tile.x < this.hero.sprite.x + 640)
      this.sprites = this.sprites.filter(sprite => sprite.x < this.hero.sprite.x + 640)

    },
    onRestart() {
      this.gameOver = false
      this.hero = createHero(rabbit)
      this.story = createStory()
      this.tiles = []
      this.sprites = []
      this.terrain = [terrainLibrary.terrain]
    },
    preventGesture(e) {
      e.preventDefault()
    }
  },
  created() {
    window.addEventListener('keydown', this.onJumpPress);
    window.addEventListener('keyup', this.onJumpRelease);
    window.addEventListener('touchstart', this.onJumpPress);
    window.addEventListener('touchend', this.onJumpRelease);
    window.addEventListener('mousedown', this.onJumpPress);
    window.addEventListener('mouseup', this.onJumpRelease);
    document.addEventListener('gesturestart', this.preventGesture);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onJumpPress);
    window.removeEventListener('keyup', this.onJumpRelease);
    window.removeEventListener('touchstart', this.onJumpPress);
    window.removeEventListener('touchend', this.onJumpRelease);
    window.removeEventListener('mousedown', this.onJumpPress);
    window.removeEventListener('mouseup', this.onJumpRelease);
    document.removeEventListener('gesturestart', this.preventGesture);
  },
  mounted() {
    window.requestAnimationFrame(this.gameLoop)
  },
}
</script>

<!-- CSS --> 
<!-- Style: How does it look? -->
<style>
body {
  background-color: #FBFBFB;
  background-color: #202020;
  touch-action: manipulation !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-touch-callout: none !important;
  -webkit-user-drag: none !important;
}

div, span, .container {
  user-select: none !important;
  touch-action: manipulation !important;
  -webkit-user-select: none !important;
  -webkit-touch-callout: none !important;
  -webkit-user-drag: none !important;
}

.cover-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none !important;
  touch-action: manipulation !important;
  -webkit-user-select: none !important;
  -webkit-touch-callout: none !important;
  -webkit-user-drag: none !important;
}

input[type="button"]{ touch-action: manipulation; }

#app {
  font-family: DotGothic16, VT323, Roboto, Helvetica, Arial, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-touch-callout: none !important;
  -webkit-user-drag: none !important;
}
h1 {
  color: white;
  margin: 0;
  font-size: 40px;
  font-weight: 300;
}

@media only screen and (max-width: 480px) {
  body {
      background-color: black;
  }
  #app {
    gap: 0px;
  }
  h1 {
    display: none;
  }
}

@media only screen and (max-height: 480px) {
  body {
      background-color: black;
  }
  #app {
    gap: 0px;
  }
  h1 {
    display: none;
  }
}

</style>
