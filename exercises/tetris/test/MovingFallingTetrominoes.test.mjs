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
  });

  describe("cannot be moved left", () => {
    test("beyond the board", () => {
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

    test("through other blocks", () => {
      board.board[0][1] = "X";
      board.board[1][1] = "X";
      expect(board.toString()).to.equalShape(
        `.X..T.....
         .X.TTT....
         ..........
         ..........
         ..........
         ..........`
      );
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `.X.T......
         .XTTT.....
         ..........
         ..........
         ..........
         ..........`
      );
      expect(board.hasFalling()).toBe(true);
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `.X.T......
         .XTTT.....
         ..........
         ..........
         ..........
         ..........`
      );
      expect(board.hasFalling()).toBe(true);
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

    test("twice", () => {
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

    test("three times", () => {
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

    test("four times", () => {
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
      expect(board.hasFalling()).toBe(true);
    });
  });

  describe("cannot be moved right", () => {
    test("beyond the board", () => {
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
      expect(board.hasFalling()).toBe(true);
    });

    test("through other blocks", () => {
      board.board[0][8] = "X";
      board.board[1][8] = "X";
      expect(board.toString()).to.equalShape(
        `....T...X.
         ...TTT..X.
         ..........
         ..........
         ..........
         ..........`
      );
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `.....T..X.
         ....TTT.X.
         ..........
         ..........
         ..........
         ..........`
      );
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `......T.X.
         .....TTTX.
         ..........
         ..........
         ..........
         ..........`
      );
      expect(board.hasFalling()).toBe(true);
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `......T.X.
         .....TTTX.
         ..........
         ..........
         ..........
         ..........`
      );
      expect(board.hasFalling()).toBe(true);
    });
  });

  describe("can be moved down", () => {
    test("once", () => {
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TTT....
         ..........
         ..........
         ..........`
      );
    });

    test("twice", () => {
      board.moveDown();
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....
         ..........
         ..........`
      );
    });

    test("three times", () => {
      board.moveDown();
      board.moveDown();
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....T.....
         ...TTT....
         ..........`
      );
    });

    test("four times", () => {
      board.moveDown();
      board.moveDown();
      board.moveDown();
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
      );
    });
  });

  describe("cannot be moved down", () => {
    test("beyond the board", () => {
      board.moveDown();
      board.moveDown();
      board.moveDown();
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
      );
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
      );
      expect(board.hasFalling()).toBe(false);
    });

    test("through other blocks", () => {
      board.board[3][3] = "X";
      board.board[3][4] = "X";
      board.board[3][5] = "X";
      expect(board.toString()).to.equalShape(
        `....T.....
         ...TTT....
         ..........
         ...XXX....
         ..........
         ..........`
      );
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TTT....
         ...XXX....
         ..........
         ..........`
      );
      expect(board.hasFalling()).toBe(true);
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TTT....
         ...XXX....
         ..........
         ..........`
      );
      expect(board.hasFalling()).toBe(false);
    });
  });
});
