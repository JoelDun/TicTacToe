
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
  const board = Gameboard()
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


// Add this to the GameController section
function consoleGameLoop() {
  while (true) {
    console.log(gameController.getBoard()); // Display the current game board
    console.log(`${gameController.getActivePlayer().name}'s turn.`);

    const row = prompt("Enter the row (0-2):");
    const col = prompt("Enter the column (0-2):");

    gameController.playTurn(parseInt(row), parseInt(col));
  }
    // Uncomment the following line to start the console game loop
consoleGameLoop();
}

// Define a simple prompt function using window.prompt
function prompt(message) {
  return new Promise((resolve) => {
    const result = window.prompt(message);
    resolve(result);
  });
}
