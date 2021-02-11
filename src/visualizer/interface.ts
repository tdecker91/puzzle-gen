import { IColor } from "../geometry/color";

export type ColorScheme = { [face: string]: IColor };

export type ArrowDefinition = {
  start: { face: string; sticker: number };
  end: { face: string; sticker: number };
};

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
   * const scheme = {
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
   * algorithm.
   *
   * @example
   * ```typescript
   * const mask = {
   *   U: [0,1,2] // mask stickers 0, 1, and 2 on the U face of the puzzle
   * }
   * ```
   */
  mask?: { [face: string]: number[] };

  /**
   * manually set the colors of the puzzle stickers. This
   * will take presidence over any other color altering option
   * like alg, case, scheme etc...
   *
   * @example
   * ```typescript
   * import { RED } from "sr-visualizer/puzzles/colors"
   *
   * let BLUE = { value: "#00F" }
   *
   * const colors = {
   *   U: [RED, RED, RED, RED, RED, RED, RED, RED, BLUE]
   * }
   * ```
   */
  stickerColors?: { [face: string]: IColor[] };

  /**
   * list of rotations to perform on the puzzle
   * before rendering. Each item is a set of
   * euler angles measured in degrees.
   *
   * The camera by default is offset on the z axis
   * looking at the origin, viewing the x/y plane.
   * To get the default cube angle first rotate the
   * x axis by 34 degrees, and then the y axis by 45 degrees
   *
   * @example
   * ```typescript
   * // Default cube rotation
   * const rotations = [{
   *   x: 0,
   *   y: 45,
   *   z: 0
   * },{
   *   x: 34,
   *   y: 0,
   *   z: 0
   * }];
   * ```
   */
  rotations?: { x: number; y: number; z: number }[];

  /**
   * scalar value to sale the render by
   *
   * @example
   * ```
   * .5 will scale the image by 1/2
   * 2 will double the size of the render
   * ```
   */
  scale?: number;

  /**
   * translate the rendered image by a vector. Will be applied
   * after rotations.
   *
   * @example
   * ```typescript
   * // shift the image on the y axis
   * {
   *   translation: { x: 0, y: 5, z: 0 }
   * }
   * ```
   */
  translation?: { x: number; y: number; z: number };

  /**
   * Draw arrows on the face of the puzzle
   */
  arrows?: ArrowDefinition[];
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
