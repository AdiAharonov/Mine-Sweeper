'use strict' 

var gBoard;
var gGame = {
  isOn: false,
}
var mine = '💣';
var flag = '🚩';
var gsmileys = ['😃', '😮', '😵', '🤑'];
var hintIcon = '💡';
var hints = [];
var hintsPlace;
var hintMsg = document.getElementById('hintMsg');
var hintClick = false;
var gameOverMsg = document.getElementById('gameOver');
var win = document.getElementById('win');
var timer = document.getElementById('timer');
var currSmiley = document.getElementById('smiley');

function initGame(size) {
  gBoard = createMat(size, size);
  printMat(gBoard, '.board');
  regSmiley();
 createMines(gBoard, size);
 setMinesCountBoard(gBoard);
 clearTime();
 updateTime(0);
 renderHints();
}

function createMines(board, size) {
  if (size === 4) {
    var mineCnt = 0;
    
    while (mineCnt < 2) {

      var rndIdxi = getRandomIntInclusive(0, 3);
      var rndIdxj = getRandomIntInclusive(0, 3);

      if (!board[rndIdxi][rndIdxj].isMine) {
        board[rndIdxi][rndIdxj].isMine = true;
        mineCnt++;
      }
    }
  }
  if (size === 8) {
    var mineCnt = 0;

    while (mineCnt < 12) {

      var rndIdxi = getRandomIntInclusive(0, 7);
      var rndIdxj = getRandomIntInclusive(0, 7);

      if (!board[rndIdxi][rndIdxj].isMine) {
        board[rndIdxi][rndIdxj].isMine = true;
        mineCnt++;
      }
      
    }
  }
  if (size === 12) {
    var mineCnt = 0;

    while (mineCnt < 30) {

      var rndIdxi = getRandomIntInclusive(0, 11);
      var rndIdxj = getRandomIntInclusive(0, 11);

      if (!board[rndIdxi][rndIdxj].isMine) {
        board[rndIdxi][rndIdxj].isMine = true;
        mineCnt++;
      }
      
    }
  }
}

function setMinesCountBoard(board) {

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
        if (!board[i][j].isMine) setMinesCount(i, j);
    }
}

}

function setMinesCount(row, col) {
  var bombsCnt = 0;

  for (var i = row - 1; i <= row + 1; i++) {

      if (i === - 1 || i >= gBoard.length) {continue}

      for (var j = col - 1; j <= col + 1; j++) {

          if (j === - 1 || j >= gBoard[0].length) {continue}
          if (i === row && j === col) {continue}

          if (gBoard[i][j].isMine) bombsCnt++;
      }

  }

  gBoard[row][col].minesAroundCount = bombsCnt;
}

function cellClicked(cell) {

  if (!gGame.isOn && !timeRunning) {
    gGame.isOn = true;
    timeRunning = true;
    runTimer()
  }
  
  showCell(cell);
 var cellObj = getCellByElement(cell); 

    if (hintClick) {
      var xPos = Math.floor(+cell.getAttribute('id') / 10);
      var yPos = Math.floor(+cell.getAttribute('id') % 10);
      showHintCells(xPos, yPos);
      setTimeout(hideHintCells, 2000);
      hintClick = false;
      return;
    }

    if (cellObj.isMine) {
      cell.innerText = mine;
      setTimeout(gameOver, 500);
    }
    
    if (!cellObj.isMine && !cellObj.isShown) {

      if (cellObj.minesAroundCount === 0) {
        cell.innerText = '';
        cellObj.isShown = true;
        var xPos = Math.floor(+cell.getAttribute('id') / 10);
        var yPos = Math.floor(+cell.getAttribute('id') % 10);
        openEmptyCells(xPos, yPos);
       
      }
      else {
        cell.innerText = cellObj.minesAroundCount;
        cellObj.isShown = true;
      }
          
    }
    checkWin();

}

function clickedSmiley() {
  smiley.innerText = gsmileys[1];
  }

  function regSmiley() {
    smiley.innerText = gsmileys[0];
  }

function flagCell(elCell) {

  if (!gGame.isOn && !timeRunning) {
    gGame.isOn = true;
    timeRunning = true;
    runTimer()
  }

  event.preventDefault()
  var cellObj = getCellByElement(elCell);

  if (!cellObj.isMarked) {
    elCell.innerText = flag;
    cellObj.isMarked = true;

  }
  else {
  elCell.innerText =  ''
cellObj.isMarked = false
}
}

function gameOver() {
  smiley.innerText = gsmileys[2];
  gGame.isOn = false;
  gameOverMsg.style.display = "flex";
  clearTime()
}

function playAgain() {
  regSmiley();
  gBoard = createMat(4, 4);
  printMat(gBoard, '.board');
  createMines(gBoard, 4);
  setMinesCountBoard(gBoard);
 gameOverMsg.style.display = "none";
 win.style.display = "none";
 updateTime(0)
 renderHints()

}

function showCell(elCell) {
  elCell.setAttribute('class', 'showCell');
}

