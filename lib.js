import { patterns } from "./patterns.js"; 
/*c = cyan ─
  b = blue ┘
  o = orange └
  y = yellow ■
  g = green s
  m = magenta ┴
  r = red z     */
const tetros = ['c','b','o','y','g','m','r'];
const tetrosNext = ['cyan', 'blue', 'orange', 'yellow', 'green', 'magenta', 'red'];
const tetrosArr = [
  {
    i: [0, 0, 0, 0],
    j: [3, 4, 5, 6]
  },
  {
    i: [0, 1, 1, 1],
    j: [4, 4, 5, 6]
  },
  {
    i: [0, 0, 0, 1],
    j: [4, 5, 6, 4]
  },
  {
    i: [0, 0, 1, 1],
    j: [4, 5, 4, 5]
  },
  {
    i: [0, 0, 1, 1],
    j: [5, 6, 4, 5]
  },
  {
    i: [0, 0, 0, 1],
    j: [4, 5, 6, 5]
  },
  {
    i: [0, 0, 1, 1],
    j: [4, 5, 5, 6]
  },
];
let dropHere = 0;

// miniBoard = the min area that has to be rotated
function getMiniBoard(boardData) {
  let miniBoard = {
    array: [],
    left: 0,
    leftOriginal: 0,
    up: 0
  };
  // Determines the boundaries
  let left = -1, right = -1, up = -1, down = -1;
  for (let i = 0; i < boardData[0].length; i++) {
    if (left !== -1) break;
    for (let j = 0; j < boardData.length; j++) {
      if (/[A-Z]/.test(boardData[j][i])) {
        left = i;
        break;
      }      
    }    
  }
  for (let i = 0; i < boardData.length; i++) {
    if (up !== -1) break;
    for (let j = 0; j < boardData[0].length; j++) {
      if (/[A-Z]/.test(boardData[i][j])) {
        up = i;
        break;
      }      
    }    
  }
  for (let i = boardData[0].length - 1; i >= 0; i--) {
    if (right !== -1) break;
    for (let j = 0; j < boardData.length; j++) {
      if (/[A-Z]/.test(boardData[j][i])) {
        right = i;
        break;
      }        
    }
  }
  for (let i = boardData.length - 1; i >= 0; i--) {
    if (down !== -1) break;
    for (let j = 0; j < boardData[0].length; j++) {
      if (/[A-Z]/.test(boardData[i][j])) {
        down = i;
        break;
      }        
    }
  }
  miniBoard.leftOriginal = left;
  //console.log(`left ${left} right ${right} up ${up} down ${down}`);
  for (let i = 0; i < down - up + 1; i++) {
    miniBoard.array.push([]);
    for (let j = 0; j < right - left + 1; j++) {
      // ↓ Prevents bug if there is no new tetro yet
      if (up !== -1) {
        if (!/[a-z]/.test(boardData[up+i][left+j])) {
          miniBoard.array[i].push(boardData[up+i][left+j]);
        } else {
          miniBoard.array[i].push('');
        }
      }      
    }
  }
  // Determina la ubicación de la figura rotada
  if (miniBoard.array[0].length === 4) {
    miniBoard.left = left + 2;
    miniBoard.up = up - 1;
  } else if (miniBoard.array.length === 4) {
    miniBoard.left = left - 2;
    miniBoard.up = up + 1;
  } else if (miniBoard.array[0].length > miniBoard.array.length) {
    // Es más ancho que alto
    miniBoard.left = left;
    miniBoard.up = up - 1;
  } else if (miniBoard.array.length > miniBoard.array[0].length) {
    // Es más alto que ancho
    miniBoard.left = left;
    miniBoard.up = up + 1;
  } else {
    miniBoard.left = left;
    miniBoard.up = up;
  }

  return miniBoard;
}

function removePreviousPosition(boardData) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (/[A-Z]/.test(boardData[i][j])) {
        //console.log(`uppercase ${i} ${j}`);
        boardData[i][j] = '';
      }
    }
  }
  return boardData;
}

export function createBoard() {
  const boardData = []
  for (let i = 0; i < 20; i++) {
    boardData.push([]);
    for (let j = 0; j < 10; j++) {    
      boardData[i].push('');
    }  
  }
  return boardData;
}

export function randomTetro() {
  return Math.floor(Math.random() * 7);
}

