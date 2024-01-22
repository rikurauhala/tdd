export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.resetBoard(width, height);
    this.previousPosition = null;
  }

  resetBoard(width, height) {
    return Array(height)
      .fill()
      .map(() => Array(width).fill("."));
  }

  drop(block) {
    this.board[0][1] = block;
    this.previousPosition = [0, 1];
  }

  tick() {
    const [row, column] = this.previousPosition;
    this.board[row][column] = ".";
    this.board[row + 1][column] = "X";
    this.previousPosition = [row + 1, column];
  }

  toString() {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
