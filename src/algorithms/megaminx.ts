import { Turn, TurnType } from "./algorithm";

const megaminxStefanPochmann = /([RD])(\+\+|\-\-)|(U)(\'?)/g;

// TODO
const megaminxAlgRegex = /([FRU])/g;

enum PochmannDirections {
  Clockwise = "++",
  CounterClockwise = "--",
  UClockwise = "",
  UCounter = "'",
}

const DirectionToTurnType = {
  [PochmannDirections.Clockwise]: TurnType.Clockwise,
  [PochmannDirections.CounterClockwise]: TurnType.CounterClockwise,
  [PochmannDirections.UClockwise]: TurnType.Clockwise,
  [PochmannDirections.UCounter]: TurnType.CounterClockwise,
};

/**
 * Takes in a megaminx algorithm in stefan pochmann notation as a string
 * and parses the turns from it
 *
 * algorithm string format should be moves separated by a single space
 *
 * @example
 * ```typescript
 * parseMegaminxAlgorithm("D++ R-- D-- U")
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

  while ((match = megaminxStefanPochmann.exec(algorithm))) {
    const rawUnit = match[1] || match[3];
    const rawDirection = match[2] || match[4];

    turns.push({
      unit: rawUnit,
      turnType: DirectionToTurnType[rawDirection],
      slices: 1,
    });
  }

  return turns;
}
