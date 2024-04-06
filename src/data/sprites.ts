import { SpriteLibrary } from './types'

export const sprites: SpriteLibrary = {
  dot: { image: 'dot', state: 'idle', width: 24, height: 16, y: 360, opacity: 0.35, edible: true },
  dash: { image: 'dash', state: 'idle', width: 24, height: 16, y: 360, opacity: 0.35, edible: true },
  carrot: { image: 'carrot', state: 'idle', width: 40, height: 38, nutrition: 0.25, edible: true, 
            dance: { steps: [{ x: 0, y: -30, ticks: 30 }, { x: 0, y: 30, ticks: 30 }] } },

  rock40x52: { image: 'rock40x52', state: 'idle', width: 40, height: 52, yFromGround: 0, nutrition: -1 },
  rock51x51: { image: 'rock51x51', state: 'idle', width: 51, height: 51, yFromGround: 0, nutrition: -1 },
  rock57x54: { image: 'rock57x54', state: 'idle', width: 57, height: 54, yFromGround: 0, nutrition: -1 },
  rock77x57: { image: 'rock77x57', state: 'idle', width: 77, height: 57, yFromGround: 0, nutrition: -1 },
  rock172x58: { image: 'rock172x58', state: 'idle', width: 172, height: 58, yFromGround: 0, nutrition: -1 },
  rock177x88: { image: 'rock177x88', state: 'idle', width: 177, height: 88, yFromGround: 6, nutrition: -1 },
  rock230x134: { image: 'rock230x134', state: 'idle', width: 230, height: 134, yFromGround: 6, nutrition: -1 },
  grave: { image: 'grave', state: 'idle', width: 117, height: 141, yFromGround: 4, actionToTrigger: 'restart' },
  trophy: { image: 'trophy', state: 'idle', width: 74, height: 79, yFromGround: -10, actionToTrigger: 'restart',
            dance: { steps: [{ x: 0, y: -30, ticks: 30 }, { x: 0, y: 30, ticks: 30 }] } },
}