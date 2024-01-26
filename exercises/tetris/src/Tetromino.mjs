import { Shape } from "./Shape";
import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  static I_SHAPE = new Tetromino(Shape.I_SHAPE[0]);
  static T_SHAPE = new Tetromino(Shape.T_SHAPE[0]);

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
