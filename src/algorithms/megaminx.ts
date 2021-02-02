import { Turn, TurnType } from "./algorithm";

const megaminxTurnNotation = /([RD])([\+\+|\-\-]+)|([UFRL]|BR|BL)([2-3]?)(\'?)/g;

enum PochmannDirections {
  Clockwise = "++",
  CounterClockwise = "--",
  FaceClockwise = "",
  FaceCounter = "'",
}

const DirectionToTurnType = {
  [PochmannDirections.Clockwise]: TurnType.Clockwise,
  [PochmannDirections.CounterClockwise]: TurnType.CounterClockwise,
  [PochmannDirections.FaceClockwise]: TurnType.Clockwise,
  [PochmannDirections.FaceCounter]: TurnType.CounterClockwise,
};

/**
 * Takes in a megaminx algorithm in stefan pochmann notation as a string
 * and parses the turns from it
 * 
 * Also supports face turns U,F,R,L,BR,BL as i've seen in some algorithms online
 *
 * algorithm string format should be moves separated by a single space
 *
 * @example
 * ```typescript
 * parseMegaminxAlgorithm("D++ R-- D-- U")
 * parseMegaminxAlgorithm("R' U2' R2 U R2' U R2 U2' R'")
 * ```
 *
 * @see https://www.worldcubeassociation.org/regulations/#article-12-notation
 */
export function parseMegaminxAlgorithm(algorithm: string): Turn[] {
  if (!algorithm) {
    return [];
  }

  let turns: Turn[] = [];
  let match: RegExpExecArray | null;

  while ((match = megaminxTurnNotation.exec(algorithm))) {
    const rawUnit = match[1] ? `${match[1]}xx` : match[3];
    const rawDirection = match[2] || match[5];
    const rawNumber = match[4];

    turns.push({
      unit: rawUnit,
      turnType: DirectionToTurnType[rawDirection],
      slices: 1,
      n: rawNumber ? parseInt(rawNumber) : 1
    });
  }

  return turns;
}
