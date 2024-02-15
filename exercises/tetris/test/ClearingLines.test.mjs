import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Clearing lines works for", () => {
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
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       .........I
       .........I
       .........I
       .........I
       XXXXXXXXX.`
    );
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .........I
       .........I
       .........I
       XXXXXXXXXI`
    );
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .........I
       .........I
       .........I`
    );
  });

  test("two lines", () => {
    for (let row = 4; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        board.board[row][col] = "X";
      }
    }
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       .........I
       .........I
       .........I
       XXXXXXXXXI
       XXXXXXXXX.`
    );
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .........I
       .........I
       XXXXXXXXXI
       XXXXXXXXXI`
    );
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .........I
       .........I`
    );
  });

  test("three lines", () => {
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        board.board[row][col] = "X";
      }
    }
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       .........I
       .........I
       XXXXXXXXXI
       XXXXXXXXXI
       XXXXXXXXX.`
    );
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .........I
       XXXXXXXXXI
       XXXXXXXXXI
       XXXXXXXXXI`
    );
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       .........I`
    );
  });
});
