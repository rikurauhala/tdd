export class RotatingShape {
  constructor(shapeString) {
    this.shape = this.parseShapeString(shapeString);
  }

  parseShapeString(shapeString) {
    return shapeString.split("\n").map((row) => row.trim().split(""));
  }

  rotateRight() {
    const rotatedShape = this.shape[0].map((_, col) => this.shape.map((row) => row[col]).reverse());
    return new RotatingShape(rotatedShape.map((row) => row.join("")).join("\n"));
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
