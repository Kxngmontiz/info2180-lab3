// Function to initialize the game board and set up event listeners
function setupBoard() {
    const squares = document.querySelectorAll("#board > div");
  
    // Add classes and event listeners to each square
    squares.forEach((square, index) => {
      square.classList.add("square");
      square.dataset.row = Math.floor(index / 3);
      square.dataset.col = index % 3;
  
      // Add hover effects
      square.addEventListener("mouseover", () => square.classList.add("hover"));
      square.addEventListener("mouseleave", () => square.classList.remove("hover"));
    });
  }
  
  // Function to check if there is a winner
  function checkWin(grid) {
    const winningCombos = [
      // Rows
      [ [0, 0], [0, 1], [0, 2] ],
      [ [1, 0], [1, 1], [1, 2] ],
      [ [2, 0], [2, 1], [2, 2] ],
      // Columns
      [ [0, 0], [1, 0], [2, 0] ],
      [ [0, 1], [1, 1], [2, 1] ],
      [ [0, 2], [1, 2], [2, 2] ],
      // Diagonals
      [ [0, 0], [1, 1], [2, 2] ],
      [ [0, 2], [1, 1], [2, 0] ]
    ];
  
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (grid[a[0]][a[1]] && grid[a[0]][a[1]] === grid[b[0]][b[1]] && grid[a[0]][a[1]] === grid[c[0]][c[1]]) {
        return grid[a[0]][a[1]];
      }
    }
  
    return null;
  }
  
  // Function to update the status message if there's a winner
  function updateStatus(winner) {
    const status = document.getElementById("status");
    status.textContent = `Congratulations! ${winner} is the Winner!`;
    status.classList.add("you-won");
  }
  
  // Function to reset the game board and status
  function resetGame(grid) {
    const squares = document.querySelectorAll("#board > div");
    squares.forEach(square => {
      square.textContent = "";
      square.classList.remove("X", "O");
    });
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        grid[row][col] = "";
      }
    }
  
    const status = document.getElementById("status");
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
  }
  
  // Main game logic that runs when the page loads
  window.onload = () => {
    setupBoard(); // Set up the game board
  
    const grid = [
      ["", "", ""], // Row 1
      ["", "", ""], // Row 2
      ["", "", ""], // Row 3
    ];
  
    let currentPlayer = "X"; // Start with player "X"
  
    // Add click event to each square
    const squares = document.querySelectorAll("#board > div");
    squares.forEach(square => {
      square.addEventListener("click", () => {
        const row = square.dataset.row;
        const col = square.dataset.col;
  
        if (!square.textContent) {
          // Place the current player's symbol
          square.textContent = currentPlayer;
          square.classList.add(currentPlayer);
          grid[row][col] = currentPlayer;
  
          // Check for a winner
          const winner = checkWin(grid);
          if (winner) {
            updateStatus(winner);
          } else {
            // Switch players if no winner
            currentPlayer = currentPlayer === "X" ? "O" : "X";
          }
        }
      });
    });
  
    // Reset button functionality
    const resetButton = document.querySelector(".btn");
    resetButton.addEventListener("click", () => resetGame(grid));
  };
  