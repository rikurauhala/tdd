export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.resetBoard(width, height);
  }

  resetBoard(width, height) {
    return Array(height)
      .fill()
      .map(() => Array(width).fill("."));
  }

  drop(block) {
    this.board[0][1] = block;
  }

  toString() {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
