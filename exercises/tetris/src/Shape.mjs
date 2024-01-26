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

  static returnShape(letter) {
    const shapes = { I: Shape.I_SHAPE, T: Shape.T_SHAPE };
    return shapes[letter];
  }

  static getRotation(shape, rotation) {
    const rotations = shape.length;
    const normalizedRotation = ((rotation % rotations) + rotations) % rotations;
    return shape[normalizedRotation];
  }
}
