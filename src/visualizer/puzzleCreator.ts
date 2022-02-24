import { MegaminxTop } from "./../puzzles/megaminxTop";
import { RubiksCubeTopLayer } from "./../puzzles/rubiksCube/rubiksCubeTop";
import { Square1Net } from "./../puzzles/square1/square1Net";
import { Square1Simualtor } from "./../simulator/square1/square1Simulator";
import { Square1 } from "./../puzzles/square1/square1";
import { SkewbNet } from "./../puzzles/skewbNet";
import { SkewbSimulator } from "./../simulator/skewb/skewbSimulator";
import { Skewb } from "./../puzzles/skewb";
import { PyraminxSimulator } from "./../simulator/pyraminx/pyraminxSimulator";
import { PyraminxNet } from "./../puzzles/pyraminxNet";
import { MegaminxNet } from "./../puzzles/megaminxNet";
import { Megaminx } from "./../puzzles/megaminx";
import { MegaminxSimulator } from "./../simulator/megaminx/megaminxSimulator";
import { RubiksCubeNet } from "./../puzzles/rubiksCube/rubiksCubeNet";
import { RubiksCube } from "../puzzles/rubiksCube/rubiksCube";
import { RubiksCubeSimulator } from "../simulator/rubiksCube/rubiksCubeSimulator";
import {
  CubeOptions,
  MegaminxOptions,
  PyraminxOptions,
  SkewbOptions,
  Square1Options,
} from "./interface";
import { Pyraminx } from "../puzzles/pyraminx";
import { PuzzleGeometry } from "../puzzles/puzzleGeometry";
import { VisualizerType } from "./enum";

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

export function createCube(
  options: CubeOptions = {}
): [RubiksCube, RubiksCubeSimulator] {
  if (!geometryCache[VisualizerType.CUBE][options.size]) {
    geometryCache[VisualizerType.CUBE][options.size] = new RubiksCube(
      options.size
    );
  }

  const geometry = geometryCache[VisualizerType.CUBE][
    options.size
  ] as RubiksCube;
  const simulator = new RubiksCubeSimulator(options.size);

  return [geometry, simulator];
}

export function createCubeNet(
  options: CubeOptions = {}
): [RubiksCubeNet, RubiksCubeSimulator] {
  if (!geometryCache[VisualizerType.CUBE_NET][options.size]) {
    geometryCache[VisualizerType.CUBE_NET][options.size] = new RubiksCubeNet(
      options.size
    );
  }

  const geometry = geometryCache[VisualizerType.CUBE_NET][
    options.size
  ] as RubiksCubeNet;
  const simulator = new RubiksCubeSimulator(options.size);

  return [geometry, simulator];
}

export function createCubeTop(
  options: CubeOptions = {}
): [RubiksCubeTopLayer, RubiksCubeSimulator] {
  if (!geometryCache[VisualizerType.CUBE_TOP][options.size]) {
    geometryCache[VisualizerType.CUBE_TOP][
      options.size
    ] = new RubiksCubeTopLayer(options.size);
  }

  const geometry = geometryCache[VisualizerType.CUBE_TOP][
    options.size
  ] as RubiksCubeTopLayer;
  const simulator = new RubiksCubeSimulator(options.size);

  return [geometry, simulator];
}

export function createMegaminx(
  options: MegaminxOptions = {}
): [Megaminx, MegaminxSimulator] {
  if (!geometryCache[VisualizerType.MEGAMINX][options.size]) {
    geometryCache[VisualizerType.MEGAMINX][options.size] = new Megaminx(
      options.size
    );
  }

  const geometry = geometryCache[VisualizerType.MEGAMINX][
    options.size
  ] as Megaminx;
  const simulator = new MegaminxSimulator();

  return [geometry, simulator];
}

export function createMegaminxNet(
  options: MegaminxOptions = {}
): [MegaminxNet, MegaminxSimulator] {
  if (!geometryCache[VisualizerType.MEGAMINX_NET][options.size]) {
    geometryCache[VisualizerType.MEGAMINX_NET][options.size] = new MegaminxNet(
      options.size
    );
  }

  const geometry = geometryCache[VisualizerType.MEGAMINX_NET][
    options.size
  ] as MegaminxNet;
  const simulator = new MegaminxSimulator();

  return [geometry, simulator];
}

export function createMegaminxTop(
  options: MegaminxOptions = {}
): [MegaminxTop, MegaminxSimulator] {
  if (!geometryCache[VisualizerType.MEGAMINX_TOP][2]) {
    // megaminx top size not supported, so just cache by size 2
    geometryCache[VisualizerType.MEGAMINX_TOP][2] = new MegaminxTop();
  }

  const geometry = geometryCache[VisualizerType.MEGAMINX_TOP][2] as MegaminxTop;
  const simulator = new MegaminxSimulator();

  return [geometry, simulator];
}

export function createPyraminx(
  options: PyraminxOptions = {}
): [Pyraminx, PyraminxSimulator] {
  if (!geometryCache[VisualizerType.PYRAMINX][options.size]) {
    geometryCache[VisualizerType.PYRAMINX][options.size] = new Pyraminx(
      options.size
    );
  }

  const geometry = geometryCache[VisualizerType.PYRAMINX][
    options.size
  ] as Pyraminx;
  const simulator = new PyraminxSimulator();

  return [geometry, simulator];
}

export function createPyraminxNet(
  options: PyraminxOptions = {}
): [PyraminxNet, PyraminxSimulator] {
  if (!geometryCache[VisualizerType.PYRAMINX_NET][options.size]) {
    geometryCache[VisualizerType.PYRAMINX_NET][options.size] = new PyraminxNet(
      options.size
    );
  }

  const geometry = geometryCache[VisualizerType.PYRAMINX_NET][
    options.size
  ] as PyraminxNet;
  const simulator = new PyraminxSimulator();

  return [geometry, simulator];
}

export function createSkewb(
  options: SkewbOptions = {}
): [Skewb, SkewbSimulator] {
  if (!geometryCache[VisualizerType.SKEWB][1]) {
    // Skewb size not supported, so just cache by size 1
    geometryCache[VisualizerType.SKEWB][1] = new Skewb();
  }

  const geometry = geometryCache[VisualizerType.SKEWB][1] as Skewb;
  const simulator = new SkewbSimulator();

  return [geometry, simulator];
}

export function createSkewbNet(
  options: SkewbOptions = {}
): [SkewbNet, SkewbSimulator] {
  if (!geometryCache[VisualizerType.SKEWB_NET][1]) {
    // Skewb size not supported, so just cache by size 1
    geometryCache[VisualizerType.SKEWB_NET][1] = new SkewbNet();
  }

  const geometry = geometryCache[VisualizerType.SKEWB_NET][1] as SkewbNet;
  const simulator = new SkewbSimulator();

  return [geometry, simulator];
}

export function createSquare1(
  options: Square1Options = {}
): [Square1, Square1Simualtor] {
  const simulator = initSquare1Simulator(options);
  const geometry = new Square1(
    simulator.topLayer,
    simulator.bottomLayer,
    simulator.middleRotated
  );

  return [geometry, simulator];
}

export function createSquare1Net(
  options: Square1Options = {}
): [Square1Net, Square1Simualtor] {
  const simulator = initSquare1Simulator(options);
  const geometry = new Square1Net(
    simulator.topLayer,
    simulator.bottomLayer,
    simulator.middleRotated
  );

  return [geometry, simulator];
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
