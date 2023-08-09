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
  ] 

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
      if (!/[a-z]/.test(boardData[up+i][left+j])) {
        miniBoard.array[i].push(boardData[up+i][left+j]);
      } else {
        miniBoard.array[i].push('');
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
  return Math.round(Math.random() * 6);
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
          if (/[a-z]/.test(boardData[k][j]) && k <= lowestPos) {
            lowestPos = k - 1 + lowestActivePos - i;
            if (lowestPos > 19) lowestPos = 19;
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