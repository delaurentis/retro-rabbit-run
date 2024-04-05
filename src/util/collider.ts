import { Sprite } from '../data/types'

interface CollideOptions {
  debug?: boolean;
}

export const collideHeroAndSprites = (heroSprite: Sprite, sprites: Sprite[], options: CollideOptions = {}) => {

  // How many pixels do we allow to collide before we consider it a collision?
  const maxPixelsAllowed: number = 2

  // See how many collisions there are
  const collisions: Sprite[] = sprites.filter(sprite => 
    (heroSprite.x + heroSprite.width > sprite.x && heroSprite.x < sprite.x + sprite.width) && 
    (heroSprite.y + heroSprite.height > sprite.y && heroSprite.y < sprite.y + sprite.height)
  ) 

  // If there are collisions, handle them
  const heroSpriteSheet: HTMLImageElement = document.getElementById('hero-sprite-sheet') as HTMLImageElement
  if (heroSpriteSheet) {
    heroSpriteSheet.src = `./${heroSprite.type}-${heroSprite.state}.png`
  }
  const snapshotCanvas: HTMLCanvasElement = document.getElementById('collision-canvas') as HTMLCanvasElement
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = 132
  canvas.height = 108

  // Try to get a context.  We can't continue without one
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d', { willReadFrequently: true })
  if ( !ctx ) { throw new Error('Could not get 2d context for collision detection') }

  // We'll have another sheet for the obstacles we encounter
  const collidingSpriteSheet: HTMLImageElement  = document.getElementById('colliding-sprite-sheet') as HTMLImageElement

  // Draw each obstacle
  const confirmedCollisions: Sprite[] = collisions.filter(sprite => {
    
    // Clear the canvas and draw the current frame of our heroSprite
    ctx.clearRect(0, 0, 132, 108);
    ctx.globalAlpha = 0.5
    ctx.globalCompositeOperation = 'overlay'
    ctx.drawImage(heroSpriteSheet, (Math.ceil(heroSprite.frame || 0) % 16) * 132, 0, 132, 108, 0, 0, 132, 108);
    
    // Draw the sprite we are testing for collision
    collidingSpriteSheet.src = `./${sprite.type}-${sprite.state}.png`
    ctx.drawImage(collidingSpriteSheet, 
      (Math.ceil(sprite.frame || 0)) * sprite.width, 
      0, 
      sprite.width, 
      sprite.height, 
      sprite.x - heroSprite.x, 
      sprite.y - heroSprite.y, 
      sprite.width, 
      sprite.height);

    // Count the total # of pixels overlapping
    const imageData = ctx.getImageData(0, 0, 132, 108)
    const pixels = imageData.data
    let total = 0
    for (let i = 0; i < pixels.length; i += 4) {
      const hasColor = pixels[i] > 160 || pixels[i + 1] > 160 || pixels[i + 2] > 160;
      if ( pixels[i + 3] > 160 && pixels[i + 3] < 255 && hasColor ) {
        total += 1
      }
    }

    // Clean things up for next time
    ctx.filter = 'none'
    ctx.globalAlpha = 100
    collidingSpriteSheet.src = ''

    // Render the snapshot to the debug canvas
    if ( options.debug && total > maxPixelsAllowed ) {
      const debugContext: CanvasRenderingContext2D | null = snapshotCanvas.getContext('2d')
      if ( debugContext ) {
        debugContext.clearRect(0, 0, 132, 108)
        debugContext.drawImage(canvas, 0, 0, 132, 108, 0, 0, 132, 108)
      }
    }

    return total > maxPixelsAllowed
  })

  // Return the list of colliding sprites
  return confirmedCollisions
}