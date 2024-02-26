import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const item = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  OTHER: "other",
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
    generateTest(item.AGED_BRIE, -1, -1, -2, 1);
    generateTest(item.AGED_BRIE, -1, 0, -2, 2);
    generateTest(item.AGED_BRIE, -1, 1, -2, 3);
    generateTest(item.AGED_BRIE, 0, -1, -1, 1);
    generateTest(item.AGED_BRIE, 1, -1, 0, 0);
    generateTest(item.AGED_BRIE, 0, 0, -1, 2);
    generateTest(item.AGED_BRIE, 0, 1, -1, 3);
    generateTest(item.AGED_BRIE, 0, 49, -1, 50);
    generateTest(item.AGED_BRIE, 0, 50, -1, 50);
    generateTest(item.AGED_BRIE, 0, 51, -1, 51);
  });

  describe(item.BACKSTAGE_PASSES, () => {
    generateTest(item.BACKSTAGE_PASSES, -1, -1, -2, 0);
    generateTest(item.BACKSTAGE_PASSES, -1, 0, -2, 0);
    generateTest(item.BACKSTAGE_PASSES, -1, 1, -2, 0);
    generateTest(item.BACKSTAGE_PASSES, 0, 0, -1, 0);
    generateTest(item.BACKSTAGE_PASSES, 0, -1, -1, 0);
    generateTest(item.BACKSTAGE_PASSES, 1, -1, 0, 2);
    generateTest(item.BACKSTAGE_PASSES, 5, 0, 4, 3);
    generateTest(item.BACKSTAGE_PASSES, 6, 0, 5, 2);
    generateTest(item.BACKSTAGE_PASSES, 7, 0, 6, 2);
    generateTest(item.BACKSTAGE_PASSES, 10, 0, 9, 2);
    generateTest(item.BACKSTAGE_PASSES, 11, 0, 10, 1);
    generateTest(item.BACKSTAGE_PASSES, 5, 49, 4, 50);
    generateTest(item.BACKSTAGE_PASSES, 5, 50, 4, 50);
    generateTest(item.BACKSTAGE_PASSES, 5, 51, 4, 51);
    generateTest(item.BACKSTAGE_PASSES, 10, 49, 9, 50);
    generateTest(item.BACKSTAGE_PASSES, 10, 50, 9, 50);
    generateTest(item.BACKSTAGE_PASSES, 10, 51, 9, 51);
  });

  describe(item.SULFURAS, () => {
    generateTest(item.SULFURAS, -1, 0, -1, 0);
    generateTest(item.SULFURAS, -1, -1, -1, -1);
    generateTest(item.SULFURAS, -1, 3, -1, 3);
    generateTest(item.SULFURAS, 0, -1, 0, -1);
    generateTest(item.SULFURAS, 1, -1, 1, -1);
    generateTest(item.SULFURAS, 0, 0, 0, 0);
    generateTest(item.SULFURAS, 0, 1, 0, 1);
    generateTest(item.SULFURAS, 50, 1, 50, 1);
  });

  describe(item.OTHER, () => {
    generateTest(item.OTHER, -1, -1, -2, -1);
    generateTest(item.OTHER, -1, 1, -2, 0);
    generateTest(item.OTHER, -1, 3, -2, 1);
    generateTest(item.OTHER, 0, -1, -1, -1);
    generateTest(item.OTHER, 1, -1, 0, -1);
    generateTest(item.OTHER, 0, 0, -1, 0);
    generateTest(item.OTHER, 0, 1, -1, 0);
    generateTest(item.OTHER, 1, 1, 0, 0);
  });

  describe("nameless", () => {
    generateTest(item.NAMELESS, -1, -1, -2, -1);
    generateTest(item.NAMELESS, -1, 0, -2, 0);
    generateTest(item.NAMELESS, -1, 1, -2, 0);
    generateTest(item.NAMELESS, -1, 3, -2, 1);
    generateTest(item.NAMELESS, 0, -1, -1, -1);
    generateTest(item.NAMELESS, 1, -1, 0, -1);
    generateTest(item.NAMELESS, 0, 0, -1, 0);
    generateTest(item.NAMELESS, 0, 1, -1, 0);
  });
});
