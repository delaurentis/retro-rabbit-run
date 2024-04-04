import { TileLibrary } from './types'

export const tiles: TileLibrary = {
    '.': {
        choices: [
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 280, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 240, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 200, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 160, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 120, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, 
                                             { type: 'carrot', y: 200, x: 100 },
                                             { type: 'carrot', y: 120, x: 180 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'rock40x52', x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'rock51x51', x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, 
                                             { type: 'rock40x52', x: 100 }, 
                                             { type: 'carrot', y: 200, x: 200 }] },
            { odds: 100, width: 280, sprites: [{ type: 'dot' }, 
                                             { type: 'rock57x54', x: 100 }] },
            { odds: 100, width: 280, sprites: [{ type: 'dot' }, { type: 'rock77x57', x: 80 }] },
        ]
    },
    '-': {
        choices: [
            { odds: 1, width: 500, sprites: [{ type: 'dash' }, { type: 'rock172x58', x: 100 }] },
            { odds: 1, width: 500, sprites: [{ type: 'dash' }, { type: 'rock177x88', x: 100 }] },
            { odds: 1, width: 500, sprites: [{ type: 'dash' }, { type: 'rock230x134', x: 100 }] },
        ]
    },
    ' ': {
        choices: [
/*            { odds: 2, width: 300, sprites: [] },*/
            { odds: 2, width: 300, sprites: [{ type: 'carrot', y: 220 }] },
            { odds: 1, width: 300, sprites: [{ type: 'carrot', y: 220 }, 
                                             { type: 'carrot', y: 240, x: 170 }] },
        ]
    }
}

/*
{ odds: 1, width: 300, sprites: [{ type: 'dot' }, { type: 'carrot', y: 280, x: 100 }] },
{ odds: 1, width: 300, sprites: [{ type: 'dot' }, { type: 'carrot', y: 240, x: 100 }] },
{ odds: 1, width: 300, sprites: [{ type: 'dot' }, { type: 'carrot', y: 200, x: 100 }] },
{ odds: 1, width: 300, sprites: [{ type: 'dot' }, { type: 'carrot', y: 160, x: 100 }] },
{ odds: 1, width: 300, sprites: [{ type: 'dot' }, { type: 'carrot', y: 120, x: 100 }] },
{ odds: 1, width: 300, sprites: [{ type: 'dot' }, 
                                 { type: 'carrot', y: 200, x: 100 },
                                 { type: 'carrot', y: 120, x: 180 }] },
{ odds: 1, width: 380, sprites: [{ type: 'dot' }, { type: 'rock40x52', x: 100 }] },
{ odds: 1, width: 380, sprites: [{ type: 'dot' }, { type: 'rock51x51', x: 100 }] },
{ odds: 1, width: 380, sprites: [{ type: 'dot' }, 
                                 { type: 'rock40x52', x: 100 }, 
                                 { type: 'carrot', y: 200, x: 200 }] },
{ odds: 1, width: 420, sprites: [{ type: 'dot' }, 
                                 { type: 'rock57x54', x: 120 }] },
{ odds: 1, width: 407, sprites: [{ type: 'dot' }, { type: 'rock77x57', x: 100 }] },*/