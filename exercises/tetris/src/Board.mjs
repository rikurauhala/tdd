import { Tetromino } from "./Tetromino.mjs";

export class Board {
  constructor(width, height) {
    this.board = this.resetBoard(width, height);
    this.boardWidth = width;
    this.boardHeight = height;
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
    this.row = 0;
    this.col = Math.floor((this.boardWidth - this.blockWidth) / 2);
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = block[row][col];
      }
    }
    this.falling = true;
  }

  tick() {
    if (!this.falling) {
      return;
    }
    this.moveDown();
  }

  canMoveDown() {
    if (this.row + this.blockHeight >= this.boardHeight) {
      return false;
    }
    for (let col = 0; col < this.blockWidth; col++) {
      if (this.board[this.row + this.blockHeight][this.col + col] !== ".") {
        return false;
      }
    }
    return true;
  }

  moveDown() {
    if (!this.canMoveDown()) {
      this.falling = false;
      return;
    }
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = ".";
      }
    }
    this.row += 1;
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = this.block[row][col];
      }
    }
  }

  canMoveLeft() {
    if (this.col === 0) {
      return false;
    }
    for (let row = 0; row < this.blockHeight; row++) {
      if (this.board[this.row + row][this.col - 1] !== ".") {
        return false;
      }
    }
    return true;
  }

  moveLeft() {
    if (!this.canMoveLeft()) {
      this.falling = false;
      return;
    }
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = ".";
      }
    }
    this.col -= 1;
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = this.block[row][col];
      }
    }
  }

  canMoveRight() {
    if (this.col + this.blockWidth >= this.boardWidth) {
      return false;
    }
    for (let row = 0; row < this.blockHeight; row++) {
      if (this.board[this.row + row][this.col + this.blockWidth] !== ".") {
        return false;
      }
    }
    return true;
  }

  moveRight() {
    if (!this.canMoveRight()) {
      this.falling = false;
      return;
    }
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = ".";
      }
    }
    this.col += 1;
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = this.block[row][col];
      }
    }
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
