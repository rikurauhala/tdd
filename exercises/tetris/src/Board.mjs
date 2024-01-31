import { Tetromino } from "./Tetromino.mjs";

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.resetBoard(width, height);
    this.falling = false;
    this.previousPosition = null;
    this.previousBlock = null;
    this.previousLetter = null;
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
    if (block instanceof Tetromino) {
      this.previousLetter = block.letter;
      block = block
        .toString()
        .split("\n")
        .filter((row) => row);
    } else {
      this.previousLetter = block;
    }
    const blockWidth = block[0].length;
    const startingCol = Math.floor((this.width - blockWidth) / 2);
    const startingRow = 0;
    for (let row = 0; row < blockWidth; row++) {
      for (let col = 0; col < blockWidth; col++) {
        this.board[startingRow + row][startingCol + col] = block[row][col];
      }
    }
    this.falling = true;
    this.previousPosition = [startingRow, startingCol];
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
