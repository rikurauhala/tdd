import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/testable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("returns a number", () => {
    const days = daysUntilChristmas();
    expect(days).to.be.a("number");
  });

  test("calculates days until Christmas for the current year", () => {
    const date = new Date(2023, 11, 1);
    const days = daysUntilChristmas(date);
    expect(days).to.equal(24);
  });

  test("calculates days until Christmas for the next year", () => {
    const date = new Date(2023, 11, 26);
    const days = daysUntilChristmas(date);
    expect(days).to.equal(365);
  });
});
