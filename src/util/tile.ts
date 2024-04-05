import { tiles } from '../data/tiles'
import { sprites as spriteLibrary } from '../data/sprites'
import { Tile, Sprite, SpriteDef, SpriteRef, SpriteDance } from '../data/types'

// Take a list of tiles and expand them based on their odds
const expandTileChoices = (tileChoices: Tile[]): Tile[] =>
  tileChoices.flatMap(tile => Array(tile.odds).fill(tile));

// Generate a tile based on a character 
export const generateTileForCharacter = (character: string, x: number): Tile => {

  // Make a tile for the given character
  const characterToDisplay = character === ' ' ? 'space' : character
  const letterTile = { x: x, width: 200, sprites: [{ type: 'letter', text: characterToDisplay, opacity: 0.35, y: 340, x: x + 160, width: 40, height: 40 }] }
  return letterTile
}

// Generate the next tile we need based on a morse code character
export const generateTileForMorse = (morse: string, x: number): Tile => {
    
  // Expand the tile choices for the morse code character based on odds
  // Some are much more common than others
  const tileChoices: Tile[] = tiles[morse].choices
  const expandedTileChoices: Tile[] = expandTileChoices(tileChoices)

  // Randomly pick one now
  const tileRoll = Math.floor(Math.random() * expandedTileChoices.length)
  const randomTile = expandedTileChoices[tileRoll]

  // Make a list of sprites
  const newSprites: Sprite[] = randomTile.sprites.map((spriteRef: SpriteRef) => {
    const spriteDef: SpriteDef = spriteLibrary[spriteRef.type]
    const yFromGround = spriteDef.yFromGround || spriteDef.yFromGround 
    const dance = spriteDef.dance ? { ...spriteDef.dance } : undefined
    return { y: yFromGround !== undefined ? (328 - spriteDef.height) + yFromGround : undefined,
             ...spriteDef, 
             ...spriteRef, 
             x: x + (spriteRef.x || spriteDef.x || 0), 
             dance } as Sprite
  })

  // Make a clone of the tile now
  const newTile = { sprites: newSprites, x, width: randomTile.width }
  return newTile
}