import { MegaminxTop } from "./../puzzles/megaminx/megaminxTop";
import { RubiksCubeTopLayer } from "./../puzzles/rubiksCube/rubiksCubeTop";
import { Square1Net } from "./../puzzles/square1/square1Net";
import { Square1Simualtor } from "./../simulator/square1/square1Simulator";
import { Square1 } from "./../puzzles/square1/square1";
import { SkewbNet } from "./../puzzles/skewb/skewbNet";
import { SkewbSimulator } from "./../simulator/skewb/skewbSimulator";
import { Skewb } from "../puzzles/skewb/skewb";
import { PyraminxSimulator } from "./../simulator/pyraminx/pyraminxSimulator";
import { PyraminxNet } from "../puzzles/pyraminx/pyraminxNet";
import { MegaminxNet } from "./../puzzles/megaminx/megaminxNet";
import { Megaminx } from "../puzzles/megaminx/megaminx";
import { MegaminxSimulator } from "./../simulator/megaminx/megaminxSimulator";
import { RubiksCubeNet } from "./../puzzles/rubiksCube/rubiksCubeNet";
import { RubiksCube } from "../puzzles/rubiksCube/rubiksCube";
import { RubiksCubeSimulator } from "../simulator/rubiksCube/rubiksCubeSimulator";
import {
  ClockOptions,
  CubeOptions,
  MegaminxOptions,
  PyraminxOptions,
  SkewbOptions,
  Square1Options,
} from "./interface";
import { Pyraminx } from "../puzzles/pyraminx/pyraminx";
import { PuzzleGeometry } from "../puzzles/puzzleGeometry";
import { VisualizerType } from "./enum";
import { PuzzleOptions } from "./interface";
import { ClockSimulator } from "../simulator/clock/clockSimulator";
import { Clock } from "../puzzles/clock/clock";

/**
 * Since puzzle geometry doesn't change for any instance of "Visuzlier"
 * we can cache the geometry generated to avoid generating it on each time
 * we render a puzzle
 */
const geometryCache: {
  [type: string]: { [size: number]: PuzzleGeometry };
} = {
  [VisualizerType.CUBE]: {},
  [VisualizerType.CUBE_NET]: {},
  [VisualizerType.CUBE_TOP]: {},
  [VisualizerType.MEGAMINX]: {},
  [VisualizerType.MEGAMINX_NET]: {},
  [VisualizerType.MEGAMINX_TOP]: {},
  [VisualizerType.PYRAMINX]: {},
  [VisualizerType.PYRAMINX_NET]: {},
  [VisualizerType.SKEWB]: {},
  [VisualizerType.SKEWB_NET]: {},
  [VisualizerType.SQUARE1]: {},
  [VisualizerType.SQUARE1_NET]: {},
};

/**
 * Creates puzzle geometry for a given puzzle type.
 * Will initialize the geometry on puzzle options
 * passed in
 *
 * @param type Type of the puzzle {@link VisualizerType} (cube, skewb, etc...)
 * @param options  Puzzle options {@link PuzzleOptions}
 */
export function getPuzzleGeometry<T extends PuzzleOptions>(
  type: VisualizerType,
  options: T
): PuzzleGeometry {
  switch (type) {
    case VisualizerType.CUBE:
      return createCube(options as CubeOptions);
    case VisualizerType.CUBE_NET:
      return createCubeNet(options as CubeOptions);
    case VisualizerType.CUBE_TOP:
      return createCubeTop(options as CubeOptions);
    case VisualizerType.MEGAMINX:
      return createMegaminx(options as MegaminxOptions);
    case VisualizerType.MEGAMINX_NET:
      return createMegaminxNet(options as MegaminxOptions);
    case VisualizerType.MEGAMINX_TOP:
      return createMegaminxTop(options as MegaminxOptions);
    case VisualizerType.PYRAMINX:
      return createPyraminx(options as PyraminxOptions);
    case VisualizerType.PYRAMINX_NET:
      return createPyraminxNet(options as PyraminxOptions);
    case VisualizerType.SKEWB:
      return createSkewb(options as SkewbOptions);
    case VisualizerType.SKEWB_NET:
      return createSkewbNet(options as SkewbOptions);
    case VisualizerType.SQUARE1:
      return createSquare1(options as Square1Options);
    case VisualizerType.SQUARE1_NET:
      return createSquare1Net(options as Square1Options);
    case VisualizerType.CLOCK:
      return createClock(options as ClockOptions);
  }
}

/**
 * Returns a puzzle simulator for the type of puzzle
 *
 * @param type
 * @param options
 */
export function getPuzzleSimulator<T extends PuzzleOptions>(
  type: VisualizerType,
  options: T
) {
  switch (type) {
    case VisualizerType.CUBE:
    case VisualizerType.CUBE_NET:
    case VisualizerType.CUBE_TOP:
      return new RubiksCubeSimulator((<CubeOptions>options).size);
    case VisualizerType.MEGAMINX:
    case VisualizerType.MEGAMINX_NET:
    case VisualizerType.MEGAMINX_TOP:
      return new MegaminxSimulator();
    case VisualizerType.PYRAMINX:
    case VisualizerType.PYRAMINX_NET:
      return new PyraminxSimulator();
    case VisualizerType.SKEWB:
    case VisualizerType.SKEWB_NET:
      return new SkewbSimulator();
    case VisualizerType.SQUARE1:
    case VisualizerType.SQUARE1_NET:
      return initSquare1Simulator(options);
    case VisualizerType.CLOCK:
      return initClockSimulator(options);
  }
}

