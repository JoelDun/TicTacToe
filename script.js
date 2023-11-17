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

// Test the Gameboard
const gameboard = Gameboard();
console.log(gameboard.getBoard()); // Should log the initial empty game board



function Player(name, marker) {
  return {
    name,
    marker,
  };
}

// Test the Player
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");
console.log(player1, player2); // Should log the player objects




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
const gameController = GameController(player1, player2);
gameController.playTurn(0, 3);
console.log(gameController.getBoard()); // Should log the updated game board
console.log(gameController.getActivePlayer()); // Should log the second player


