import { IColor } from "../geometry/color";
import { BLACK } from "../puzzles/colors";

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
  rotations?: { x?: number; y?: number; z?: number }[];

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
  translation?: { x?: number; y?: number; z?: number };

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

export interface ClockOptions extends PuzzleOptions {}

export function validatePuzzleOptions(options: PuzzleOptions) {
  if (options.alg && typeof options.alg !== "string") {
    console.warn(`Inavlid alg ${options.alg}. alg must be a string`);
    options.alg = "";
  }

  if (options.case && typeof options.case !== "string") {
    console.warn(`Inavlid case ${options.case}. case must be a string`);
    options.case = "";
  }

  if (options.scheme) {
    if (typeof options.scheme !== "object" || Array.isArray(options.scheme)) {
      console.warn(
        `Invalid scheme ${options.scheme}. scheme must be an object`
      );
      options.scheme = {};
    } else {
      Object.keys(options.scheme).forEach((face) => {
        const faceColor = options.scheme[face];
        if (
          faceColor == null ||
          typeof faceColor !== "object" ||
          !faceColor.value
        ) {
          console.warn(
            `Invalid scheme color ${faceColor}. must be an type IColor`
          );
          options.scheme[face] = BLACK;
        }
      });
    }
  }

  if (options.mask) {
    if (typeof options.mask !== "object" || Array.isArray(options.mask)) {
      console.warn(`Invalid mask ${options.mask}. scheme must be an object`);
      options.mask = {};
    } else {
      Object.keys(options.mask).forEach((face) => {
        const maskValues = options.mask[face];
        if (!Array.isArray(maskValues)) {
          console.warn(`Invalid mask ${maskValues}. must be an array`);
          options.mask[face] = [];
        } else {
          for (let i = 0; i < maskValues.length; i++) {
            if (!Number.isInteger(maskValues[i])) {
              console.warn(
                `Invalid mask value ${maskValues[i]}. must be a number`
              );
              options.mask[face] = [];
              break;
            }
          }
        }
      });
    }
  }

  if (options.stickerColors) {
    if (
      typeof options.stickerColors !== "object" ||
      Array.isArray(options.stickerColors)
    ) {
      console.warn(
        `Invalid stickerColors ${options.stickerColors}. stickerColors must be an object`
      );
      options.stickerColors = {};
    } else {
      Object.keys(options.stickerColors).forEach((face) => {
        const faceColors = options.stickerColors[face];
        if (!Array.isArray(faceColors)) {
          console.warn(`Invalid colors ${faceColors}. must be an array`);
          options.stickerColors[face] = [];
        } else {
          for (let i = 0; i < faceColors.length; i++) {
            if (!validColor(faceColors[i])) {
              options.stickerColors[face] = [];
              break;
            }
          }
        }
      });
    }
  }

  if (options.rotations) {
    if (!Array.isArray(options.rotations)) {
      console.warn(`invalid rotations ${options.rotations}, must be an array`);
      options.rotations = [];
    } else {
      for (let i = 0; i < options.rotations.length; i++) {
        if (!validRotation(options.rotations[i])) {
          options.rotations = [];
          break;
        }
      }
    }
  }

  if (options.scale && !Number.isFinite(options.scale)) {
    console.warn(`invalid scale ${options.scale}, must be a finite number`);
    options.scale = 1;
  }

  if (options.translation && !validTranslation(options.translation)) {
    options.translation = { x: 0, y: 0, z: 0 };
  }

  if (options.arrows) {
    if (!Array.isArray(options.arrows)) {
      console.warn(`invalid arrows, must be an array`);
      options.arrows = [];
    } else {
      for (let i = 0; i < options.arrows.length; i++) {
        if (!validArrow(options.arrows[i])) {
          options.arrows = [];
          break;
        }
      }
    }
  }
}

export function validColor(c: IColor): boolean {
  if (typeof c !== "object") {
    console.warn(`invalid color ${c}, must be type object`);
    return false;
  }

  if (!c.value || typeof c.value !== "string") {
    console.warn(`invalid color value ${c.value}, must be type string`);
    return false;
  }

  if (c.stroke && typeof c.stroke !== "string") {
    console.warn(`invalid color stroke ${c.stroke}, must be type string`);
    return false;
  }

  return true;
}

function validRotation(r: { x?: number; y?: number; z?: number }): boolean {
  if (!r || typeof r !== "object") {
    console.warn(`invalid rotation ${r}, must be an object`);
    return false;
  }

  if (r.x && !Number.isFinite(r.x)) {
    console.warn(`invalid x rotation ${r.x}, must be a number`);
    return false;
  }

  if (r.y && !Number.isFinite(r.y)) {
    console.warn(`invalid y rotation ${r.y}, must be a number`);
    return false;
  }

  if (r.z && !Number.isFinite(r.z)) {
    console.warn(`invalid z rotation ${r.z}, must be a number`);
    return false;
  }

  return true;
}

function validTranslation(r: { x?: number; y?: number; z?: number }): boolean {
  if (typeof r !== "object" || Array.isArray(r)) {
    console.warn(`invalid translation ${r}, must be an object`);
    return false;
  }

  if (r.x && !Number.isFinite(r.x)) {
    console.warn(`invalid x translation ${r.x}, must be a number`);
    return false;
  }

  if (r.y && !Number.isFinite(r.y)) {
    console.warn(`invalid y translation ${r.y}, must be a number`);
    return false;
  }

  if (r.z && !Number.isFinite(r.z)) {
    console.warn(`invalid z translation ${r.z}, must be a number`);
    return false;
  }

  return true;
}

function validArrow(a: ArrowDefinition): boolean {
  if (typeof a !== "object") {
    console.warn(`invalid arrow ${a}, must be an object`);
    return false;
  }

  if (typeof a.end !== "object" || typeof a.start !== "object") {
    console.warn(`invalid arrow ${a}, must have start and end`);
    return false;
  }

  if (typeof a.start.face !== "string" || !Number.isInteger(a.start.sticker)) {
    console.warn(`invalid arrow start ${a.start}`);
    return false;
  }

  if (typeof a.end.face !== "string" || !Number.isInteger(a.end.sticker)) {
    console.warn(`invalid arrow end ${a.end}`);
    return false;
  }

  return true;
}
