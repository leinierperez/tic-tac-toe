function player(playerName, playerSymbol) {
  const getPlayerName = () => playerName;
  const getPlayerSymbol = () => playerSymbol;

  return { getPlayerName, getPlayerSymbol };
}

const gameBoard = (function () {
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const getBoard = () => board;

  const isTurnLeft = () => {
    return board.some(([a, b, c]) => {
      if (a === '' || b === '' || c === '') return true;
      return false;
    });
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = '';
      }
    }
  };

  return { getBoard, isTurnLeft, resetBoard };
})();