export function cleanBoard(boardData) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      boardData[i][j] = '';
    }  
  }
}

export function activeTetro(boardData) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (/[A-Z]/.test(boardData[i][j])) return true;
    }  
  }
  return false;
}

export function completeLines(boardData) {
  let lines = 0;
  for (let i = 0; i < 20; i++) {
    let filledLine = true;
    for (let j = 0; j < 10; j++) {
      if (boardData[i][j] === '' || /[A-Z]/.test(boardData[i][j])) filledLine = false;
    }
    if (filledLine) lines += 10;
  }
  return lines;
}

function cleanCompleteLines(boardData) {
  for (let i = 0; i < 20; i++) {
    let filledLine = true;
    for (let j = 0; j < 10; j++) {
      if (boardData[i][j] === '' || /[A-Z]/.test(boardData[i][j])) filledLine = false;
    }
    if (filledLine) {
      for (let k = i; k >= 1; k--) {
        for (let l = 0; l < 10; l++) {
          if (!/[A-Z]/.test(boardData[k][l])) boardData[k][l] = boardData[k-1][l];
        }        
      }
    }
  }
  return boardData;
}

export function renderBoard(boardData, state) {
  boardData = cleanCompleteLines(boardData);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      const thisCell = document.getElementById(`${i},${j}`);
      thisCell.innerHTML = '';
      if (boardData[i][j] !== '') {
        for (let k = 0; k < tetros.length; k++) {
          if (boardData[i][j].toLocaleLowerCase() === tetros[k]) {
            const img = document.createElement('img');
            img.src = `./img/${tetros[k]}.png`;
            img.className = 'img';
            thisCell.appendChild(img);
          }
        }
      }
    }  
  }    
  if (state) {
    // Renders score and stats
    document.getElementById('next-img').src = `./img/${tetrosNext[state.next]}.png`;
    document.getElementById('score').innerText = state.score;
    document.getElementById('lines').innerText = state.lines;
    for (let i = 0; i < state.stats.length; i++) {
      document.getElementById(`tetro${i+1}`).innerText = state.stats[i];      
    }
    
  }
  return boardData;
}

export function moveLeft(boardData) {
  //console.log(boardData);
  let canMove = true;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (/[A-Z]/.test(boardData[i][j])) {
        //console.log(`uppercase ${i} ${j}`);
        if ((j - 1) > -1) {
          if (/[a-z]/.test(boardData[i][j-1])) {
            canMove = false;
          }
        } else {
          canMove = false;
        }
      }
    }
  }
  if (canMove) {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        if (/[A-Z]/.test(boardData[i][j])) {
          boardData[i][j-1] = boardData[i][j];
          boardData[i][j] = '';
        }
      }
    }
  }
  return boardData;
}

export function moveRight(boardData) {
  //console.log(boardData);
  let canMove = true;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (/[A-Z]/.test(boardData[i][j])) {
        //console.log(`uppercase ${i} ${j}`);
        if ((j + 1) < 10) {
          if (/[a-z]/.test(boardData[i][j+1])) {
            canMove = false;
          }
        } else {
          canMove = false;
        }
      }
    }
  }
  if (canMove) {
    for (let i = 19; i >= 0; i--) {
      for (let j = 9; j >= 0; j--) {
        if (/[A-Z]/.test(boardData[i][j])) {
          boardData[i][j+1] = boardData[i][j];
          boardData[i][j] = '';
        }
      }
    }
  }
  return boardData;
}

export function rotate(boardData) {
  let miniBoard = getMiniBoard(boardData);
  //console.log(`left ${miniBoard.left}, up ${miniBoard.up}`);
  //console.log(JSON.stringify(miniBoard.array));

  let rotatedBoard = [];
  for (let i = 0; i < miniBoard.array[0].length; i++) {
    rotatedBoard.push([]);
    for (let j = miniBoard.array.length - 1; j >= 0; j--) {
      rotatedBoard[i].push(miniBoard.array[j][i]);    
    }
  }
  //console.log(JSON.stringify(rotatedBoard));
  // Validates that rotation is not occupied space
  let canBeRotated = true;
  for (let i = 0; i < rotatedBoard.length; i++) {
    for (let j = 0; j < rotatedBoard[0].length; j++) {
      if (miniBoard.up + i < 0) {
        canBeRotated = false;
        break;
      } else if (rotatedBoard[i][j] !== '' && /[a-z]/.test(boardData[miniBoard.up+i][miniBoard.left+j])) {
        canBeRotated = false;
        break;
      }      
    }    
  }
  // Validates that rotation within boundaries
  if (miniBoard.left + rotatedBoard[0].length - 1 > 9) canBeRotated = false;
  if (canBeRotated) {
    boardData = removePreviousPosition(boardData);
    for (let i = 0; i < rotatedBoard.length; i++) {
      for (let j = 0; j < rotatedBoard[0].length; j++) {
        if (rotatedBoard[i][j] !== '') boardData[miniBoard.up+i][miniBoard.left+j] = rotatedBoard[i][j];
      }    
    }
  }
  return boardData;
}

