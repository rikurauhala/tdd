export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.resetBoard(width, height);
    this.falling = false;
    this.previousPosition = null;
    this.previousBlock = null;
  }

  resetBoard(width, height) {
    return Array(height)
      .fill()
      .map(() => Array(width).fill("."));
  }

  drop(block) {
    if (this.falling) {
      throw new Error("already falling");
    }
    this.board[0][1] = block;
    this.falling = true;
    this.previousPosition = [0, 1];
    this.previousBlock = block;
  }

  tick() {
    const [row, column] = this.previousPosition;
    const nextRow = row + 1;
    if (nextRow < this.height && this.board[nextRow][column] === ".") {
      this.board[row][column] = ".";
      this.board[nextRow][column] = this.previousBlock;
      this.previousPosition = [nextRow, column];
    } else {
      this.falling = false;
    }
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
