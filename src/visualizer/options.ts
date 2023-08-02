import { VisualizerType } from "./enum";
import {
  RED,
  YELLOW,
  BLUE,
  WHITE,
  ORANGE,
  GREEN,
  PINK,
  LIGHT_YELLOW,
  GREY,
  LIGHT_GREEN,
  PURPLE,
  DARK_BLUE,
} from "./../puzzles/colors";
import {
  ClockOptions,
  CubeOptions,
  MegaminxOptions,
  PuzzleOptions,
  PyraminxOptions,
  SkewbOptions,
  Square1Options,
} from "./interface";
import { DEFAULT_SQ1_SCHEME } from "../puzzles/square1/constants";

export const defaultCubeOptions: CubeOptions = {
  size: 3,
  scheme: {
    U: YELLOW,
    R: RED,
    F: BLUE,
    D: WHITE,
    L: ORANGE,
    B: GREEN,
  },
  rotations: [
    {
      x: 0,
      y: 45,
      z: 0,
    },
    {
      x: 34,
      y: 0,
      z: 0,
    },
  ],
};

export const defaultMegaminxOptions: MegaminxOptions = {
  size: 2,
  scheme: {
    U: WHITE,
    F: RED,
    R: BLUE,
    dr: PINK,
    dl: LIGHT_YELLOW,
    L: GREEN,
    d: GREY,
    br: LIGHT_GREEN,
    BR: YELLOW,
    BL: PURPLE,
    bl: DARK_BLUE,
    b: ORANGE,
  },
};

export const defaultPyraminxOptions: PyraminxOptions = {
  size: 3,
  scheme: {
    left: BLUE,
    right: GREEN,
    top: YELLOW,
    back: RED,
  },
  rotations: [
    {
      x: 0,
      y: 0,
      z: 60,
    },
    {
      x: -60,
      y: 0,
      z: 0,
    },
  ],
};

export const defaultSkewbOptions: SkewbOptions = {
  scheme: {
    top: YELLOW,
    front: BLUE,
    right: RED,
    back: GREEN,
    left: ORANGE,
    bottom: WHITE,
  },
  rotations: [
    {
      x: 0,
      y: 45,
      z: 0,
    },
    {
      x: 34,
      y: 0,
      z: 0,
    },
  ],
};

export const defaultSquare1Options: Square1Options = {
  scheme: DEFAULT_SQ1_SCHEME,
  rotations: [
    {
      x: 0,
      y: 0,
      z: -34,
    },
    {
      x: -56,
      y: 0,
      z: 0,
    },
  ],
};

export const defaultClockOptions: ClockOptions = {};

export function getDefaultOptions(type: VisualizerType): PuzzleOptions {
  switch (type) {
    case VisualizerType.CUBE:
      return defaultCubeOptions;
    case VisualizerType.CUBE_NET:
      return { ...defaultCubeOptions, rotations: null };
    case VisualizerType.CUBE_TOP:
      return { ...defaultCubeOptions, rotations: null };
    case VisualizerType.MEGAMINX:
    case VisualizerType.MEGAMINX_NET:
    case VisualizerType.MEGAMINX_TOP:
      return defaultMegaminxOptions;
    case VisualizerType.PYRAMINX:
      return defaultPyraminxOptions;
    case VisualizerType.PYRAMINX_NET:
      return { ...defaultPyraminxOptions, rotations: null };
    case VisualizerType.SKEWB:
      return defaultSkewbOptions;
    case VisualizerType.SKEWB_NET:
      return { ...defaultSkewbOptions, rotations: null };
    case VisualizerType.SQUARE1:
      return defaultSquare1Options;
    case VisualizerType.SQUARE1_NET:
      return { ...defaultSquare1Options, rotations: null };
    case VisualizerType.CLOCK:
      return { ...defaultClockOptions, rotations: null };
    default:
      throw new Error(`Could not get default options for puzzle ${type}`);
  }
}
