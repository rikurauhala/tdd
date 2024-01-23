export class RotatingShape {
  constructor(shapeString) {
    this.shape = this.parseShapeString(shapeString);
  }

  parseShapeString(shapeString) {
    return shapeString.split("\n").map((row) => row.trim().split(""));
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
