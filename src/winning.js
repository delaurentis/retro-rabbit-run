/*
 * Determines if the last move resulted in a win for either player
 * board: is an array representing the board
 * lastMove: is the boardIndex of the last (most recent) move
 *  these are the boardIndexes:
 *
 *   0 | 1 | 2
 *  ---+---+---
 *   3 | 4 | 5
 *  ---+---+---
 *   6 | 7 | 8
 * 
 * returns true if there was a win
 */
var winLines = [
    [[1, 2], [4, 8], [3, 6]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[4, 5], [0, 6]],
    [[3, 5], [0, 8], [2, 6], [1, 7]],
    [[3, 4], [2, 8]],
    [[7, 8], [2, 4], [0, 3]],
    [[6, 8], [1, 4]],
    [[6, 7], [0, 4], [2, 5]]
];

function getWinningLine(board, lastMove) {
  var player = board[lastMove];
  for (var i = 0; i < winLines[lastMove].length; i++) {
      var line = winLines[lastMove][i];
      if(player === board[line[0]] && player === board[line[1]]) {
          return [...line, lastMove];
      }
  }
  return false;
}

export { getWinningLine }