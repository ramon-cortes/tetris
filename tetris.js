import * as lib from './lib.js';

// VARS
let boardData = lib.createBoard();
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
let id = 0, idSelf = 0;
function newGame() {
  if (id) clearInterval(id);
  if (idSelf) {
    clearInterval(idSelf);
    idSelf = 0;
  }
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

  // Add debris
  //boardData[14][5] = 'r'; 
  //boardData[10][5] = 'r';

    
  state.running = true;
  boardData = lib.renderBoard(boardData, state);

  
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

      //-----------SELF PLAY MODE-----------
      if (!idSelf && state.selfPlayed) {
        //let borrar = 0;        
        idSelf = setInterval(() => {
          if (!state.selfPlayed) {
            clearInterval(idSelf);
            idSelf = 0;
          }
          boardData = lib.selfPlay(boardData, state);


        }, 100); //100 para que cyan llegue a los extremos laterales
      }
      //-----------SELF PLAY MODE-----------

      // Update score, lines & render
      state.score += lib.completeLines(boardData); // 10 points per line
      state.lines += lib.completeLines(boardData) / 10;
      boardData = lib.renderBoard(boardData, state);      
    } else {
      // Game over
      clearInterval(id);
    }
  }, 1000);
  
  // SELFPLAYED OR TETRIS-SOLVER
  /*let borrar = 0;
  if (state.running && state.selfPlayed) {
    idSelf = setInterval(() => {
      if (!state.selfPlayed) {
        clearInterval(idSelf);
        idSelf = 0;
      }
      //console.log('trying to solve the Tetris...', borrar);
      borrar++;


    }, 1000)
  }*/

}
