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
    // Add more methods as needed
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
  // Add logic to check for a winner
  // Return true if there is a winner, false otherwise
  // You'll need to check rows, columns, and diagonals
  // Example:
  // if (checkRow(0) || checkRow(1) || checkRow(2) ||
  //     checkColumn(0) || checkColumn(1) || checkColumn(2) ||
  //     checkDiagonal()) {
  //   return true;
  // }
  // return false;
}

function checkRow(row) {
  // Implement logic to check if the specified row has a winner
  // Return true if there is a winner, false otherwise
}

function checkColumn(col) {
  // Implement logic to check if the specified column has a winner
  // Return true if there is a winner, false otherwise
}

function checkDiagonal() {
  // Implement logic to check if any diagonal has a winner
  // Return true if there is a winner, false otherwise
}

function checkForTie() {
  // Implement logic to check for a tie
  // Return true if the game is a tie, false otherwise
}

document.addEventListener('DOMContentLoaded', function () {
  // Your existing code

  // Call the createGameBoard function to generate cells
  createGameBoard();
});
