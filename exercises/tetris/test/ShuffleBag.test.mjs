import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Shuffle bag", () => {
  const tetrominoes = [
    Tetromino.I_SHAPE,
    Tetromino.J_SHAPE,
    Tetromino.L_SHAPE,
    Tetromino.O_SHAPE,
    Tetromino.S_SHAPE,
    Tetromino.T_SHAPE,
    Tetromino.Z_SHAPE,
  ];
  const amount = 10;

  let shuffleBag;
  beforeEach(() => {
    shuffleBag = new ShuffleBag();
    tetrominoes.forEach((tetromino) => {
      shuffleBag.add(tetromino, amount);
    });
  });

  test("is empty before tetrominoes are added", () => {
    expect(new ShuffleBag().size()).to.equal(0);
  });

  test("has the correct total number of tetrominoes", () => {
    expect(shuffleBag.size()).to.equal(tetrominoes.length * amount);
  });

  test("returns all tetrominoes", () => {
    const returnedTetrominoes = [];
    for (let i = 0; i < tetrominoes.length * amount; i++) {
      returnedTetrominoes.push(shuffleBag.next());
    }
    expect(new Set(returnedTetrominoes).size).to.equal(tetrominoes.length);
    expect(returnedTetrominoes).to.have.members(tetrominoes.flatMap((tetromino) => Array(amount).fill(tetromino)));
  });

  test("returns tetrominoes in a random order", () => {
    const returnedTetrominoes = [];
    for (let i = 0; i < tetrominoes.length * amount; i++) {
      returnedTetrominoes.push(shuffleBag.next());
    }
    expect(returnedTetrominoes).not.to.equal(tetrominoes.flatMap((tetromino) => Array(amount).fill(tetromino)));
  });
});
