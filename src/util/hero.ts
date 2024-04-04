import { Hero, Sprite } from '../data/types'
import { jumps } from '../data/jumps'
import { generalConstants } from '../data/constants'

export const createHero = (hero: Hero): Hero => {
  return { ...hero }
}

export const advanceHero = (hero: Hero): void => {

  // We always advance the state of the hero
  hero.sprite.stateTicks = (hero.sprite.stateTicks || 0) + 1

  // Always advance our current animation
  hero.sprite.frame += hero.framesPerTick

  // Always run forward
  hero.sprite.x += generalConstants.speedInPixelsPerTick

  // Handle invicibility 
  hero.sprite.injuredTicks = (hero.sprite.injuredTicks || 0)
  if ( hero.sprite.injuredTicks > 0 ) {
    hero.sprite.injuredTicks -= 1
    hero.sprite.injured = true
  }
  else {
    hero.sprite.injured = false
  }
}

// Handle healing hero from collision with a helpful sprite
export const healHero = (hero: Hero, sprite: Sprite): void => {
  hero.hearts += sprite.nutrition || 0
}

// Handle inury to hero from collision with a harmful sprite
export const injureHero = (hero: Hero, sprite: Sprite): boolean => {
  // If already injured, don't injure again
  if ( hero.sprite.injured ) {
    return false
  }
  else {
    hero.sprite.injured = true
    hero.sprite.injuredTicks = 150
    hero.hearts = Math.max(hero.hearts + (sprite.nutrition || 0), 0)
    return true
  }
}

// Request that the hero jumps.  They might not if they are already jumping.
export const askHeroToJump = (hero: Hero): boolean => {

  if ( hero.sprite.state === 'running' ) {
    hero.sprite.state = 'jumping'
    hero.sprite.stateTicks = 0
    hero.sprite.frame = 0

    hero.jumpType = 'small'
    hero.framesPerTick = jumps[hero.jumpType].framesPerTick
    hero.points += 1
    return true
  } 
  else if ( hero.sprite.state === 'jumping' ) {
  
    // Allow them to shortcut the end of the jumping if they press again at the end
    if ( hero.sprite.frame >= 17 ) {
      hero.sprite.state = 'jumping'
      hero.sprite.stateTicks = 0
      hero.sprite.frame = 0

      hero.jumpType = 'small'
      hero.framesPerTick = jumps[hero.jumpType].framesPerTick
      return true
    }
  }
  return false
  
}

// Continue processing any jump
export const jumpHeroAndDetectDash = (hero: Hero, jumpButtonPressed: boolean): boolean => {

  // If they are jumping then change the Y
  if ( hero.sprite.state === 'jumping' ) {

    // Figure out which constants to use based on jump type
    const constantsToUse = jumps[hero.jumpType]
    if ( hero.sprite.frame <= constantsToUse.frameCount ) {

      // Adjust frame rate based on the current jump type
      hero.framesPerTick = jumps[hero.jumpType].framesPerTick

      // Our X and Y value will change based on a pre-computed curve
      hero.sprite.y = hero.baseY - (constantsToUse.yScale * constantsToUse.yCurve[Math.ceil(hero.sprite.frame)])
      hero.sprite.x += (constantsToUse.xScale * constantsToUse.xCurve[Math.ceil(hero.sprite.frame)])

      // See if the jump "button" is still pressed (whatever keys that maps to)
      if ( jumpButtonPressed ) {
        if ( hero.sprite.frame >= 5 && hero.sprite.frame <= 10 ) {
          if ( hero.jumpType !== 'large' ) {
            hero.jumpType = 'large'
            return true
          }
        }
      }
    }
    else {
      hero.sprite.state = 'running'
      hero.sprite.stateTicks = 0
      hero.sprite.frame = 0
      hero.sprite.y = hero.baseY
      hero.framesPerTick = generalConstants.framesPerTick
    }
  }
  return false
}

// Check if the hero is currently jumping, and doing the specified size of jump
export const isHeroJumping = (hero: Hero, jumpType: string): boolean => {
  return hero.sprite.state === 'jumping' && hero.jumpType === jumpType
}

// If the hero got injured, we make them invincible for a while
// This method will eventually turn that off
export const manageHeroInvincibility = (hero: Hero): void => {
  // Handle invicibility 
  hero.sprite.injuredTicks = (hero.sprite.injuredTicks || 0)
  if ( hero.sprite.injuredTicks > 0 ) {
    hero.sprite.injuredTicks -= 1
    hero.sprite.injured = true
  }
  else {
    hero.sprite.injured = false
  }
}  