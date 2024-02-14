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

  static J_SHAPE = {
    letter: "J",
    rotations: [
      `JJJ
       ..J
       ...`,
      `.J.
       .J.
       JJ.`,
      `J..
       JJJ
       ...`,
      `.JJ
       .J.
       .J.`,
    ],
  };

  static L_SHAPE = {
    letter: "L",
    rotations: [
      `LLL
       L..
       ...`,
      `LL.
       .L.
       .L.`,
      `L..
       LLL
       ...`,
      `.L.
       .L.
       .LL`,
    ],
  };

  static O_SHAPE = {
    letter: "O",
    rotations: [
      `....
       .OO.
       .OO.
       ....`,
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
      `TTT
       .T.
       ...`,
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
