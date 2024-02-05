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

  describe("can be rotated left", () => {
    test("once", () => {
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });

    test("twice", () => {
      board.rotateLeft();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
        `...TTT....
         ....T.....
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test.skip("3 times", () => {
      board.rotateLeft();
      board.rotateLeft();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });
  });
});
