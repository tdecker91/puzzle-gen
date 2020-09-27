export const enum SIMULATOR_FACE {
  U = 'U',
  R = 'R',
  F = 'F',
  D = 'D',
  L = 'L',
  B = 'B',
};

export const CUBE_FACES = [
  SIMULATOR_FACE.U,
  SIMULATOR_FACE.R,
  SIMULATOR_FACE.F,
  SIMULATOR_FACE.D,
  SIMULATOR_FACE.L,
  SIMULATOR_FACE.B,
];

export const CUBE_AXIS = [
  'X', 'Y', 'Z'
]

// Faces that wrap around a given axis
export const CUBE_AXIS_FACES: {[axis: string] : SIMULATOR_FACE[]} = {
  X: [SIMULATOR_FACE.U, SIMULATOR_FACE.B, SIMULATOR_FACE.D, SIMULATOR_FACE.F],
  Y: [SIMULATOR_FACE.L, SIMULATOR_FACE.B, SIMULATOR_FACE.R, SIMULATOR_FACE.F],
  Z: [SIMULATOR_FACE.L, SIMULATOR_FACE.U, SIMULATOR_FACE.R, SIMULATOR_FACE.D],
}

// Face's orientation related to other faces on a given axis
// the number represents the number of turns necessary
// to orient the face in the same direction
export const AXIS_ORIENTATION = {
  X: {
    [SIMULATOR_FACE.U]: 0,
    [SIMULATOR_FACE.B]: 2,
    [SIMULATOR_FACE.F]: 0,
    [SIMULATOR_FACE.D]: 0,
  },
  Y: {
    [SIMULATOR_FACE.B]: -1,
    [SIMULATOR_FACE.F]: -1,
    [SIMULATOR_FACE.L]: -1,
    [SIMULATOR_FACE.R]: -1,
  },
  Z: {
    [SIMULATOR_FACE.U]: -1,
    [SIMULATOR_FACE.D]: 1,
    [SIMULATOR_FACE.L]: 0,
    [SIMULATOR_FACE.R]: 2,
  },
}