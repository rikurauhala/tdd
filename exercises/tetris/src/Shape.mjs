export class Shape {
  static I_SHAPE = {
    letter: "I",
    rotations: [
      `....
       IIII
       ....
       ....`,
      `..I.
       ..I.
       ..I.
       ..I.`,
    ],
  };

  static O_SHAPE = {
    letter: "O",
    rotations: [
      `.OO
       .OO
       ...`,
    ],
  };

  static T_SHAPE = {
    letter: "T",
    rotations: [
      `.T.
       TTT
       ...`,
      `.T.
       .TT
       .T.`,
      `...
       TTT
       .T.`,
      `.T.
       TT.
       .T.`,
    ],
  };

  static getShape(letter) {
    const shapes = Object.fromEntries(Object.values(Shape).map((shape) => [shape.letter, shape]));
    return shapes[letter];
  }

  static getLetters() {
    return Object.values(Shape).map((shape) => shape.letter);
  }

  static getRotation(shape, rotation) {
    const rotations = shape.rotations.length;
    const normalizedRotation = ((rotation % rotations) + rotations) % rotations;
    return shape.rotations[normalizedRotation];
  }
}
