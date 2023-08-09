import * as lib from './lib.js';

// VARS
let boardData = lib.createBoard();
  /*let active = {
    x: [],
    y: []
  }*/
const state = {
  selfPlayed: false,
  running: false,
  score: 0,
  lines: 0,
  next: 0,
  stats: [0, 0, 0, 0, 0, 0, 0]
};
const gameOver = document.getElementById('game-over');
gameOver.style.display = 'none';

// Create Game Board
const boardDiv = document.querySelector('#board');
const table = document.createElement('table');
for (let i = 0; i < 20; i++) {
  const row = table.insertRow();
  for (let j = 0; j < 10; j++) {
    const cell = row.insertCell();
    cell.id = `${i},${j}`;    
  }  
}
boardDiv.appendChild(table);

// Adding listeners
document.addEventListener('keydown', (e) => handleKey(e));
document.querySelector('#new-game').addEventListener('click', newGame);
document.querySelector('#self-played').addEventListener('click', selfToggle);

//console.log(boardData);

// Keyboard
function handleKey(e) {
  if (state.running) {
    //console.log(e.keyCode);
    switch (e.keyCode) {
      case 37: // Left
        boardData = lib.moveLeft(boardData);
        break;
      case 38: // Up Rotate
        boardData = lib.rotate(boardData);
        break;
      case 39: // Right
        boardData = lib.moveRight(boardData);
        break;
      case 40: // Down Drop
        boardData = lib.drop(boardData);
        state.score += lib.completeLines(boardData);
        state.lines += lib.completeLines(boardData) / 10;
        break;
    }
    
  }
  //console.log(boardData);
  lib.renderBoard(boardData);
}

function selfToggle() {
  state.selfPlayed = !state.selfPlayed;
  const selfDiv = document.querySelector('#self-played');
  if (state.selfPlayed) {
    selfDiv.classList.remove('self-disabled');
    selfDiv.classList.add('self-enabled');
  } else {
    selfDiv.classList.remove('self-enabled');
    selfDiv.classList.add('self-disabled');
  }
}

// NEW GAME
let id = 0;
function newGame() {
  if (id) clearInterval(id);
  gameOver.style.display = 'none';
  state.lines = 0, state.score = 0, state.stats = [0,0,0,0,0,0,0];
  // Creates board, places new tetro, chooses next tetro
  // place some debris (if you want), set running state
  // to true & render board for the first time
  boardData = lib.createBoard();
  state.next = lib.randomTetro();
  boardData = lib.newTetro(boardData, state.next, false);
  state.stats[state.next]++;
  state.next = lib.randomTetro();
  boardData[19][0] = 'y';
  boardData[19][1] = 'c';
  boardData[19][2] = 'c';
  boardData[19][4] = 'c';
  boardData[19][5] = 'g';
  boardData[19][6] = 'c';
  boardData[19][7] = 'c';
  boardData[19][8] = 'b';
  state.running = true;
  boardData = lib.renderBoard(boardData, state);

  //lib.cleanBoard(boardData);
  //console.log(JSON.stringify(boardData));
  //console.log(tetros[lib.randomTetro()]);

  // Start Game (setInterval)  
  id = setInterval(() => {
    if (state.running) {
      if (lib.activeTetro(boardData)) {
        boardData = lib.lowerTetro(boardData);
      } else {
        if (lib.newTetro(boardData, state.next, true)) {
          //console.log('GAME OVER');
          gameOver.style.display = 'block';
          state.running = false;
        } else {
          boardData = lib.newTetro(boardData, state.next, false);
          state.stats[state.next]++;
          state.next = lib.randomTetro();
          state.score++; // 1 point per new tetro
          
        }        
      }
      
      state.score += lib.completeLines(boardData); // 10 points per line
      state.lines += lib.completeLines(boardData) / 10;
      boardData = lib.renderBoard(boardData, state);
      
    } else {
      // Game over
      clearInterval(id);
    }
  }, 750);
  //lib.renderBoard(boardData);
  

}
