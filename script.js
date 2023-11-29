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

    // Check for a winner after placing the current player's marker
    if (checkForWinner()) {
      console.log(`${gameController.getActivePlayer().name} wins!`);
    } else if (checkForTie()) {
      console.log("It's a tie!");
    } else {
      gameController.playTurn(parseInt(clickedCell.dataset.row), parseInt(clickedCell.dataset.col));

      // Switch to the next player
      const nextPlayer = gameController.getActivePlayer();

      // Check for a winner after switching to the next player
      if (checkForWinner()) {
        console.log(`${nextPlayer.name} wins!`);
      } else if (checkForTie()) {
        console.log("It's a tie!");
      }
    }
  } else {
    console.log("Invalid move. Cell already occupied.");
  }
}



function checkForWinner(marker) {
  const board = gameController.getBoard();

  // Check rows
  for (let i = 0; i < board.length; i++) {
    if (checkRow(i, marker)) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < board.length; i++) {
    if (checkColumn(i, marker)) {
      return true;
    }
  }

  // Check diagonals
  return checkDiagonal(marker);
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

 // Get the restart button element
 const restartButton = document.getElementById('restart-button');
 // Add a click event listener to the restart button
 restartButton.addEventListener('click', function () {
  // Call a function to restart the game
  restartGame();
});
});


function restartGame() {
  // Clear the game board by removing text content from each cell
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
  });

  // Reset the internal game state (clear the board)
  const board = gameController.getBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = null;
    }
  }

  // Switch back to the initial active player
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  gameController.getActivePlayer() === player1 ? (activePlayer = player1) : (activePlayer = player2);

  // Optional: Display a message indicating the game has been restarted
  console.log("Game restarted!");
}

