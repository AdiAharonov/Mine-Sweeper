function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                isHinted: false 
                
            }
            row.push(cell);
        }
        mat.push(row)
    }
    return mat
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < mat[0].length; j++) {

        strHTML += '<td class="cell" id="' + i + j + '" onClick="cellClicked(this)" oncontextmenu="flagCell(this)" onmousedown="clickedSmiley()" onmouseup="regSmiley()"> ' + ' </td>';
        
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
  }

 function getCellByElement(elCell) {

    var elCellId = elCell.getAttribute('id');

     for (var i = 0; i < gBoard.length; i++) {
         for (var j = 0; j < gBoard.length; j++) {
             if (elCellId ===  i.toString() + j.toString()) {

                 return gBoard[i][j];
             }
         }
     }
 }

 
 