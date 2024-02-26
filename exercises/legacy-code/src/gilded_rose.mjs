export const Items = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  NAMELESS: "",
};

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
          this.handleAgedBrie(item);
          break;
        case Items.BACKSTAGE_PASSES:
          this.handleBackstagePasses(item);
          break;
        case Items.SULFURAS:
          break;
        default:
          this.handleNormalItem(item);
          break;
      }

      if (item.name !== Items.SULFURAS) {
        item.sellIn--;
      }

      if (item.sellIn < 0) {
        this.handleExpiredItem(item);
      }
    });

    return this.items;
  }

  handleAgedBrie(item) {
    if (item.quality < MAX_QUALITY) {
      item.quality++;
    }
  }

  handleBackstagePasses(item) {
    if (item.quality >= MAX_QUALITY) {
      return;
    }
    item.quality++;
    if (item.sellIn < 11 && item.quality < MAX_QUALITY) {
      item.quality++;
    }
    if (item.sellIn < 6 && item.quality < MAX_QUALITY) {
      item.quality++;
    }
  }

  handleNormalItem(item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  handleExpiredItem(item) {
    if (item.name === Items.AGED_BRIE) {
      if (item.quality < MAX_QUALITY) {
        item.quality++;
      }
      return;
    }

    if (item.name === Items.BACKSTAGE_PASSES) {
      item.quality = 0;
      return;
    }

    if (item.name === Items.SULFURAS) {
      return;
    }

    if (item.quality > 0) {
      item.quality--;
    }
  }
}
