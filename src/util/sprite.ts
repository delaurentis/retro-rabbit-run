import { Sprite, SpriteDance, SpriteStep } from '../data/types'

// Move a sprite along a path, if it has one
export const danceSprite = (sprite: Sprite): void => {
  if ( sprite.dance ) {

    // Advance in the dance
    sprite.dance.stepIndex = (sprite.dance.stepIndex || 0)
    sprite.dance.stepTicks = (sprite.dance.stepTicks || 0) + 1
    sprite.dance.danceTicks = (sprite.dance.danceTicks || 0) + 1

    // Get the current step of the dance
    const currentStep: SpriteStep = sprite.dance.steps[sprite.dance.stepIndex]

    // If we cross to the end of the step, go forward to the next step
    if ( sprite.dance.stepTicks >= currentStep.ticks ) {
      sprite.dance.stepIndex += 1
      sprite.dance.stepTicks = 0
    }

    // If we cross to the end of the dance, start the dance over
    if ( sprite.dance.stepIndex >= sprite.dance.steps.length ) {
      sprite.dance.stepIndex = 0
      sprite.dance.stepTicks = 0
      sprite.dance.danceTicks = 0
    }

    // Calculate movement needed per tick for this step
    const xOffsetPerTick = currentStep.x / currentStep.ticks
    const yOffsetPerTick = currentStep.y / currentStep.ticks

    // Move the sprite
    sprite.x += xOffsetPerTick
    sprite.y += yOffsetPerTick
  }
}