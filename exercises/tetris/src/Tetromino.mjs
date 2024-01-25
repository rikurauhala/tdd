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

  toString() {
    return this.shape.toString();
  }
}
