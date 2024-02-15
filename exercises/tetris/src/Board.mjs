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
    this.clearLines();
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
      return;
    }
    this.clearBlock();
    this.col += 1;
    this.moveBlock();
  }

  canBeRotated(direction) {
    const occupiedCells = this.getOccupiedCells();
    const rotatedBlock = this.getRotatedBlock(
      direction === "left" ? this.block.rotateLeft() : this.block.rotateRight()
    );
    for (let row = 0; row < rotatedBlock.length; row++) {
      for (let col = 0; col < rotatedBlock[0].length; col++) {
        const cell = [row, col];
        const isOccupied = this.isCellOccupied(cell, occupiedCells);
        const isBlockLetter = rotatedBlock[row][col] === this.block.letter;
        if (isOccupied && isBlockLetter) {
          return false;
        }
      }
    }
    return true;
  }

  getOccupiedCells() {
    const occupiedCells = [];
    for (let row = 0; row < this.blockHeight + 1; row++) {
      for (let col = 0; col < this.blockWidth; col++) {
        const boardCell = this.board[this.row + row][this.col + col];
        if (boardCell !== this.block.letter && boardCell !== ".") {
          occupiedCells.push([row, col]);
        }
      }
    }
    return occupiedCells;
  }

  getRotatedBlock(block) {
    return block
      .toString()
      .split("\n")
      .map((line) => line.split(""))
      .filter((line) => line.length > 0);
  }

  isCellOccupied(cell, occupiedCells) {
    return occupiedCells.some(
      (occupiedCell) =>
        occupiedCell.length === cell.length && occupiedCell.every((value, index) => value === cell[index])
    );
  }

  rotateLeft() {
    if (!this.canBeRotated("left")) return;
    this.clearBlock();
    this.block = this.block.rotateLeft();
    this.blockString = this.stripEmptyRows(this.block.toString());
    this.updateBlock(this.blockString);
    this.moveBlock();
  }

  canBeRotatedRight() {
    return true;
  }

  rotateRight() {
    if (!this.canBeRotated("right")) return;
    this.clearBlock();
    this.block = this.block.rotateRight();
    this.blockString = this.stripEmptyRows(this.block.toString());
    this.updateBlock(this.blockString);
    this.moveBlock();
  }

  clearLines() {
    // implement
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
