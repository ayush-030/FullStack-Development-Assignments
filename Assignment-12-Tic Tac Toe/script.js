const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = "X";
let boardState = Array(9).fill(null);
let gameActive = true;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8],   
  [0,4,8], [2,4,6]             
];

function handleCellClick(e) {
  const idx = parseInt(e.target.getAttribute('data-index'));
  if (!gameActive || boardState[idx]) return;

  boardState[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (boardState.every(cell => cell)) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  const winningCombo = winCombos.find(combo => 
    combo.every(idx => boardState[idx] === player)
  );
  if (winningCombo) {
    winningCombo.forEach(idx => cells[idx].classList.add('winner'));
    return true;
  }
  return false;
}

function restartGame() {
  boardState = Array(9).fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('winner');
  });
  currentPlayer = "X";
  gameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
statusDiv.textContent = `Player ${currentPlayer}'s turn`;
