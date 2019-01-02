const resolution = 5;
const width = 500;
const height = 500;
const cols = width / resolution;
const rows = height / resolution;
const interval = 50;

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let Game = {
  start: function () {
    canvas.setAttribute('width', width + 1);
    canvas.setAttribute('height', height + 1);

    let grid = new Grid();

    grid.draw();

    setInterval(function () {
      grid.step();
    }, interval);
  }
};

function Grid() {
  this.cells = [];

  for (let i = 0; i < cols; i++) {
    this.cells[i] = [];

    for (let j = 0; j < rows; j++) {
      this.cells[i][j] = Math.round(Math.random());
    }
  }

  this.draw = function () {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        context.fillStyle = this.cells[i][j] ? '#000' : '#fff';

        context.fillRect(i * resolution, j * resolution, resolution, resolution);
      }
    }
  };

  this.step = function () {
    let next = JSON.parse(JSON.stringify(this.cells));

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = this.cells[i][j];

        let neighbours = this.countNeighbours(i, j, this.cells);

        if (state == 0 && neighbours == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }

    this.cells = next;

    this.draw();
  };

  this.countNeighbours = function (x, y, cells) {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;

        sum += cells[col][row];
      }
    }

    sum -= cells[x][y];

    return sum;
  };
}

Game.start();