// BUG: AZUL Y NARANJAS SE TRASLAPAN
export function drop(boardData) {
  let lowestPos = 19, lowestActivePos = 0;
  let miniBoard = getMiniBoard(boardData);
  //console.log(JSON.stringify(miniBoard.array));
  // Determines the position the active tetro will occupy at the bottom
  for (let i = 0; i < boardData.length; i++) {
    for (let j = 0; j < boardData[0].length; j++) {
      if (/[A-Z]/.test(boardData[i][j])) lowestActivePos = i;
    }
  }
  for (let i = 0; i < boardData.length; i++) {
    for (let j = 0; j < boardData[0].length; j++) {
      if (/[A-Z]/.test(boardData[i][j]) && !/[A-Z]/.test(boardData[i+1][j])) {
        for (let k = i + 1; k < boardData.length; k++) {
          if (lowestActivePos - i === 2) {
            if (/[a-z]/.test(boardData[k][j]) && k < lowestPos) {
              lowestPos = k - 1 + lowestActivePos - i;
              if (lowestPos > 19) lowestPos = 19;
            }
          } else {
            if (/[a-z]/.test(boardData[k][j]) && k <= lowestPos) {
              lowestPos = k - 1 + lowestActivePos - i;
              if (lowestPos > 19) lowestPos = 19;
            }
          }          
        }
      }
    }
  }
  //console.log(`left: ${miniBoard.leftOriginal}, lowestpos: ${lowestPos}`);
  // Copies the tetro to the lowest position
  for (let i = lowestPos - miniBoard.array.length + 1; i <= lowestPos; i++) {
    for (let j = miniBoard.leftOriginal; j <= miniBoard.array[0].length + miniBoard.leftOriginal; j++) {
      if (/[A-Z]/.test(miniBoard.array[i-lowestPos+miniBoard.array.length-1][j-miniBoard.leftOriginal])) {
        boardData[i][j] = miniBoard.array[i-lowestPos+miniBoard.array.length-1][j-miniBoard.leftOriginal].toLocaleLowerCase();
      }
    }
  }
  // Removes the old active tetro 
  for (let i = 0; i < boardData.length; i++) {
    for (let j = 0; j < boardData[0].length; j++) {
      if (/[A-Z]/.test(boardData[i][j])) boardData[i][j] = '';
    }
  }

  return boardData;
}

// Creates a random new tetro at the top
export function newTetro(boardData, next, test) {
  if (test) {
    // Check if game over
    for (let x = 0; x < tetrosArr[next].i.length; x++) {
      if (boardData[tetrosArr[next].i[x]][tetrosArr[next].j[x]] !== '') {
        return true;
      }
    }
    return false;
  } else {
    for (let x = 0; x < tetrosArr[next].i.length; x++) {
      boardData[tetrosArr[next].i[x]][tetrosArr[next].j[x]] = tetros[next].toLocaleUpperCase();
      
    }
    return boardData;
  }
  //
  
}

// Moves the Tetro one position down
export function lowerTetro(boardData) {
  //console.log('moving tetro down');
  let reachedBottom = false;
  for (let i = 0; i < boardData.length; i++) {
    for (let j = 0; j < boardData[0].length; j++) {
      if (/[A-Z]/.test(boardData[i][j]) && i === 19) {
        // Tetro reached bottom
        reachedBottom = true;
      } else if (/[A-Z]/.test(boardData[i][j]) && /[a-z]/.test(boardData[i+1][j])) {
        // Tetro reached obstacle bottom
        reachedBottom = true;
      }
    }    
  }
  if (reachedBottom) {
    for (let i = 0; i < boardData.length; i++) {
      for (let j = 0; j < boardData[0].length; j++) {
        if (/[A-Z]/.test(boardData[i][j])) {
          boardData[i][j] = boardData[i][j].toLocaleLowerCase();
        }
      }    
    }
  } else {
    for (let i = boardData.length - 1; i >= 0 ; i--) {
      for (let j = 0; j < boardData[0].length; j++) {
        if (/[A-Z]/.test(boardData[i][j])) {
          boardData[i+1][j] = boardData[i][j];
          boardData[i][j] = '';
        }
      }    
    }
  }
  return boardData;
}

