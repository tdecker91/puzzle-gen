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

export function createCube(
  options: CubeOptions = {}
): [RubiksCube, RubiksCubeSimulator] {
  const geometry = new RubiksCube(options.size);
  const simulator = new RubiksCubeSimulator(options.size);

  return [geometry, simulator];
}

export function createCubeNet(
  options: CubeOptions = {}
): [RubiksCubeNet, RubiksCubeSimulator] {
  const geometry = new RubiksCubeNet(options.size);
  const simulator = new RubiksCubeSimulator(options.size);

  return [geometry, simulator];
}

export function createCubeTop(
  options: CubeOptions = {}
): [RubiksCubeTopLayer, RubiksCubeSimulator] {
  const geometry = new RubiksCubeTopLayer(options.size);
  const simulator = new RubiksCubeSimulator(options.size);

  return [geometry, simulator];
}

export function createMegaminx(
  options: MegaminxOptions = {}
): [Megaminx, MegaminxSimulator] {
  const geometry = new Megaminx(options.size);
  const simulator = new MegaminxSimulator();

  return [geometry, simulator];
}

export function createMegaminxNet(
  options: MegaminxOptions = {}
): [MegaminxNet, MegaminxSimulator] {
  const geometry = new MegaminxNet(options.size);
  const simulator = new MegaminxSimulator();

  return [geometry, simulator];
}

export function createMegaminxTop(
  options: MegaminxOptions = {}
): [MegaminxTop, MegaminxSimulator] {
  const geometry = new MegaminxTop();
  const simulator = new MegaminxSimulator();

  return [geometry, simulator];
}

export function createPyraminx(
  options: PyraminxOptions = {}
): [Pyraminx, PyraminxSimulator] {
  const geometry = new Pyraminx(options.size);
  const simulator = new PyraminxSimulator();

  return [geometry, simulator];
}

export function createPyraminxNet(
  options: PyraminxOptions = {}
): [PyraminxNet, PyraminxSimulator] {
  const geometry = new PyraminxNet(options.size);
  const simulator = new PyraminxSimulator();

  return [geometry, simulator];
}

export function createSkewb(
  options: SkewbOptions = {}
): [Skewb, SkewbSimulator] {
  const geometry = new Skewb();
  const simulator = new SkewbSimulator();

  return [geometry, simulator];
}

export function createSkewbNet(
  options: SkewbOptions = {}
): [SkewbNet, SkewbSimulator] {
  const geometry = new SkewbNet();
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
