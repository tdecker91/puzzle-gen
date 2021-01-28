export interface PuzzleOptions {}

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
