import { Shape } from "./Shape";
import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  static I_SHAPE = new Tetromino(Shape.I_SHAPE[0]);
  static O_SHAPE = new Tetromino(Shape.O_SHAPE[0]);
  static T_SHAPE = new Tetromino(Shape.T_SHAPE[0]);

  constructor(shapeString, letter = null, rotation = 0) {
    const possibleRotations = {
      I: Shape.I_SHAPE.length,
      O: Shape.O_SHAPE.length,
      T: Shape.T_SHAPE.length,
    };
    this.letter = letter ? letter : this.determineLetter(shapeString);
    this.rotations = possibleRotations[this.letter];
    this.rotation = rotation;
    this.shape = new RotatingShape(Shape.getRotation(Shape.getShape(this.letter), this.rotation));
  }

  determineLetter(shapeString) {
    return ["I", "O", "T"].find((shape) => shapeString.includes(shape));
  }

  rotateRight() {
    return new Tetromino(this.shape.toString(), this.letter, (this.rotation + 1) % this.rotations);
  }

  rotateLeft() {
    return new Tetromino(this.shape.toString(), this.letter, (this.rotation - 1 + this.rotations) % this.rotations);
  }

  toString() {
    return this.shape.toString();
  }
}
