import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Items, Shop } from "../src/gilded_rose.mjs";

const generateTest = ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
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

  describe(Items.AGED_BRIE, () => {
    generateTest({
      itemName: Items.AGED_BRIE,
      sellIn: 0,
      quality: 1,
      expectedSellIn: -1,
      expectedQuality: 3,
    });
    generateTest({
      itemName: Items.AGED_BRIE,
      sellIn: 0,
      quality: 50,
      expectedSellIn: -1,
      expectedQuality: 50,
    });
  });

  describe(Items.BACKSTAGE_PASSES, () => {
    generateTest({
      itemName: Items.BACKSTAGE_PASSES,
      sellIn: 0,
      quality: -1,
      expectedSellIn: -1,
      expectedQuality: 0,
    });
    generateTest({
      itemName: Items.BACKSTAGE_PASSES,
      sellIn: 1,
      quality: -1,
      expectedSellIn: 0,
      expectedQuality: 2,
    });
    generateTest({
      itemName: Items.BACKSTAGE_PASSES,
      sellIn: 5,
      quality: 49,
      expectedSellIn: 4,
      expectedQuality: 50,
    });
    generateTest({
      itemName: Items.BACKSTAGE_PASSES,
      sellIn: 6,
      quality: 0,
      expectedSellIn: 5,
      expectedQuality: 2,
    });
    generateTest({
      itemName: Items.BACKSTAGE_PASSES,
      sellIn: 10,
      quality: 0,
      expectedSellIn: 9,
      expectedQuality: 2,
    });
    generateTest({
      itemName: Items.BACKSTAGE_PASSES,
      sellIn: 11,
      quality: 0,
      expectedSellIn: 10,
      expectedQuality: 1,
    });
  });

  describe(Items.CONJURED, () => {
    generateTest({
      itemName: Items.CONJURED,
      sellIn: 1,
      quality: 3,
      expectedSellIn: 0,
      expectedQuality: 1,
    });
  });

  describe(Items.SULFURAS, () => {
    generateTest({
      itemName: Items.SULFURAS,
      sellIn: -1,
      quality: 3,
      expectedSellIn: -1,
      expectedQuality: 3,
    });
  });

  describe("nameless", () => {
    generateTest({
      itemName: Items.NAMELESS,
      sellIn: -1,
      quality: 3,
      expectedSellIn: -2,
      expectedQuality: 1,
    });
    generateTest({
      itemName: Items.NAMELESS,
      sellIn: 0,
      quality: 0,
      expectedSellIn: -1,
      expectedQuality: 0,
    });
  });
});