// -------------Self Play-------------

function getInverted(miniBoard) {
  //let inverted = [...miniBoard];
  let inverted = JSON.parse(JSON.stringify(miniBoard));
  for (let i = miniBoard.length - 1; i >= 0; i--) {
    for (let j = 0; j < miniBoard[0].length; j++) {
      if (i < miniBoard.length - 1 && miniBoard[i+1][j] !== '') {
        inverted[i][j] = '';
      } else if (miniBoard[i][j] === '') {
        inverted[i][j] = 'x';
      } else {
        inverted[i][j] = '';
      }      
    }    
  }
  return inverted;
}

function getColor(miniBoard) {
  return miniBoard.flat().join('')[0];
}

// Searchs for a pattern in the board, aka: tries to fit the tetro in x,y
function patternExists(boardData, pattern, y, x) {
  //let fits = true;
  for (let i = y - (pattern.length - 1), k = 0; i <= y; i++, k++) {
    for (let j = x, l = 0; j < x + pattern[0].length; j++, l++) {
      if (pattern[k][l] !== '*') {
        if ((pattern[k][l] === '' && boardData[i][j] !== '') || (pattern[k][l] !== '' && boardData[i][j] === '') || /[A-Z]/.test(boardData[i][j])) {
          return false;
        }   
      }      
    }
  }
  return true;
}

// Searchs for a pattern in the area starting at x,y ending xFinal,yFinal
function patternExistsArea(boardData, pattern, y, x, yFinal, xFinal) {
  for (let a = y; a >= yFinal; a--) {
    for (let b = x; b <= xFinal; b++) {
      if (patternExists(boardData, pattern, a, b)) {
        let clearAbove = true;
        // Confirms that its also clear above (aka, pattern was found at the top)
        for (let i = a - pattern.length; i >= 0; i--) {
          for (let j = b; j < b + pattern[0].length; j++) {
            if (/[a-z]/.test(boardData[i][j])) {
              clearAbove = false;
              break;
            }
          }          
        }
        if (clearAbove) {
          dropHere = b;
          return true;
        }
      }
    }
  }
  return false;
}


function chooseDirectionDrop(boardData, state, miniBoard, xToDrop) {
  if (miniBoard.left > xToDrop) {
    boardData = moveLeft(boardData);
  } else if (miniBoard.left < xToDrop) {
    boardData = moveRight(boardData);
  } else {
    boardData = drop(boardData);
    state.score += completeLines(boardData);
    state.lines += completeLines(boardData) / 10;
  }
  return boardData;
}

