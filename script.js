function Gameboard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  return {
    getBoard: () => board,
  };
}

function Player(name, marker) {
  return {
    name,
    marker,
  };
}

function GameController(player1, player2) {
  const board = Gameboard();
  let activePlayer = player1;

  return {
    playTurn: (row, col) => {
      if (board.getBoard()[row][col] === null) {
        board.getBoard()[row][col] = activePlayer.marker;
        activePlayer = activePlayer === player1 ? player2 : player1;
      } else {
        console.log("Invalid move. Cell already occupied.");
      }
    },
    getActivePlayer: () => activePlayer,
    getBoard: () => board.getBoard(),
  };
}

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");
let gameController = GameController(player1, player2);

function createGameBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = createCell(row, col);
      gameBoard.appendChild(cell);
    }
  }
}

function createCell(row, col) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.addEventListener('click', handleCellClick);
  return cell;
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const row = parseInt(clickedCell.dataset.row);
  const col = parseInt(clickedCell.dataset.col);

  if (!clickedCell.textContent) {
    gameController.playTurn(row, col);
    clickedCell.textContent = gameController.getActivePlayer().marker;

    if (checkForWinner(gameController.getActivePlayer().marker)) {
      console.log(`${gameController.getActivePlayer().name} wins!`);
    } else if (checkForTie()) {
      console.log("It's a tie!");
    }
  } else {
    console.log("Invalid move. Cell already occupied.");
  }
}

function checkForWinner(marker) {
  const board = gameController.getBoard();
  return checkRowsForWinner(board, marker) || 
         checkColumnsForWinner(board, marker) || 
         checkDiagonalsForWinner(board, marker);
}

function checkRowsForWinner(board, marker) {
  return board.some(row => row.every(cell => cell === marker));
}

function checkColumnsForWinner(board, marker) {
  for (let col = 0; col < board.length; col++) {
    if (board.every(row => row[col] === marker)) {
      return true;
    }
  }
  return false;
}

function checkDiagonalsForWinner(board, marker) {
  const mainDiagonal = board.every((row, idx) => row[idx] === marker);
  const antiDiagonal = board.every((row, idx) => row[board.length - 1 - idx] === marker);
  return mainDiagonal || antiDiagonal;
}

function checkForTie() {
  const board = gameController.getBoard();
  return board.every(row => row.every(cell => cell !== null));
}

function restartGame() {
  createGameBoard();
  gameController = GameController(player1, player2);
  console.log("Game restarted!");
}

document.addEventListener('DOMContentLoaded', function () {
  createGameBoard();

  const restartButton = document.getElementById('restart-button');
  restartButton.addEventListener('click', restartGame);
});
