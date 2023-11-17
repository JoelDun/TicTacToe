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
