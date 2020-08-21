export class Cell {
  // Set the size for each cell

  constructor({ context, gridX, gridY, size, x, y, alive }) {
    this.context = context;

    // Store the position of this cell in the grid
    this.gridX = gridX;
    this.gridY = gridY;
    this.size = size;
    this.x = x;
    this.y = y;
    // Make  squares alive
    this.alive = alive;
  }

  findGridPosition({ pL, pT }) {
    this.gridX = this.x * this.size + pL + 1;
    this.gridY = this.y * this.size + pT + 1;
  }

  die() {
    this.alive = false;
  }
  resurrect() {
    this.alive = true;
  }
  draw({ pL, pT }) {
    // Draw a square, let the state determine the color
    this.findGridPosition({ pL, pT });
    let size = this.size - 2;
    console.log("test drawing:D");
    // this.alive = !this.alive;
    if (this.alive) {
      this.context.fillStyle = "red";
      this.context.fillRect(this.gridX, this.gridY, size, size);
    } else {
      this.context.clearRect(this.gridX, this.gridY, size, size);
    }
  }
}
