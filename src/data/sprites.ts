import { SpriteLibrary } from './types'

export const sprites: SpriteLibrary = {
  dot: { state: 'idle', width: 24, height: 16, y: 360, opacity: 0.35, edible: true },
  dash: { state: 'idle', width: 24, height: 16, y: 360, opacity: 0.35, edible: true },
  carrot: { state: 'idle', width: 40, height: 38, nutrition: 0.25, edible: true, 
            dance: { steps: [{ x: 0, y: -30, ticks: 30 }, { x: 0, y: 30, ticks: 30 }] } },

  rock40x52: { state: 'idle', width: 40, height: 52, yFromGround: 0, nutrition: -1 },
  rock51x51: { state: 'idle', width: 51, height: 51, yFromGround: 0, nutrition: -1 },
  rock57x54: { state: 'idle', width: 57, height: 54, yFromGround: 0, nutrition: -1 },
  rock77x57: { state: 'idle', width: 77, height: 57, yFromGround: 0, nutrition: -1 },
  rock172x58: { state: 'idle', width: 172, height: 58, yFromGround: 0, nutrition: -1 },
  rock177x88: { state: 'idle', width: 177, height: 88, yFromGround: 6, nutrition: -1 },
  rock230x134: { state: 'idle', width: 230, height: 134, yFromGround: 6, nutrition: -1 },
  grave: { state: 'idle', width: 117, height: 141, yFromGround: 4, actionToTrigger: 'restart' },
}
