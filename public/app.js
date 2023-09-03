const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute("data-cell"));

  if (gameBoard[cellIndex] === "" && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.backgroundColor = currentPlayer === "X" ? "lightcoral" : "lightblue";
    togglePlayer();
    checkWinner();
  }
}
function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
  
  function checkWinner() {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        gameActive = false;
        message.textContent = `${currentPlayer} wins!`;
        cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[
          c
        ].style.backgroundColor = "gold";
        return;
      }
    }
  
    if (!gameBoard.includes("") && gameActive) {
      gameActive = false;
      message.textContent = "It's a draw!";
    }
  }
  function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "";
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.style.backgroundColor = "lightgray";
    });
  }
  
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
  
  restartButton.addEventListener("click", restartGame);  
