import { IColor } from "../geometry/color";

export type ColorScheme = { [face: string]: IColor };

export interface PuzzleOptions {
  /**
   * algorithm to perform on the initial state of the puzzle
   */
  alg?: string;

  /**
   * apply the algorithm in reverse to show the state the
   * puzzle will be in before applying the algorithm. This
   * will take precedence over alg.
   */
  case?: string;

  /**
   * color scheme for the puzzle. Maps a puzzle face
   * to a color
   *
   * @example
   * ```typescript
   * {
   *   U: { value: "#FFF" },
   *  ...
   * }
   * ```
   */
  scheme?: { [face: string]: IColor };

  /**
   * List of face stickers to mask. This will
   * draw the sticker in gray instead of the
   * actual color. This is helpfull to highlight
   * only the pieces of a puzzle relevant for an
   * algorithm
   *
   * @example
   * ```typescript
   * {
   *   U: [0,1,2] // mask stickers 0, 1, and 2 on the U face of the puzzle
   * }
   * ```
   */
  mask?: { [face: string]: number[] };
}

export interface CubeOptions extends PuzzleOptions {
  size?: number;
}

export interface SkewbOptions extends PuzzleOptions {}

export interface MegaminxOptions extends PuzzleOptions {
  size?: number;
}

export interface PyraminxOptions extends PuzzleOptions {
  size?: number;
}

export interface Square1Options extends PuzzleOptions {}
