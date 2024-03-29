import { Shape } from "./Shape";
import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  static I_SHAPE = new Tetromino(Shape.I_SHAPE.rotations[0]);
  static J_SHAPE = new Tetromino(Shape.J_SHAPE.rotations[0]);
  static L_SHAPE = new Tetromino(Shape.L_SHAPE.rotations[0]);
  static O_SHAPE = new Tetromino(Shape.O_SHAPE.rotations[0]);
  static S_SHAPE = new Tetromino(Shape.S_SHAPE.rotations[0]);
  static T_SHAPE = new Tetromino(Shape.T_SHAPE.rotations[0]);
  static Z_SHAPE = new Tetromino(Shape.Z_SHAPE.rotations[0]);

  constructor(shapeString, rotation = 0) {
    this.letter = this.determineLetter(shapeString);
    this.rotations = Shape.getShape(this.letter).rotations.length;
    this.rotation = rotation;
    this.shape = new RotatingShape(Shape.getRotation(Shape.getShape(this.letter), this.rotation));
  }

  determineLetter(shapeString) {
    return Shape.getLetters().find((shape) => shapeString.includes(shape));
  }

  rotateRight() {
    return new Tetromino(this.shape.toString(), (this.rotation + 1) % this.rotations);
  }

  rotateLeft() {
    return new Tetromino(this.shape.toString(), (this.rotation - 1 + this.rotations) % this.rotations);
  }

  toString() {
    return this.shape.toString();
  }
}
