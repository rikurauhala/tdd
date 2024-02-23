import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("diceHandValue ", () => {
  const allowedValues = [101, 102, 103, 104, 105, 106, 2, 3, 4, 5, 6];

  test("returns only allowed values with default random generator", () => {
    const allValues = new Set();
    for (let i = 0; i < 10000; i++) {
      allValues.add(diceHandValue());
    }
    expect([...allValues].sort()).to.deep.equal(allowedValues);
  });

  test("returns allowed values for a pair with custom random generator", () => {
    for (let number = 1; number <= 6; number++) {
      const result = diceHandValue(
        () => number,
        () => number,
      );
      expect(result).to.equal(100 + number);
    }
  });

  test("returns allowed values for each possible combination", () => {
    const results = [];
    for (let die1 = 1; die1 <= 6; die1++) {
      for (let die2 = 1; die2 <= 6; die2++) {
        results.push(
          diceHandValue(
            () => die1,
            () => die2,
          ),
        );
      }
    }
    const uniqueResults = [...new Set(results)].sort();
    expect(uniqueResults).to.deep.equal(allowedValues);
  });
});
