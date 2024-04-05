import { TileLibrary } from './types'

export const tiles: TileLibrary = {
    '.': {
        choices: [
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 100, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 240, x: 180 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 80, x: 100 },
                                                              { type: 'carrot', y: 240, x: 220 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 200, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 160, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, { type: 'carrot', y: 120, x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, 
                                             { type: 'carrot', y: 200, x: 100 },
                                             { type: 'carrot', y: 120, x: 180 }] },
            { odds: 5, width: 280, sprites: [{ type: 'dot' }, { type: 'rock40x52', x: 100 }] },
            { odds: 5, width: 280, sprites: [{ type: 'dot' }, { type: 'rock51x51', x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, 
                                             { type: 'rock40x52', x: 100 }, 
                                             { type: 'carrot', y: 200, x: 200 }] },
            { odds: 5, width: 280, sprites: [{ type: 'dot' }, { type: 'rock57x54', x: 100 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, 
                                             { type: 'rock57x54', x: 100 },
                                             { type: 'carrot', x: 120, y: 100 }] },
            { odds: 2, width: 280, sprites: [{ type: 'dot' }, { type: 'rock77x57', x: 80 }] },
            { odds: 1, width: 280, sprites: [{ type: 'dot' }, 
                                             { type: 'rock77x57', x: 80 },
                                             { type: 'carrot', x: 220, y: 220 }] },
        ]
    },
    '-': {
        choices: [
            { odds: 4, width: 516, sprites: [{ type: 'dash' }, { type: 'rock172x58', x: 100 }] },
            { odds: 4, width: 516, sprites: [{ type: 'dash' }, { type: 'rock177x88', x: 100 }] },
            { odds: 4, width: 516, sprites: [{ type: 'dash' }, { type: 'rock230x134', x: 100 }] },
            { odds: 2, width: 516, sprites: [{ type: 'dash' }, 
                                             { type: 'rock172x58', x: 100 },
                                             { type: 'carrot', x: 180, y: 120 }] },
            { odds: 2, width: 516, sprites: [{ type: 'dash' }, 
                                             { type: 'rock177x88', x: 100 },
                                             { type: 'carrot', x: 180, y: 120 }] },
            { odds: 2, width: 516, sprites: [{ type: 'dash' }, 
                                             { type: 'rock230x134', x: 100 },
                                             { type: 'carrot', x: 180, y: 120 }] },
            { odds: 1, width: 516, sprites: [{ type: 'dash' }, 
                                             { type: 'rock230x134', x: 100 },
                                             { type: 'carrot', x: 200, y: 140 },
                                             { type: 'carrot', x: 50, y: 220 }] },

        ]
    },
    ' ': {
        choices: [
/*           { odds: 2, width: 300, sprites: [] },*/
            { odds: 2, width: 300, sprites: [{ type: 'carrot', y: 280 }] },
            { odds: 1, width: 300, sprites: [{ type: 'carrot', y: 280 }, 
                                             { type: 'carrot', y: 260, x: 170 }] },
        ]
    },
    '💀': {
        choices: [
            { odds: 1, width: 800, sprites: [{ type: 'grave', x: 400 }] },
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