/**
 * Represents an algorithm turn. Should be ok to represent all WCA puzzles,
 * with exception of square1. All other WCA puzzle notation always has
 * a unit (face), direction (clockwise, CCW), and number of turns.
 * slices indicates number of inner layers to turn on larger order puzzles
 *
 * @example
 * ```
 * CUBE: R' -> Right face, counter clockwise,  1 time
 *
 * MEGAMINX: U'2 -> Up face, counter clockwise, 2 times
 * ```
 */
export interface Turn {
  unit: string;
  turnType: TurnType;
  slices: number;
}

export enum TurnType {
  Clockwise,
  CounterClockwise,
  Double,
}
