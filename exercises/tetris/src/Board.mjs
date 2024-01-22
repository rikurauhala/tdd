export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.resetBoard(width, height);
  }

  resetBoard(width, height) {
    // todo
  }

  toString() {
    return "...\n...\n...\n";
  }
}
