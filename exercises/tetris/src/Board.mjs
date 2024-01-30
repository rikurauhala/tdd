import { Tetromino } from "./Tetromino.mjs";

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
    const startingCol = Math.floor(this.width / 2);
    const size = block[0].length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        this.board[row][startingCol + col] = block[row][col];
      }
    }
    this.falling = true;
    this.previousPosition = [0, startingCol];
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
