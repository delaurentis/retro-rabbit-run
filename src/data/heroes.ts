import { Hero } from './types'
import { generalConstants } from './constants'

export const rabbit: Hero = {
  sprite: {
    type: 'hero',
    frame: 0,
    color: 'clear', 
    state: 'running',
    stateTicks: 0,
    x: 30, 
    y: 220, 
    z: 1, 
    width: 132, 
    height: 108 
  },  
  hearts: 3,
  points: 0,
  jumpType: 'small',
  framesPerTick: generalConstants.framesPerTick,
  baseY: 220,
}

