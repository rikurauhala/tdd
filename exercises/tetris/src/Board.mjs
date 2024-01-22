export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.generateGrid(width, height);
  }

  generateGrid(width, height) {
    // todo
  }

  toString() {
    return "...\n...\n...\n";
  }
}
