import { Shape } from "./Shape";
import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  static I_SHAPE = new Tetromino(Shape.I_SHAPE[0]);
  static T_SHAPE = new Tetromino(Shape.T_SHAPE[0]);

  constructor(shapeString) {
    const possibleRotations = { I: 2, T: 4 };
    const letter = this.determineLetter(shapeString);
    this.rotations = possibleRotations[letter];
    this.shape = new RotatingShape(shapeString);
  }

  determineLetter(shapeString) {
    return ["I", "T"].find((shape) => shapeString.includes(shape));
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
