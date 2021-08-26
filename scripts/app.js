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

const displayController = (function displayController() {
  const startBtn = document.querySelector('.start-btn');
  const form = document.querySelector('form');
  const player1Input = document.querySelector('#player1-name');
  const player2Input = document.querySelector('#player2-name');
  const winnerMenu = document.querySelector('.winner-menu');
  const winnerName = document.querySelector('.title3');
  const boardCells = document.querySelector('.board-cells');

  const render = () => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let span = document.querySelector(`span[data-key="${i},${j}"]`);
        span.innerHTML = board[i][j];
      }
    }
  };

  const showPlayerNameSelectionScreen = () => {
    startBtn.style.cssText = 'display:none;';
    form.style.cssText = 'display:block';
    player1Input.value = '';
    player2Input.value = '';
  };

  const displayWinner = (winner) => {
    if (winner) {
      winnerMenu.style.cssText = 'display:flex';
      winnerName.innerHTML = `${winner} Win's`;
    }
    if (!winner && !gameBoard.isTurnLeft()) {
      winnerMenu.style.cssText = 'display:flex';
      winnerName.innerHTML = "It's a tie!";
    }
  };

  const hideWinnerMessageScreen = () => {
    winnerMenu.style.cssText = 'display:none;';
  };

  const hideBoard = () => {
    boardCells.style.cssText = 'display:none';
  };

  return {
    showPlayerNameSelectionScreen,
    displayWinner,
    render,
    hideWinnerMessageScreen,
    hideBoard,
  };
})();