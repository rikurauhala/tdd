import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const item = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  NAMELESS: "",
};

const generateTest = (itemName, sellIn, quality, expectedSellIn, expectedQuality) => {
  test(`sellIn ${sellIn}, quality ${quality}`, () => {
    const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(itemName);
    expect(items[0].sellIn).to.equal(expectedSellIn);
    expect(items[0].quality).to.equal(expectedQuality);
  });
};

describe("Gilded Rose", () => {
  test("Empty Shop returns an empty list", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  describe(item.AGED_BRIE, () => {
    generateTest(item.AGED_BRIE, 0, 1, -1, 3);
    generateTest(item.AGED_BRIE, 0, 50, -1, 50);
  });

  describe(item.BACKSTAGE_PASSES, () => {
    generateTest(item.BACKSTAGE_PASSES, 0, -1, -1, 0);
    generateTest(item.BACKSTAGE_PASSES, 1, -1, 0, 2);
    generateTest(item.BACKSTAGE_PASSES, 6, 0, 5, 2);
    generateTest(item.BACKSTAGE_PASSES, 10, 0, 9, 2);
    generateTest(item.BACKSTAGE_PASSES, 11, 0, 10, 1);
    generateTest(item.BACKSTAGE_PASSES, 5, 49, 4, 50);
  });

  describe(item.SULFURAS, () => {
    generateTest(item.SULFURAS, -1, 3, -1, 3);
  });

  describe("nameless", () => {
    generateTest(item.NAMELESS, -1, 3, -2, 1);
    generateTest(item.NAMELESS, 0, 0, -1, 0);
  });
});
