function Gameboard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  return {
    getBoard: () => board,
    // Add more methods as needed
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

// Test the GameController
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");
const gameController = GameController(player1, player2);

// Function to create the game board
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

  // Check if the cell is empty
  if (!clickedCell.textContent) {
    // Update the cell with the current player's marker
    clickedCell.textContent = gameController.getActivePlayer().marker;

    // Check for a winner or tie
    if (checkForWinner() || checkForTie()) {
      // Handle game over logic, e.g., show a message
      console.log("Game Over!");
    } else {
      // Switch to the next player
      gameController.playTurn(parseInt(clickedCell.dataset.row), parseInt(clickedCell.dataset.col));
    }
  } else {
    console.log("Invalid move. Cell already occupied.");
  }
}

function checkForWinner() {
  const board = gameController.getBoard();
  for (let i = 0; i < board.length; i++) {
    if (checkRow(i) || checkColumn(i)) {
      return true;
    }
  }
  return checkDiagonal();
}


function checkRow(row) {
  const board = gameController.getBoard();
  const firstCell = board[row][0];
  if (firstCell === null) {
    return false;
  }
  return board[row].every(cell => cell === firstCell);
}


function checkColumn(col) {
  const board = gameController.getBoard();
  const firstCell = board[0][col];
  if (firstCell === null) {
    return false;
  }
  for (let i = 1; i < board.length; i++) {
    if (board[i][col] !== firstCell) {
      return false;
    }
  }
  return true;
}

function checkDiagonal() {
  const board = gameController.getBoard();

  // Main diagonal
  const mainDiagonal = [board[0][0], board[1][1], board[2][2]];
  if (mainDiagonal.every(cell => cell === mainDiagonal[0] && cell !== null)) {
    return true;
  }

  // Anti-diagonal
  const antiDiagonal = [board[0][2], board[1][1], board[2][0]];
  return antiDiagonal.every(cell => cell === antiDiagonal[0] && cell !== null);
}

function checkForTie() {
  const board = gameController.getBoard();

  // Check if every cell in the board is filled (not null)
  return board.every(row => row.every(cell => cell !== null));
}


document.addEventListener('DOMContentLoaded', function () {
  // Your existing code

  // Call the createGameBoard function to generate cells
  createGameBoard();
});
