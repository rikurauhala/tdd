import { Tetromino } from "./Tetromino.mjs";

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.resetBoard(width, height);
    this.falling = false;
    this.row = null;
    this.col = null;
    this.block = null;
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
    this.block = block;
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
    this.row = startingRow;
    this.col = startingCol;
  }

  tick() {
    if (!this.falling) {
      return;
    }
    if (!this.canMoveDown()) {
      this.falling = false;
      return;
    }
    this.moveBlockDown();
  }

  canMoveDown() {
    if (this.row + this.blockHeight >= this.height) {
      return false;
    }
    for (let col = 0; col < this.blockWidth; col++) {
      if (this.board[this.row + this.blockHeight][this.col + col] !== ".") {
        return false;
      }
    }
    return true;
  }

  moveBlockDown() {
    for (let row = 0; row < this.blockWidth; row++) {
      for (let col = 0; col < this.blockHeight; col++) {
        this.board[this.row + row][this.col + col] = ".";
      }
    }
    const nextRow = this.row + 1;
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[nextRow + row][this.col + col] = this.block[row][col];
      }
    }
    this.row = nextRow;
    this.col = this.col;
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
