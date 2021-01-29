import { Turn, TurnType } from "./algorithm";

const skewbTurnRegex = /([LRUB])(\'?)/g;

const DirectionToTurnType = {
  "": TurnType.Clockwise,
  "'": TurnType.CounterClockwise,
};

export function parseSkewbAlgorithm(algorithm: string) {
  let turns: Turn[] = [];
  let match: RegExpExecArray | null;

  while ((match = skewbTurnRegex.exec(algorithm))) {
    const rawUnit = match[1];
    const rawDirection = match[2];

    turns.push({
      unit: rawUnit,
      turnType: DirectionToTurnType[rawDirection],
      slices: 1,
    });
  }

  return turns;
}
