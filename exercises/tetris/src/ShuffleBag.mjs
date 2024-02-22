export class ShuffleBag {
  constructor() {
    this.blocks = [];
    this.currentBlock = null;
    this.currentPosition = -1;
  }

  add(block, amount) {
    for (let i = 0; i < amount; i++) {
      this.blocks.push(block);
      this.currentPosition = this.blocks.length - 1;
    }
  }

  next() {
    if (this.currentPosition < 1) {
      this.currentPosition = this.blocks.length - 1;
      this.currentBlock = this.blocks[0];
      return this.blocks[0];
    }
    const position = Math.floor(Math.random() * this.currentPosition);
    this.currentBlock = this.blocks[position];
    this.blocks[position] = this.blocks[this.currentPosition];
    this.blocks[this.currentPosition] = this.currentBlock;
    this.currentPosition -= 1;
    return this.currentBlock;
  }

  size() {
    return this.blocks.length;
  }
}
