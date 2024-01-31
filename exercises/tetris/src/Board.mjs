import { Tetromino } from "./Tetromino.mjs";

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.resetBoard(width, height);
    this.falling = false;
    this.previousPosition = null;
    this.previousBlock = null;
    this.blockWidth = null;
    this.blockHeight = null;
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
      block = block
        .toString()
        .split("\n")
        .filter((row) => !/^\.*$/.test(row.trim()));
    }
    this.previousBlock = block;
    this.blockWidth = block[0].length;
    this.blockHeight = block.length;
    const startingCol = Math.floor((this.width - this.blockWidth) / 2);
    const startingRow = 0;
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[startingRow + row][startingCol + col] = block[row][col];
      }
    }
    this.falling = true;
    this.previousPosition = [startingRow, startingCol];
  }

  tick() {
    if (!this.falling) {
      return;
    }
    const [currentRow, startingCol] = this.previousPosition;
    if (!this.canMoveDown(currentRow, startingCol)) {
      this.falling = false;
      return;
    }
    this.moveBlockDown(currentRow, startingCol);
  }

  canMoveDown(currentRow, startingCol) {
    if (currentRow + this.blockHeight >= this.height) {
      return false;
    }
    for (let col = 0; col < this.blockWidth; col++) {
      if (this.board[currentRow + this.blockHeight][startingCol + col] !== ".") {
        return false;
      }
    }
    return true;
  }

  moveBlockDown(currentRow, startingCol) {
    for (let row = 0; row < this.blockWidth; row++) {
      for (let col = 0; col < this.blockHeight; col++) {
        this.board[currentRow + row][startingCol + col] = ".";
      }
    }

    const nextRow = currentRow + 1;
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[nextRow + row][startingCol + col] = this.previousBlock[row][col];
      }
    }

    this.previousPosition = [nextRow, startingCol];
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
