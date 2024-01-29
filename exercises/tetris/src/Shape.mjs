export class Shape {
  static I_SHAPE = {
    letter: "I",
    size: 5,
    rotations: [
      `.....
       .....
       IIII.
       .....
       .....`,
      `..I..
       ..I..
       ..I..
       ..I..
       .....`,
    ],
  };

  static O_SHAPE = {
    letter: "O",
    size: 3,
    rotations: [
      `.OO
       .OO
       ...`,
    ],
  };

  static T_SHAPE = {
    letter: "T",
    size: 3,
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
    const shapes = { I: Shape.I_SHAPE, O: Shape.O_SHAPE, T: Shape.T_SHAPE };
    return shapes[letter];
  }

  static getRotation(shape, rotation) {
    const rotations = shape.rotations.length;
    const normalizedRotation = ((rotation % rotations) + rotations) % rotations;
    return shape.rotations[normalizedRotation];
  }
}
