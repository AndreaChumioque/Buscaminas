/*
1. Representar como tabla
2. Los tr son filas --> tr data-row
3. Los td son columnas --> td data-column

con 2 ciclos recoremos la matriz (primero filas y luego columnas)

creamos contador para acumular cantidad de celdas visitadas

se pierde si el usuario toca una bomba: se remuven los eventos de la tabla y se muestran las posiciones de todas las bombas (function showBomb)

variable para guardar table --> tabla html
variable para guardar matriz --> lo que se recorre en la logica del juego
*/

/* Se usan variables en mayusculas para representar constantes */

var board = document.querySelector('.board-js');
var allCells = document.querySelectorAll('td');
var BOMB;
var matrixOrigin = [[1, 1, 1, ''],
                    [1, BOMB, 1, ''],
                    [1, 1, 2, 1],
                    ['', '', 1, BOMB]];
var visitedCells = 0;
var msg = document.getElementById('msg');
var reset = document.getElementById('reset');

board.addEventListener('click', displayCell);
reset.addEventListener('click',resetGame);
document.body.addEventListener('click',checkTarget);

// Función para jugar dentro del tablero
function displayCell(event) {
  if (event.target.matches('td')) {
    checkVisitedCell(event);
    var value = getCell(event);
    switch (value) {
      case '':
        msg.textContent = '';
        event.target.style.backgroundColor = '#17BEBB';
        event.target.setAttribute('data-status','visited');
        break;
      case BOMB:
        msg.style.color = '#EF3E36';
        msg.textContent = 'Esto ha explotado.';
        showMatrix(event);
        board.removeEventListener('click', displayCell);
        document.body.removeEventListener('click',checkTarget);
        break;
      default:
        msg.textContent = '';
        event.target.textContent = value;
        event.target.setAttribute('data-status','visited');
    }
    event.stopPropagation();
    checkWinner(event);
  } else {
    checkTarget(event);
  }
}

// Función para verificar que el click fue dentro del tablero
function checkTarget(event) {
  msg.textContent = 'Sigue jugando';
  event.stopPropagation();
}

// Función para determinar el numero de fila y columnad de la celda
function getCell(event) {
  var row = parseInt(event.target.parentElement.dataset.row) - 1;
  var column = parseInt(event.target.dataset.column) - 1;
  return matrixOrigin[row][column];
}

// Función para celdas visitadas
function checkVisitedCell(event) {
  // var visited = getCell(event);
 if (event.target.dataset.status != 'visited')
  visitedCells++;
}

// Función para mostrar las celdas con bombas
function showMatrix(event) {
  for (var i = 0; i < matrixOrigin.length; i++) {
    for (var j = 0; j < matrixOrigin[i].length; j++) {
      if (matrixOrigin[i][j] == BOMB) {
        allCells[i * 4 + j].style.backgroundColor = '#EF3E36';
        allCells[i * 4 + j].className = 'bomb';
      }
    }
  }
}

// Función para determinar si se ganó el juego
function checkWinner (event) {
  var bombCells = allCells.length - visitedCells;
  if (bombCells == 2) {
    msg.style.color = '#0D6866';
    msg.textContent = '¡Ganaste!';
    board.removeEventListener('click',displayCell);
    document.body.removeEventListener('click',checkTarget);
  }
}

// Función para resetear el juego
function resetGame(event) {
  visitedCells = 0;
  msg.textContent = '';
  for (var i = 0; i < allCells.length; i++) {
    allCells[i].className = '';
    allCells[i].textContent = '';
    allCells[i].style.backgroundColor = '';
    allCells[i].removeAttribute('data-status');
  }
  event.stopPropagation();
  board.addEventListener('click', displayCell);
  document.body.addEventListener('click',checkTarget);
}