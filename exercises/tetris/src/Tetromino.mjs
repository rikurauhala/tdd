import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  static T_SHAPE = new Tetromino(
    `.T.
     TTT
     ...`
  );

  constructor(shapeString) {
    this.shape = new RotatingShape(shapeString);
  }

  rotateRight() {
    return this.shape.rotateRight();
  }

  rotateLeft() {
    return this.shape.rotateLeft();
  }

  toString() {
    return this.shape.toString();
  }
}
