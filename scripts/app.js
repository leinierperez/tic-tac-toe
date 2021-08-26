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

const gameHandler = (function () {
  let playerOne; // Player1 is always X
  let playerTwo; // Player2 is always O
  let currentPlayer;

  const form = document.querySelector('form');
  const boardCells = document.querySelector('.board-cells');
  const player1Input = document.querySelector('#player1-name');
  const player2Input = document.querySelector('#player2-name');
  const submitBtn = document.querySelector('.submit-btn');
  const startBtn = document.querySelector('.start-btn');
  const cells = document.querySelectorAll('.cell');
  const restartBtn = document.querySelector('#restart-btn');
  const newGameBtn = document.querySelector('#newgame-btn');

  const init = () => {
    submitBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);
    newGameBtn.addEventListener('click', newGame);
    startBtn.addEventListener(
      'click',
      displayController.showPlayerNameSelectionScreen
    );
  };

  const startGame = (event) => {
    event.preventDefault();
    if (player1Input.value && player2Input.value) {
      form.style.cssText = 'display:none';
      boardCells.style.cssText = 'display:grid';
    }
    playerOne = player(player1Input.value, 'X');
    playerTwo = player(player2Input.value, 'O');
    makeMove();
  };

  const makeMove = () => {
    const board = gameBoard.getBoard();
    currentPlayer = 'X';

    cells.forEach((c) => {
      c.addEventListener('click', (event) => {
        if (event.target.querySelector('span') === null) return;

        const span = event.target.querySelector('span');
        const dataKey = span.dataset.key;

        if (!span.innerHTML) {
          if (
            board[dataKey[0]][dataKey[2]] === 'X' ||
            board[dataKey[0]][dataKey[2]] === 'O'
          ) {
            currentPlayer = board[dataKey[0]][dataKey[2]];
          }
          board[dataKey[0]][dataKey[2]] = currentPlayer;
          span.innerHTML = currentPlayer;
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

          const winner = checkWinner(playerOne.getPlayerSymbol())
            ? playerOne.getPlayerName()
            : checkWinner(playerTwo.getPlayerSymbol())
            ? playerTwo.getPlayerName()
            : null;
          displayController.displayWinner(winner);
        }
      });
    });
  };

  const restartGame = () => {
    gameBoard.resetBoard();
    currentPlayer = 'X';
    displayController.hideWinnerMessageScreen();
    displayController.render();
  };

  const newGame = () => {
    gameBoard.resetBoard();
    displayController.hideWinnerMessageScreen();
    displayController.showPlayerNameSelectionScreen();
    displayController.hideBoard();
    displayController.render();
  };

  const checkWinner = (currentPlayer) => {
    const board = gameBoard.getBoard();

    const winningCombos = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ];

    return winningCombos.some((combination) => {
      return combination.every(([x, y]) => {
        return board[x][y] === currentPlayer;
      });
    });
  };

  return { init };
})();

gameHandler.init();