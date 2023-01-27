<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
  <h1 class="title">Retro Rabbit</h1>
  <stage 
    :hero="hero"
    :sprites="allSprites" 
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
import { generalConstants, jumpConstants } from './data/constants.js'

// Options API
export default {
  components: {
    'stage': Stage
  },
  props: {},
  data() {
    return {
      gameOver: false,
      spacePressed: false,
      maxPixel: 0,
      hero: { 
        type: 'hero', 
        state: 'running', 
        jumpType: 'small', 
        hearts: 3, 
        carrots: 0, 
        points: 0, 
        frame: 0, 
        framesPerTick: generalConstants.framesPerTick, 
        stateTicks: 0, 
        hurtTicks: 0, 
        color: 'clear', 
        x: 30, 
        y: 220, 
        baseY: 220, 
        z: 1, 
        width: 132, 
        height: 108 
      },
      jumpConstants: jumpConstants,
      terrain: [
        { type: 'terrain', color: 'white', x: 0, y: 328, z: 0, width: 640, height: 2, minDistance: 0 },
      ],
      terrainLibrary: [
        { type: 'terrain', color: 'white', y: 328, z: 0, width: 30, height: 2, minDistance: 0 },
      ],
      compendium: [
        { type: 'carrot', state: 'idle', y: 280, z: 1, width: 40, height: 38, minDistance: 60 },
        { type: 'carrot', state: 'idle', y: 240, z: 1, width: 40, height: 38, minDistance: 60 },
        { type: 'carrot', state: 'idle', y: 200, z: 1, width: 40, height: 38, minDistance: 60 },
        { type: 'carrot', state: 'idle', y: 160, z: 1, width: 40, height: 38, minDistance: 60 },
        { type: 'carrot', state: 'idle', y: 120, z: 1, width: 40, height: 38, minDistance: 60 },
        { type: 'rock40x52', state: 'idle', z: 1, width: 40, height: 52, yOffset: 0, minDistance: 220 },
        { type: 'rock51x51', state: 'idle', z: 1, width: 51, height: 51, yOffset: 0, minDistance: 220 },
        { type: 'rock57x54', state: 'idle', z: 1, width: 57, height: 54, yOffset: 0, minDistance: 220 },
        { type: 'rock77x57', state: 'idle', z: 1, width: 77, height: 57, yOffset: 0, minDistance: 220 },
        { type: 'rock177x88', state: 'idle', z: 1, width: 177, height: 88, yOffset: 6, minDistance: 320 },
        { type: 'rock230x134', state: 'idle', z: 1, width: 230, height: 134, yOffset: 6, minDistance: 400 },
        { type: 'rock172x58', state: 'idle', z: 1, width: 172, height: 58, yOffset: 0, minDistance: 320 },

/*
      { type: 'rock95x52', state: 'idle', z: 1, width: 95, height: 52, yOffset: 0, minDistance: 280 },
        { type: 'rock101x52', state: 'idle', z: 1, width: 101, height: 52, yOffset: 0, minDistance: 280 },
*/
        /*
        { type: 'rock322x188', state: 'idle', z: 1, width: 322, height: 188, minDistance: 220 },
        { type: 'rock55x72', state: 'idle', z: 1, width: 55, height: 72, minDistance: 220 },
        { type: 'rock71x71', state: 'idle', z: 1, width: 71, height: 71, minDistance: 250 },
        { type: 'rock80x76', state: 'idle', z: 1, width: 80, height: 76, minDistance: 280  },
        { type: 'rock107x80', state: 'idle', z: 1, width: 107, height: 80, minDistance: 290  },
        { type: 'rock247x123', state: 'idle', z: 1, width: 247, height: 123, minDistance: 300  },
        */
      ],
      items: [
      ],
      obstacles: [

      ],
      sprites: [

      ]
    }
  },
  computed: {
    allSprites() {
      return [...this.sprites, ...this.terrain]      
    }
  },
  methods: {
    gameLoop() {

      // We always advance the state of the hero
      this.hero.stateTicks += 1

      // Always advance our current animation
      this.hero.frame += this.hero.framesPerTick

      // Always run forward
      this.hero.x += generalConstants.speedInPixelsPerTick

      // Check for collisions
      this.handleCollisions()

      // Handle any injuries
      this.handleInjuries()

      // Handle any jumps
      this.handleJumping()

      // Handle moving sprites
      this.handleMovingSprites()

      // Generate sprites and terrain
      this.generateTerrain()
      this.generateSprites()

      // Keep running the animation loop
      window.requestAnimationFrame(this.gameLoop)
    },
    handleCollisions() {

      // See how many collisions there are
      const collisions = this.sprites.filter(sprite => 
        (this.hero.x + this.hero.width > sprite.x && this.hero.x < sprite.x + sprite.width) && 
        (this.hero.y + this.hero.height > sprite.y && this.hero.y < sprite.y + sprite.height)
      ) 

      // If there are collisions, handle them
      const heroSpriteSheet = document.getElementById('hero-sprite-sheet')
      heroSpriteSheet.src = `./hero-${this.hero.state}.png`
      const snapshotCanvas = document.getElementById('collision-canvas')
      const canvas = document.createElement('canvas')
      canvas.width = 132
      canvas.height = 108

      const ctx = canvas.getContext('2d', { willReadFrequently: true })

      // We'll have another sheet for the obstacles we encounter
      const collidingSpriteSheet = document.getElementById('colliding-sprite-sheet')

      // Draw each obstacle
      const confirmedCollisions = collisions.filter(sprite => {
        
        // Clear the canvas and draw the current frame of our hero
        ctx.clearRect(0, 0, 132, 108);
        ctx.globalAlpha = 0.5
        ctx.globalCompositeOperation = 'overlay'
        ctx.drawImage(heroSpriteSheet, (Math.ceil(this.hero.frame) % 16) * 132, 0, 132, 108, 0, 0, 132, 108);
        
        // Draw the sprite we are testing for collision
        collidingSpriteSheet.src = `./${sprite.type}-${sprite.state}.png`
        if ( sprite.type !== 'carrot' ) {
          //ctx.filter = 'grayscale(100%) brightness(35%) sepia(100%) hue-rotate(-48deg) saturate(100%) contrast(100)'
        }
        ctx.drawImage(collidingSpriteSheet, 
          (Math.ceil(sprite.frame || 0)) * sprite.width, 
          0, 
          sprite.width, 
          sprite.height, 
          sprite.x - this.hero.x, 
          sprite.y - this.hero.y, 
          sprite.width, 
          sprite.height);

        // Count the total # of pixels overlapping
        const imageData = ctx.getImageData(0, 0, 132, 108)
        const pixels = imageData.data
        let total = 0
        this.maxPixel = 0
        for (let i = 0; i < pixels.length; i += 4) {
          if ( pixels[i + 3] > 160 && pixels[i + 3] < 255 ) {
            total += 1
          }
        }

        // Clean things up for next time
        ctx.filter = 'none'
        ctx.globalAlpha = 100
        collidingSpriteSheet.src = ''

        // Render the snapshot to the debug canvas
        //if ( total > 0 ) {
          //snapshotCanvas.getContext('2d').clearRect(0, 0, 132, 108);
          //snapshotCanvas.getContext('2d').drawImage(canvas, 0, 0, 132, 108, 0, 0, 132, 108)
        //}

        return total > 0
      })

      // Extract the value of the alpha channel from the pixel at the hero's feet

      // Figure out which collisions are good vs bad
      const harmful = confirmedCollisions.filter(sprite => sprite.type !== 'carrot')
      const helpful = confirmedCollisions.filter(sprite => sprite.type === 'carrot')

      // If they are helpful, hide the carrot when touched
      helpful.forEach(sprite => { 
        if (!sprite.eaten) {
          sprite.eaten = true 
          this.hero.hearts = Math.min(this.hero.hearts + 0.25, 3)
          if ( this.hero.hearts >= 3 ) { 
            this.hero.points += 1
          }
        }
      })

      // If they are harmful, make the character blink
      if ( harmful.length > 0 ) {
        if ( !this.hero.injured ) {
          this.hero.injured = true
          this.hero.hearts = Math.max(this.hero.hearts - 1, 0)
        }
        this.hero.injuredTicks = 50
      }
    },
    handleInjuries() {
      if ( this.hero.injuredTicks > 0 ) {
        this.hero.injuredTicks -= 1
        this.hero.injured = true
      }
      else {
        this.hero.injured = false
      }
    },
    handleJumping() {

      // If they are jumping then change the Y
      if ( this.hero.state === 'jumping' ) {

        // Figure out which constants to use based on jump type
        const constantsToUse = jumpConstants[this.hero.jumpType]
        if ( this.hero.frame <= constantsToUse.frameCount ) {

          // Adjust frame rate based on the current jump type
          this.hero.framesPerTick = jumpConstants[this.hero.jumpType].framesPerTick

          // Our X and Y value will change based on a pre-computed curve
          this.hero.y = this.hero.baseY - (constantsToUse.yScale * constantsToUse.yCurve[Math.ceil(this.hero.frame)])
          this.hero.x += (constantsToUse.xScale * constantsToUse.xCurve[Math.ceil(this.hero.frame)])

          // See if space is still pressed
          if ( this.spacePressed ) {
            if ( this.hero.frame >= 5 && this.hero.frame <= 10 ) {
              this.hero.jumpType = 'large'
            }
          }
        }
        else {
          this.hero.state = 'running'
          this.hero.stateTicks = 0
          this.hero.frame = 0
          this.hero.y = this.hero.baseY
          this.hero.framesPerTick = generalConstants.framesPerTick
        }
      }
    },
    handleMovingSprites() {
      this.handleMoveCarrots()
    },
    handleMoveCarrots() {
      this.sprites.filter(sprite => sprite.type === 'carrot').forEach(sprite => {
        sprite.stateTicks = sprite.stateTicks || 0
        sprite.stateTicks += 1
        if ( sprite.stateTicks < 30 ) {
          sprite.y -= 1
        }
        else if ( sprite.stateTicks < 60 ) {
          sprite.y += 1
        }
        else {
          sprite.stateTicks = 0
        }
      })
    },
    generateSprites() {
      // Generate more sprites as needed
      const lastSprite = this.sprites.slice(-1)[0] || { x: 0, width: 0, minDistance: 640 }
      if ( (lastSprite.x - this.hero.x) < 640 ) {
        const diceRoll = Math.floor(Math.random() * 10)
        if ( diceRoll === 1 ) {

          // Compute which sprite we'll
          const spriteRoll = Math.floor(Math.random() * this.compendium.length)
          const randomSprite = this.compendium[spriteRoll]

          // Avoid two obstacles that are the same in a row (looks bad)
          if ( randomSprite.type !== 'carrot' && 
               this.obstacles.length > 0 && 
               randomSprite.type === this.obstacles.slice(-1)[0].type ) {
            return
          }

          // Compute the target location
          const distanceRoll = Math.floor(Math.random() * 100)
          const targetX = lastSprite.x + lastSprite.width + lastSprite.minDistance + distanceRoll
          const targetY = randomSprite.y || ((328 - randomSprite.height) + (randomSprite.yOffset || 0))
          
          // Customize and add the sprite to our list
          const customizedSprite = {...randomSprite, x: targetX, y: targetY}
          this.sprites = [...this.sprites, customizedSprite]

          // Store obtacles and items separately for reference
          if ( customizedSprite.type === 'carrot' ) {
            this.items = [...this.items, customizedSprite]
          }
          else {
            this.obstacles = [...this.obstacles, customizedSprite]
          }
        }
      }
    },
    generateTerrain() {
      // Generate more terrain as needed
      const lastTerrain = this.terrain.slice(-1)[0] || { x: 0, width: 0, minDistance: 0 }
      if ((lastTerrain.x - this.hero.x) < 640 ) {
        const lastTerrain = this.terrain.slice(-1)[0]
        const spriteRoll = Math.floor(Math.random() * this.terrainLibrary.length)
        const randomSprite = {...this.terrainLibrary[spriteRoll], x: lastTerrain.x + lastTerrain.width}
        this.terrain = [...this.terrain, randomSprite]
      }
    },
    doCommand(e) {
      let cmd = String.fromCharCode(e.keyCode).toLowerCase();
      if ( cmd === ' ') {
        this.onSpacePress()
      }
    },
    onSpacePress() {
      this.spacePressed = true
      if ( this.hero.state === 'running' ) {
        this.hero.state = 'jumping'
        this.hero.jumpType = 'small'
        this.hero.stateTicks = 0
        this.hero.frame = 0
        this.hero.framesPerTick = jumpConstants[this.hero.jumpType].framesPerTick
        this.hero.points += 1
      } 
      else if ( this.hero.state === 'jumping' ) {

        // Allow them to shortcut the end of the jumping if they press again at the end
        if ( this.hero.frame >= 17 ) {
          this.hero.state = 'jumping'
          this.hero.jumpType = 'small'
          this.hero.stateTicks = 0
          this.hero.frame = 0
          this.hero.framesPerTick = jumpConstants[this.hero.jumpType].framesPerTick
        }
      }
    },
    onSpaceRelease() {
      this.spacePressed = false
    },
    onGameOver() {
      this.gameOver = true
    },
    preventGesture(e) {
      e.preventDefault()
    }
  },
  created() {
    window.addEventListener('keydown', this.onSpacePress);
    window.addEventListener('keyup', this.onSpaceRelease);
    window.addEventListener('touchstart', this.onSpacePress);
    window.addEventListener('touchend', this.onSpaceRelease);
    window.addEventListener('mousedown', this.onSpacePress);
    window.addEventListener('mouseup', this.onSpaceRelease);
    document.addEventListener('gesturestart', this.preventGesture);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onSpacePress);
    window.removeEventListener('keyup', this.onSpaceRelease);
    window.removeEventListener('touchstart', this.onSpacePress);
    window.removeEventListener('touchend', this.onSpaceRelease);
    window.removeEventListener('mousedown', this.onSpacePress);
    window.removeEventListener('mouseup', this.onSpaceRelease);
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
  font-family: VT323, Roboto, Helvetica, Arial, sans-serif;
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
