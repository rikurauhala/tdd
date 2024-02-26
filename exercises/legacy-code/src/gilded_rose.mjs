export const Items = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  CONJURED: "Conjured item",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  NAMELESS: "other",
};

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case Items.AGED_BRIE:
          this.updateAgedBrieQuality(item);
          break;
        case Items.BACKSTAGE_PASSES:
          this.updateBackstagePassesQuality(item);
          break;
        case Items.CONJURED:
          this.updateConjuredItemQuality(item);
          break;
        case Items.SULFURAS:
          break;
        default:
          this.updateNormalItemQuality(item);
          break;
      }

      if (item.name !== Items.SULFURAS) {
        item.sellIn--;
      }

      if (item.sellIn < 0) {
        this.updateExpiredItemQuality(item);
      }
    });

    return this.items;
  }

  updateAgedBrieQuality(item) {
    if (item.quality < MAX_QUALITY) {
      item.quality++;
    }
  }

  updateBackstagePassesQuality(item) {
    item.quality++;
    if (item.sellIn < 11 && item.quality < MAX_QUALITY) {
      item.quality++;
    }
    if (item.sellIn < 6 && item.quality < MAX_QUALITY) {
      item.quality++;
    }
  }

  updateConjuredItemQuality(item) {
    if (item.quality > MIN_QUALITY) {
      item.quality -= 2;
    }
  }

  updateNormalItemQuality(item) {
    if (item.quality > MIN_QUALITY) {
      item.quality--;
    }
  }

  updateExpiredItemQuality(item) {
    if (item.name === Items.AGED_BRIE) {
      if (item.quality < MAX_QUALITY) {
        item.quality++;
      }
      return;
    }

    if (item.name === Items.BACKSTAGE_PASSES) {
      item.quality = MIN_QUALITY;
      return;
    }

    if (item.name === Items.SULFURAS) {
      return;
    }

    if (item.quality > MIN_QUALITY) {
      item.quality--;
    }
  }
}
