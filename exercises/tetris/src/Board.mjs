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
    this.blockString = null;
    this.blockWidth = null;
    this.blockHeight = null;
  }

  resetBoard(width, height) {
    return Array(height)
      .fill()
      .map(() => Array(width).fill("."));
  }

  clearBlock() {
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = ".";
      }
    }
  }

  drop(block) {
    if (this.falling) {
      throw new Error("already falling");
    }
    if (block instanceof Tetromino) {
      this.block = block;
      block = this.stripEmptyRows(block);
    }
    this.updateBlock(block);
    this.row = 0;
    this.col = Math.floor((this.boardWidth - this.blockWidth) / 2);
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = block[row][col];
      }
    }
    this.falling = true;
  }

  stripEmptyRows(block) {
    return block
      .toString()
      .split("\n")
      .filter((row) => !/^\.*$/.test(row.trim()));
  }

  stripEmpty(block) {
    if (typeof block === "string") {
      block = block.split("\n");
    }
    const nonEmptyRows = block.filter((row) => row.trim() !== "");
    const nonEmptyCols = Array.from({ length: block[0].length }, (_, col) =>
      nonEmptyRows.some((row) => row[col] !== ".")
    );
    const strippedBlock = nonEmptyRows.map((row) =>
      row
        .split("")
        .filter((_, col) => nonEmptyCols[col])
        .join("")
    );
    return strippedBlock;
  }

  updateBlock(blockString) {
    this.blockString = blockString;
    this.blockWidth = blockString[0].length;
    this.blockHeight = blockString.length;
  }

  moveBlock() {
    for (let row = 0; row < this.blockHeight; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        this.board[this.row + row][this.col + col] = this.blockString[row][col];
      }
    }
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
    this.clearBlock();
    this.row += 1;
    this.moveBlock();
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
    this.clearBlock();
    this.col -= 1;
    this.moveBlock();
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
    this.clearBlock();
    this.col += 1;
    this.moveBlock();
  }

  rotateLeft() {
    this.clearBlock();
    this.block = this.block.rotateLeft();
    this.blockString = this.stripEmptyRows(this.block.toString());
    this.updateBlock(this.blockString);
    this.moveBlock();
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
