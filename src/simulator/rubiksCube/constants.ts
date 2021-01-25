export enum SIMULATOR_FACE {
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

export enum CUBE_AXIS {
  X = 'X',
  Y = 'Y',
  Z = 'Z'
}

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
    [SIMULATOR_FACE.L]: 2,
    [SIMULATOR_FACE.R]: 0,
  },
}

// True if faces are in reverse orientation
// from the axis it's on (X, Y, Z).
// For example D turns on the Y axis, but the
// y axis layer turns clockwise based on the U
// face, so D needs to be reversed
export const AXIS_FACE_ORIENTATION = {
  [SIMULATOR_FACE.U]: false,
  [SIMULATOR_FACE.R]: false,
  [SIMULATOR_FACE.F]: false,
  [SIMULATOR_FACE.D]: true,
  [SIMULATOR_FACE.L]: true,
  [SIMULATOR_FACE.B]: true
}