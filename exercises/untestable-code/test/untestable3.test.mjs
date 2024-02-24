import { expect } from "chai";
import { unlink, writeFile } from "node:fs/promises";
import { afterEach, beforeEach, describe, test } from "vitest";
import { parsePeopleCsv } from "../src/testable3.mjs";

describe("Testable 3: parsePeopleCsv", () => {
  const testFilePath = "test_people.csv";

  beforeEach(async () => {
    const csvContent = "Loid,Forger,,Male\nAnya,Forger,6,Female\nYor,Forger,27,Female";
    await writeFile(testFilePath, csvContent, { encoding: "utf8" });
  });

  afterEach(async () => {
    await unlink(testFilePath);
  });

  test("returns an array of objects", async () => {
    const result = await parsePeopleCsv(testFilePath);
    expect(result).to.be.an("array");
    expect(result).to.have.lengthOf(3);
    expect(result[0]).to.deep.equal({ firstName: "Loid", lastName: "Forger", gender: "m" });
    expect(result[1]).to.deep.equal({ firstName: "Anya", lastName: "Forger", age: 6, gender: "f" });
    expect(result[2]).to.deep.equal({ firstName: "Yor", lastName: "Forger", age: 27, gender: "f" });
  });

  test("returns an empty array if the file does not exist", async () => {
    const result = await parsePeopleCsv();
    expect(result).to.be.an("array");
    expect(result).to.have.lengthOf(0);
    expect(result).to.deep.equal([]);
  });
});
