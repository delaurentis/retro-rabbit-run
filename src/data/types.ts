// All the info needed to render a sprite
// Used by our display and collision detection systems
export type Sprite = {
  type: string
  image?: string
  x: number
  y: number
  z?: number
  width: number
  height: number
  frame: number 
  state?: string
  stateTicks?: number
  eaten?: boolean
  edible?: boolean
  nutrition?: number
  color?: string
  opacity?: number
  injured?: boolean
  injuredTicks?: number
  dance?: SpriteDance
  text?: string
  fontSize?: number
  actionToTrigger?: string
}

// Define a single step in the dance of a sprite
export type SpriteStep = {
  x: number
  y: number
  ticks: number
}

// Sprites can move along some path automatically (like the bouncing carrots)
export type SpriteDance = {
  steps: SpriteStep[]
  stepIndex?: number
  stepTicks?: number
  danceTicks?: number
}

// Used to pre-define some info about all sprites of this type 
export type SpriteDef = {
  image?: string
  width: number
  height: number
  x?: number
  y?: number
  z?: number
  yFromGround?: number
  state?: string
  edible?: boolean
  nutrition?: number
  color?: string
  opacity?: number
  dance?: SpriteDance
  actionToTrigger?: string
}

// Our library of sprites
export type SpriteLibrary = {
  [key: string]: SpriteDef
}

// Used to reference a sprite definition, and add instance specific info
// Together the data gets combined into Sprite
export type SpriteRef = {
  type: string
  x?: number
  y?: number
  z?: number
  yFromGround?: number
  opacity?: number
  frame?: number 
  state?: string
  actionToTrigger?: string
}

export type Story = {
  currentCharacter?: string
  characterIndex?: number
  lineIndex?: number
  lines: string[]
  morse?: string[]
}

// Represents the hero of our game
// Who can move, collect points, and lose hearts
export type Hero = {
  sprite: Sprite
  points: number
  hearts: number 
  baseY: number
  framesPerTick: number
  jumpType: string
}

// A set of sprites added together at the same time to the game
// representing a playable sequence
export type Tile = {
  odds?: number
  width: number
  sprites: SpriteRef[]
  x?: number // only when in use
}

// A set of tiles that can be chosen from for a specific morse code character
export type TileSet = {
  choices: Tile[]
}

// Our library of tiles for all morse code characters
export type TileLibrary = {
  '.': TileSet
  '-': TileSet
  ' ': TileSet
  '💀': TileSet
  '🏆': TileSet
}

// Constants for realistic jumping
export type Jump = {
  frameCount: number
  framesPerTick: number
  xCurve: number[]
  yCurve: number[]
  xScale: number
  yScale: number
}

// Our library of available jumps
export type JumpLibrary = {
  [key: string]: Jump
}

// Current state of the whole game
export type GameState = {
  story: Story
  hero: Hero
  sprites: Sprite[]
}

