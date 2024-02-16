import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Scoring works for", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    for (let col = 0; col < 6; col++) {
      board.moveRight();
    }
  });

  test("one line", () => {
    for (let col = 0; col < 9; col++) {
      board.board[5][col] = "X";
    }
    expect(board.getScore()).to.equal(0);
    board.tick();
    board.tick();
    board.tick();
    expect(board.getScore()).to.equal(50);
  });

  test("two lines", () => {
    for (let row = 4; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        board.board[row][col] = "X";
      }
    }
    expect(board.getScore()).to.equal(0);
    board.tick();
    board.tick();
    board.tick();
    expect(board.getScore()).to.equal(100);
  });

  test("three lines", () => {
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        board.board[row][col] = "X";
      }
    }
    expect(board.getScore()).to.equal(0);
    board.tick();
    board.tick();
    board.tick();
    expect(board.getScore()).to.equal(300);
  });

  test("four lines (Tetris)", () => {
    for (let row = 2; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        board.board[row][col] = "X";
      }
    }
    expect(board.getScore()).to.equal(0);
    board.tick();
    board.tick();
    board.tick();
    expect(board.getScore()).to.equal(1200);
  });
});