export function selfPlay(boardData, state) {  
  let miniBoard = getMiniBoard(boardData);
  let color = getColor(miniBoard.array);
  //let inverted = getInverted(miniBoard.array);

  //console.log(JSON.stringify(patterns.yellow[0]));
  //console.log(patterns.yellow[0].length);
  //console.log(patterns.yellow[0][0].length);

  // ---YELLOW---
  if (color === 'Y') {
    // Bottom left ↓
    if (patternExists(boardData, patterns.yellow[0], 19, 0)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, 0);
      // Bottom right
    } else if (patternExists(boardData, patterns.yellow[1], 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, 8);
      // All bottom
    } else if (patternExistsArea(boardData, patterns.yellow[12], 19, 0, 19, 8)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // All right
    } else if (patternExistsArea(boardData, patterns.yellow[3], 19, 7, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
      // All left
    } else if (patternExistsArea(boardData, patterns.yellow[2], 19, 0, 3, 0)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // All center bottom
    } else if (patternExistsArea(boardData, patterns.yellow[4], 19, 0, 19, 6)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
      // All center
    } else if (patternExistsArea(boardData, patterns.yellow[5], 19, 0, 3, 6)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
      // Bottom left small
    } else if (patternExists(boardData, patterns.yellow[6], 19, 0)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, 0);
      // Bottom right small
    } else if (patternExists(boardData, patterns.yellow[7], 19, 7)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, 8);
      // Bottom center small
    } else if (patternExistsArea(boardData, patterns.yellow[8], 19, 0, 19, 6)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
      // All left small
    } else if (patternExistsArea(boardData, patterns.yellow[9], 19, 0, 3, 0)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // All right small
    } else if (patternExistsArea(boardData, patterns.yellow[10], 19, 7, 3, 7)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
      // All center small
    } else if (patternExistsArea(boardData, patterns.yellow[11], 19, 0, 3, 6)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);      
      // All everywhere small
    } else if (patternExistsArea(boardData, patterns.yellow[13], 19, 0, 3, 8)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);      
      // 14
    } else if (patternExistsArea(boardData, patterns.yellow[14], 19, 0, 19, 8)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);      
      // 15
    } else if (patternExistsArea(boardData, patterns.yellow[15], 19, 0, 19, 8)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);      
      // 16 
    } else if (patternExistsArea(boardData, patterns.yellow[16], 19, 0, 3, 8)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);      
      // 17 
    } else if (patternExistsArea(boardData, patterns.yellow[17], 19, 0, 3, 8)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);      
      // 18 
    } else if (patternExistsArea(boardData, patterns.yellow[18], 19, 0, 3, 8)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);      
      // 19 
    } else if (patternExistsArea(boardData, patterns.yellow[19], 19, 0, 3, 8)) { 
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);      
      // xx 
    } else {
      boardData = drop(boardData);
    }
    // ---GREEN---
  } else if (color === 'G' && miniBoard.up > -1) {
    // Bottom 
    if (patternExistsArea(boardData, patterns.green[0], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom vertical
    } else if (patternExistsArea(boardData, patterns.green[1], 19, 0, 19, 8)) {
      if (miniBoard.array[0][0] === '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // All horizontal
    } else if (patternExistsArea(boardData, patterns.green[2], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // All vertical
    } else if (patternExistsArea(boardData, patterns.green[3], 19, 0, 3, 8)) {
      if (miniBoard.array[0][0] === '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom vertical 1bad
    } else if (patternExistsArea(boardData, patterns.green[4], 19, 0, 19, 8)) {
      if (miniBoard.array[0][0] === '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom horizontal 1bad
    } else if (patternExistsArea(boardData, patterns.green[5], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Horizontal 1bad
    } else if (patternExistsArea(boardData, patterns.green[6], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom vertical 2bad
    } else if (patternExistsArea(boardData, patterns.green[7], 19, 0, 19, 7)) {
      if (miniBoard.array[0][0] === '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom horizontal 2bad
    } else if (patternExistsArea(boardData, patterns.green[9], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom all vertical 2bad
    } else if (patternExistsArea(boardData, patterns.green[8], 19, 0, 3, 7)) {
      if (miniBoard.array[0][0] === '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom all horizontal 2bad
    } else if (patternExistsArea(boardData, patterns.green[10], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // xx
    } else {
      boardData = drop(boardData);
    }
    // ---RED---
  } else if (color === 'R' && miniBoard.up > -1) {
    // Bottom 
    if (patternExistsArea(boardData, patterns.red[0], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom vertical
    } else if (patternExistsArea(boardData, patterns.red[1], 19, 0, 19, 8)) {
      if (miniBoard.array[0][0] !== '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // All horizontal
    } else if (patternExistsArea(boardData, patterns.red[2], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // All vertical
    } else if (patternExistsArea(boardData, patterns.red[3], 19, 0, 3, 8)) {
      if (miniBoard.array[0][0] !== '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom vertical 1bad
    } else if (patternExistsArea(boardData, patterns.red[4], 19, 0, 19, 8)) {
      if (miniBoard.array[0][0] !== '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom horizontal 1bad
    } else if (patternExistsArea(boardData, patterns.red[5], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Horizontal 1bad
    } else if (patternExistsArea(boardData, patterns.red[6], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom vertical 2bad
    } else if (patternExistsArea(boardData, patterns.red[7], 19, 0, 19, 7)) {
      if (miniBoard.array[0][0] !== '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom horizontal 2bad
    } else if (patternExistsArea(boardData, patterns.red[9], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom all vertical 2bad
    } else if (patternExistsArea(boardData, patterns.red[8], 19, 0, 3, 7)) {
      if (miniBoard.array[0][0] !== '') boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // Bottom all horizontal 2bad
    } else if (patternExistsArea(boardData, patterns.red[10], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
      // xx
    } else {
      boardData = drop(boardData);
    }
    // ---ORANGE---
  } else if (color === 'O' && miniBoard.up > -1) {
    if (patternExistsArea(boardData, patterns.orange[0], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[1], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[2], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[3], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[4], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[20], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[5], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[6], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[7], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[8], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[9], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[10], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[11], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[12], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[13], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[14], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[15], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[16], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[17], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[18], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[19], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[21], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[22], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.orange[23], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["O","O","O"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else {
      boardData = drop(boardData);
    }
    // ---BLUE---
  } else if (color === 'B' && miniBoard.up > -1) {
    if (patternExistsArea(boardData, patterns.blue[0], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[1], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[2], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
    } else if (patternExistsArea(boardData, patterns.blue[3], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
    } else if (patternExistsArea(boardData, patterns.blue[4], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
    } else if (patternExistsArea(boardData, patterns.blue[20], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[5], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[6], 19, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[7], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[8], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[9], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[10], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[11], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[12], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[13], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[14], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[15], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[16], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[17], 19, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[18], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[19], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[21], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[22], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.blue[23], 19, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["B","",""]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else {
      boardData = drop(boardData);
    }
    // ---MAGENTA---
  } else if (color === 'M' && miniBoard.up > -1) {
    if (patternExistsArea(boardData, patterns.magenta[0], 19, 0, 19, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[1], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) renderBoard(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[2], 19, 0, 19, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[3], 19, 0, 15, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[4], 19, 0, 15, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[5], 19, 0, 15, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[6], 19, 0, 19, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[3], 14, 0, 9, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[4], 14, 0, 9, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[5], 14, 0, 9, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[7], 19, 0, 9, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[3], 8, 0, 3, 7)) {
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[4], 8, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) boardData = rotate(boardData);   
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[5], 8, 0, 3, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else if (patternExistsArea(boardData, patterns.magenta[7], 8, 0, 3, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["M","M","M"]`) {
        boardData = rotate(boardData);
        boardData = rotate(boardData);
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere);
    } else {
      boardData = drop(boardData);
    }
    // ---CYAN---
  } else if (color === 'C' && miniBoard.up > -1) {
    if (patternExistsArea(boardData, patterns.cyan[0], 19, 0, 15, 0)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[1], 19, 8, 15, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[2], 19, 0, 15, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[3], 19, 0, 15, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[4], 19, 0, 15, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[5], 19, 0, 15, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[6], 19, 0, 15, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[7], 19, 0, 15, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) {
        boardData = rotate(boardData);        
      } else {
        miniBoard.left = miniBoard.leftOriginal;
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
    } else if (patternExistsArea(boardData, patterns.cyan[8], 19, 0, 19, 9)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[0], 14, 0, 10, 0)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[1], 14, 8, 10, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[2], 14, 0, 10, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[3], 14, 0, 10, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[4], 14, 0, 10, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[5], 14, 0, 10, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[6], 14, 0, 10, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[7], 14, 0, 10, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) {
        boardData = rotate(boardData);        
      } else {
        miniBoard.left = miniBoard.leftOriginal;
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
    } else if (patternExistsArea(boardData, patterns.cyan[0], 9, 0, 4, 0)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[1], 9, 8, 4, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[2], 9, 0, 4, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[3], 9, 0, 4, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[4], 9, 0, 4, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[5], 9, 0, 4, 7)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 1);
    } else if (patternExistsArea(boardData, patterns.cyan[6], 9, 0, 4, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) boardData = rotate(boardData);
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere - 2);
    } else if (patternExistsArea(boardData, patterns.cyan[7], 9, 0, 4, 8)) {
      if (JSON.stringify(miniBoard.array[0]) === `["C","C","C","C"]`) {
        boardData = rotate(boardData);        
      } else {
        miniBoard.left = miniBoard.leftOriginal;
      }
      boardData = chooseDirectionDrop(boardData, state, miniBoard, dropHere + 1);
    } else {
      boardData = drop(boardData);
    }
  }  

  

  boardData = renderBoard(boardData, state);
  return boardData;
}
// -------------Self Play-------------