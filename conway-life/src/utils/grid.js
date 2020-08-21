import { Cell } from "./cell";

export class Grid {
  // Set the size for each Grid

  constructor({ l, w, cellSize, context }) {
    this.l = l;
    this.w = w;
    this.thing = [];
    this.context = context;
    this.cellSize = cellSize;
  }

  update() {
    // Draw a square, let the state determine the color
    // if (this.alive) {
    //   this.context.fillStyle = "red";
    //   this.context.fillRect(this.gridX, this.gridY, this.size, this.size);
    // } else {
    //   this.context.clearRect(this.gridX, this.gridY, this.size, this.size);
    // }

    //check left and right of current index like: arr[i][j-1]
    let livingNeighbors = 0;
    for (let i = 0; i < this.l; i++) {
      for (let j = 0; j < this.w; j++) {
        //check left neighbor
        if (j > 0 && this.thing[i][j - 1].alive) {
          livingNeighbors += 1;
          //this.thing[i][j].livingNeighbors;
        }

        let funTimes = [
          [3, 3, 3],
          [3, 3, 3],
          [3, 3, 3],
        ];
        //check right neighbor
        //console.log(`j is ${j} and alive is ${this.thing[i][j + 1].alive}`);
        if (j < this.w - 1 && this.thing[i][j + 1].alive) {
          livingNeighbors += 1;
        }

        //check bottom neighbor
        if (i > 0 && this.thing[i - 1][j].alive) {
          livingNeighbors += 1;
        }
        //check top neighbor
        if (i < this.l - 1 && this.thing[i + 1][j].alive) {
          livingNeighbors += 1;
        }

        //check top left
        if (i < this.l - 1 && j > 0 && this.thing[i + 1][j - 1].alive) {
          livingNeighbors += 1;
        }
        //check bottom left
        if (i > 0 && j > 0 && this.thing[i - 1][j - 1].alive) {
          livingNeighbors += 1;
        }

        //check top right
        if (
          i < this.l - 1 &&
          j < this.w - 1 &&
          this.thing[i + 1][j + 1].alive
        ) {
          livingNeighbors += 1;
        }
        //check bottom right
        if (i > 0 && j < this.w - 1 && this.thing[i - 1][j + 1].alive) {
          livingNeighbors += 1;
        }
        this.thing[i][j].livingNeighbors = livingNeighbors;
        livingNeighbors = 0;
      }
    }
  }

  setUp() {
    for (let i = 0; i < this.l; i++) {
      this.thing.push([]);
      for (let j = 0; j < this.w; j++) {
        this.thing[i][j] = new Cell({
          context: this.context,
          x: i,
          y: j,
          size: this.cellSize,
        });
      }
    }
  }
}