function openEmptyCells(xPos, yPos) {

  for (var i = xPos - 1; i <= xPos + 1; i++) {

    if (i === - 1 || i >= gBoard.length) {continue}

    for (var j = yPos - 1; j <= yPos + 1; j++) {

        if (j === - 1 || j >= gBoard[0].length) {continue}
        if (i === xPos && j === yPos) {continue}
        if (gBoard[i][j].minesAroundCount > 0) {
          var cell = document.getElementById(i.toString() + j.toString())
          cell.innerText = gBoard[i][j].minesAroundCount;
          gBoard[i][j].isShown= true;
        }

        else {
            gBoard[i][j].isShown = true;
            
        }

    }

}
renderCells()
 
}

function renderCells() {

  if (!hintClick) {
  for (var i = 0; i < gBoard.length; i++) {
    for ( var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j].isShown === true) {
        var cell = document.getElementById(i.toString() + j.toString());
        showCell(cell);
      }
    }
  }
}

  else {
    for (var i = 0; i < gBoard.length; i++) {
      for ( var j = 0; j < gBoard.length; j++) {
        if (gBoard[i][j].isHinted === true) {
          var cell = document.getElementById(i.toString() + j.toString());
          if (gBoard[i][j].isMine) {
              cell.innerText = mine;
          }
          if (gBoard[i][j].minesAroundCount !== 0) {
            cell.innerText = gBoard[i][j].minesAroundCount;
          }
          
          showCell(cell);
        }
      }
    }
  }
}


function checkWin() {
  var openCellsCnt = 0;

  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {

      if (gBoard[i][j].isShown) {
        openCellsCnt++;
      }

    }
  }

  if (gBoard.length === 4 && openCellsCnt === 14) {
    win.style.display = 'flex';
    smiley.innerText = gsmileys[3];
    gGame.isOn = false;
    clearTime()
  }
  if (gBoard.length === 8 && openCellsCnt === 52) {
    win.style.display = 'flex';
    smiley.innerText = gsmileys[3];
    gGame.isOn = false;
    clearTime()
    
  }
  if (gBoard.length === 12 && openCellsCnt === 114) {
    win.style.display = 'flex';
    smiley.innerText = gsmileys[3];
    gGame.isOn = false;
    clearTime()
    
  }
}

var timeCallback, now, gameTime;
var timeRunning = false;

function runTimer() {
  var clickedDate = new Date();
  gameTime = 0;

  timeCallback = setInterval(() => {
    const now = new Date();
    gameTime = now.getTime() - clickedDate.getTime();
    updateTime(gameTime);
  }, 1000);
}

function parseTime(millisec) {
    const hours = Math.floor((millisec / (1000 * 60 * 60)));
    const minutes = Math.floor((millisec / (1000 * 60)) - (hours * 60));
    const seconds =  Math.floor((millisec / 1000)) - (60 * minutes);


    return {
        hours,
        minutes,
        seconds
    }
}

function updateTime(millisec) {
    
    const time = parseTime(millisec);

    const hours = time.hours;
    const minutes = time.minutes;
    const seconds = time.seconds;

  timer.textContent =
    (hours ? (hours > 9 ? hours : '0' + hours) : '00') +
    ':' +
    (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') +
    ':' +
    (seconds ? (seconds > 9 ? seconds : '0' + seconds) : '00');
}

function clearTime() {

  if (timeCallback) {
    clearInterval(timeCallback);

    timeRunning = false;
  }
}

function renderHints() {
  hints = [];

  if (hintsPlace) {
    hintsPlace.remove();
  }
   
  hintsPlace = document.createElement("div");
  document.body.appendChild(hintsPlace);
  hintsPlace.setAttribute("class", "hints");
  
  for (var i = 0; i < 3; i++) {
      var hint = document.createElement("span");
      hints.push(hint);
      hintsPlace.appendChild(hint);
      hint.innerText = hintIcon;
  }
 
}

function showHint() {
  if (hints.length > 0) {

 
  hints[0].remove();
  hints.splice(0, 1);
  hintMsg.style.display = 'flex';
  setTimeout(hideHintMsg, 1500);
  hintClick = true;
}
else return;
}

function hideHintMsg() {
  hintMsg.style.display = 'none';
}

function showHintCells(xPos, yPos) {
  for (var i = xPos - 1; i <= xPos + 1; i++) {

    if (i === - 1 || i >= gBoard.length) {continue}

    for (var j = yPos - 1; j <= yPos + 1; j++) {

        if (j === - 1 || j >= gBoard[0].length) {continue}

        if (gBoard[i][j].isShown) {continue}
       
        else {
            gBoard[i][j].isHinted = true;
            if (gBoard.isMine) {

            }
            
        }
   }
} renderCells()
}

function hideHintCells() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j].isHinted === true) {
        gBoard[i][j].isHinted = false;
        var cell = document.getElementById(i.toString() + j.toString());
        cell.innerText = '';
        cell.setAttribute('class', 'cell');
      }
    }
  }
}