export function createCube(options: CubeOptions = {}): RubiksCube {
  if (!geometryCache[VisualizerType.CUBE][options.size]) {
    geometryCache[VisualizerType.CUBE][options.size] = new RubiksCube(
      options.size
    );
  }

  return geometryCache[VisualizerType.CUBE][options.size] as RubiksCube;
}

export function createCubeNet(options: CubeOptions = {}): RubiksCubeNet {
  if (!geometryCache[VisualizerType.CUBE_NET][options.size]) {
    geometryCache[VisualizerType.CUBE_NET][options.size] = new RubiksCubeNet(
      options.size
    );
  }

  return geometryCache[VisualizerType.CUBE_NET][options.size] as RubiksCubeNet;
}

export function createCubeTop(options: CubeOptions = {}): RubiksCubeTopLayer {
  if (!geometryCache[VisualizerType.CUBE_TOP][options.size]) {
    geometryCache[VisualizerType.CUBE_TOP][options.size] =
      new RubiksCubeTopLayer(options.size);
  }

  return geometryCache[VisualizerType.CUBE_TOP][
    options.size
  ] as RubiksCubeTopLayer;
}

export function createMegaminx(options: MegaminxOptions = {}): Megaminx {
  if (!geometryCache[VisualizerType.MEGAMINX][options.size]) {
    geometryCache[VisualizerType.MEGAMINX][options.size] = new Megaminx(
      options.size
    );
  }

  return geometryCache[VisualizerType.MEGAMINX][options.size] as Megaminx;
}

export function createMegaminxNet(options: MegaminxOptions = {}): MegaminxNet {
  if (!geometryCache[VisualizerType.MEGAMINX_NET][options.size]) {
    geometryCache[VisualizerType.MEGAMINX_NET][options.size] = new MegaminxNet(
      options.size
    );
  }

  return geometryCache[VisualizerType.MEGAMINX_NET][
    options.size
  ] as MegaminxNet;
}

export function createMegaminxTop(options: MegaminxOptions = {}): MegaminxTop {
  if (!geometryCache[VisualizerType.MEGAMINX_TOP][2]) {
    // megaminx top size not supported, so just cache by size 2
    geometryCache[VisualizerType.MEGAMINX_TOP][2] = new MegaminxTop();
  }

  return geometryCache[VisualizerType.MEGAMINX_TOP][2] as MegaminxTop;
}

export function createPyraminx(options: PyraminxOptions = {}): Pyraminx {
  if (!geometryCache[VisualizerType.PYRAMINX][options.size]) {
    geometryCache[VisualizerType.PYRAMINX][options.size] = new Pyraminx(
      options.size
    );
  }

  return geometryCache[VisualizerType.PYRAMINX][options.size] as Pyraminx;
}

export function createPyraminxNet(options: PyraminxOptions = {}): PyraminxNet {
  if (!geometryCache[VisualizerType.PYRAMINX_NET][options.size]) {
    geometryCache[VisualizerType.PYRAMINX_NET][options.size] = new PyraminxNet(
      options.size
    );
  }

  return geometryCache[VisualizerType.PYRAMINX_NET][
    options.size
  ] as PyraminxNet;
}

export function createSkewb(options: SkewbOptions = {}): Skewb {
  if (!geometryCache[VisualizerType.SKEWB][1]) {
    // Skewb size not supported, so just cache by size 1
    geometryCache[VisualizerType.SKEWB][1] = new Skewb();
  }

  return geometryCache[VisualizerType.SKEWB][1] as Skewb;
}

export function createSkewbNet(options: SkewbOptions = {}): SkewbNet {
  if (!geometryCache[VisualizerType.SKEWB_NET][1]) {
    // Skewb size not supported, so just cache by size 1
    geometryCache[VisualizerType.SKEWB_NET][1] = new SkewbNet();
  }

  return geometryCache[VisualizerType.SKEWB_NET][1] as SkewbNet;
}

export function createSquare1(options: Square1Options = {}): Square1 {
  const simulator = initSquare1Simulator(options);
  const geometry = new Square1(
    simulator.topLayer,
    simulator.bottomLayer,
    simulator.middleRotated,
    options.scheme
  );

  return geometry;
}

export function createSquare1Net(options: Square1Options = {}): Square1Net {
  const simulator = initSquare1Simulator(options);
  const geometry = new Square1Net(
    simulator.topLayer,
    simulator.bottomLayer,
    simulator.middleRotated,
    options.scheme
  );

  return geometry;
}

export function createClock(options: ClockOptions = {}): Clock {
  const simulator = initClockSimulator(options);
  const geometry = new Clock(
    simulator.top,
    simulator.bottom,
    simulator.pegs,
    simulator.flipped
  );

  return geometry;
}

function initSquare1Simulator(options: Square1Options): Square1Simualtor {
  const simulator = new Square1Simualtor(options.scheme);

  if (options.case) {
    simulator.case(options.case);
  } else if (options.alg) {
    simulator.alg(options.alg);
  }

  return simulator;
}

function initClockSimulator(options: ClockOptions) {
  const simulator = new ClockSimulator();

  if (options.alg) {
    simulator.alg(options.alg);
  }

  return simulator;
}
