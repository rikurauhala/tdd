import { Tetromino } from "./Tetromino.mjs";

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.resetBoard(width, height);
    this.falling = false;
    this.previousPosition = null;
    this.previousBlock = null;
    this.previousBlockWidth = null;
    this.previousBlockHeight = null;
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
    this.previousBlock = block;
    this.previousBlockWidth = block[0].length;
    this.previousBlockHeight = block.length;
    const startingCol = Math.floor((this.width - this.previousBlockWidth) / 2);
    const startingRow = 0;
    for (let row = 0; row < this.previousBlockWidth; row++) {
      for (let col = 0; col < this.previousBlockHeight; col++) {
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
    const blockWidth = this.previousBlock[0].length;

    if (!this.canMoveDown(currentRow, startingCol, blockWidth)) {
      this.falling = false;
      return;
    }
    this.moveBlockDown(currentRow, startingCol, blockWidth);
  }

  canMoveDown(currentRow, startingCol, blockWidth) {
    if (currentRow + blockWidth >= this.height) {
      return false;
    }
    for (let col = 0; col < blockWidth; col++) {
      if (this.board[currentRow + blockWidth][startingCol + col] !== ".") {
        return false;
      }
    }
    return true;
  }

  moveBlockDown(currentRow, startingCol, blockWidth) {
    for (let row = 0; row < blockWidth; row++) {
      for (let col = 0; col < blockWidth; col++) {
        this.board[currentRow + row][startingCol + col] = ".";
      }
    }

    const nextRow = currentRow + 1;
    for (let row = 0; row < blockWidth; row++) {
      for (let col = 0; col < blockWidth; col++) {
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
