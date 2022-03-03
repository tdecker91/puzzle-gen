import { Turn, TurnType } from "./algorithm";

enum TurnAbbreviation {
  Clockwise = "",
  CounterClockwise = "'",
  Double = "2",
}

export enum CubeAlgorithmUnit {
  F = "F",
  U = "U",
  R = "R",
  L = "L",
  D = "D",
  B = "B",
  M = "M",
  E = "E",
  S = "S",
  X = "x",
  Y = "y",
  Z = "z",
}

export const possibleMoves: string[] = [
  CubeAlgorithmUnit.F,
  CubeAlgorithmUnit.U,
  CubeAlgorithmUnit.R,
  CubeAlgorithmUnit.L,
  CubeAlgorithmUnit.D,
  CubeAlgorithmUnit.B,
  CubeAlgorithmUnit.M,
  CubeAlgorithmUnit.E,
  CubeAlgorithmUnit.S,
  CubeAlgorithmUnit.X,
  CubeAlgorithmUnit.Y,
  CubeAlgorithmUnit.Z,
];

const cubeRotations: string[] = [
  CubeAlgorithmUnit.X,
  CubeAlgorithmUnit.Y,
  CubeAlgorithmUnit.Z,
];

const cubeTurnRegex = /([0-9]+)?([UuFfRrDdLlBbMESxyz])(w)?([2\'])?/g;

/**
 * Takes in an algorithm string and parses the turns from it
 * algorithm string format should be moves separated by a single space
 * (ex. "U R2 L' x")
 *
 * https://www.worldcubeassociation.org/regulations/#article-12-notation
 */
export function parseCubeAlgorithm(algorithm: string): Turn[] {
  if (!algorithm) {
    return [];
  }
  let turns: Turn[] = [];
  let match;

  while ((match = cubeTurnRegex.exec(algorithm))) {
    let rawSlices: string = match[1];
    let rawFace: string = match[2];
    let outerBlockIndicator = match[3];
    let rawType = match[4] || TurnAbbreviation.Clockwise; // Default to clockwise
    let isLowerCaseMove =
      rawFace === rawFace.toLowerCase() &&
      cubeRotations.indexOf(rawFace) === -1;

    if (isLowerCaseMove) {
      rawFace = rawFace.toUpperCase();
    }

    let turn: Turn = {
      unit: getMove(rawFace),
      turnType: getTurnType(rawType),
      slices: isLowerCaseMove ? 2 : getSlices(rawSlices, outerBlockIndicator),
    };

    turns.push(turn);
  }

  return turns;
}

function getSlices(rawSlices, outerBlockIndicator): number {
  if (outerBlockIndicator && !rawSlices) {
    return 2;
  } else if (!outerBlockIndicator && rawSlices) {
    throw new Error(
      `Invalid move: Cannot specify num slices if outer block move indicator 'w' is not present`
    );
  } else if (!outerBlockIndicator && !rawSlices) {
    return 1;
  } else {
    const intValue = parseInt(rawSlices);
    if (intValue > 1) {
      return intValue;
    }

    throw new Error(
      `Invalid outer block move (${intValue}) must be greater than 1`
    );
  }
}

function getMove(rawFace: string): CubeAlgorithmUnit {
  if (possibleMoves.indexOf(rawFace) < 0) {
    throw new Error(
      `Invalid move (${rawFace}): Possible turn faces are [U R F L D B M E S x y z]`
    );
  } else return rawFace as CubeAlgorithmUnit;
}

function getTurnType(rawType: string): TurnType {
  switch (rawType) {
    case TurnAbbreviation.Clockwise:
      return TurnType.Clockwise;
    case TurnAbbreviation.CounterClockwise:
      return TurnType.CounterClockwise;
    case TurnAbbreviation.Double:
      return TurnType.Double;
    default:
      throw new Error(`Invalid move modifier (${rawType})`);
  }
}
