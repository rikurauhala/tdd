import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Falling T shape tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });

  describe("can be moved left", () => {
    test("once", () => {
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `...T......
         ..TTT.....
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("twice", () => {
      board.moveLeft();
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `..T.......
         .TTT......
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("three times", () => {
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("is not possible beyond the board", () => {
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
      );
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
      );
    });
  });

  describe("can be moved right", () => {
    test("once", () => {
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `.....T....
         ....TTT...
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test.skip("twice", () => {
      board.moveRight();
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `......T...
         .....TTT..
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test.skip("three times", () => {
      board.moveRight();
      board.moveRight();
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `.......T..
         ......TTT.
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test.skip("four times", () => {
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test.skip("is not possible beyond the board", () => {
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
      );
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
      );
    });
  });
});
