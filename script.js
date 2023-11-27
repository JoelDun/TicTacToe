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
        // Switch player for the next turn
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
const gameController = GameController(player1, player2);

function createGameBoard() {
  const gameBoard = document.getElementById('game-board');

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

  if (!clickedCell.textContent) {
    clickedCell.textContent = gameController.getActivePlayer().marker;

    if (checkForWinner()) {
      console.log(`${gameController.getActivePlayer().name} wins!`);
    } else if (checkForTie()) {
      console.log("It's a tie!");
    } else {
      gameController.playTurn(parseInt(clickedCell.dataset.row), parseInt(clickedCell.dataset.col));
    }
  } else {
    console.log("Invalid move. Cell already occupied.");
  }
}

function checkForWinner() {
  const board = gameController.getBoard();
  const activePlayer = gameController.getActivePlayer();
  
  for (let i = 0; i < board.length; i++) {
    if (checkRow(i, activePlayer.marker) || checkColumn(i, activePlayer.marker)) {
      return true;
    }
  }
  return checkDiagonal(activePlayer.marker);
}

function checkRow(row, marker) {
  const board = gameController.getBoard();
  const firstCell = board[row][0];
  if (firstCell === null) {
    return false;
  }
  return board[row].every(cell => cell === marker);
}

function checkColumn(col, marker) {
  const board = gameController.getBoard();
  const firstCell = board[0][col];
  if (firstCell === null) {
    return false;
  }
  for (let i = 1; i < board.length; i++) {
    if (board[i][col] !== marker) {
      return false;
    }
  }
  return true;
}

function checkDiagonal(marker) {
  const board = gameController.getBoard();
  const mainDiagonal = [board[0][0], board[1][1], board[2][2]];
  if (mainDiagonal.every(cell => cell === marker)) {
    return true;
  }

  const antiDiagonal = [board[0][2], board[1][1], board[2][0]];
  return antiDiagonal.every(cell => cell === marker);
}


function checkForTie() {
  const board = gameController.getBoard();
  return board.every(row => row.every(cell => cell !== null));
}

document.addEventListener('DOMContentLoaded', function () {
  createGameBoard();
});
