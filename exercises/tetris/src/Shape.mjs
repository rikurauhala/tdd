export class Shape {
  static I_SHAPE = [
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
  ];

  static O_SHAPE = [
    `.OO
     .OO
     ...`,
  ];

  static T_SHAPE = [
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
  ];

  static getShape(letter) {
    const shapes = { I: Shape.I_SHAPE, O: Shape.O_SHAPE, T: Shape.T_SHAPE };
    return shapes[letter];
  }

  static getRotation(shape, rotation) {
    const rotations = shape.length;
    const normalizedRotation = ((rotation % rotations) + rotations) % rotations;
    return shape[normalizedRotation];
  }
}
