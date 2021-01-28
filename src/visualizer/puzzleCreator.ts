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

const defaultCubeOptions: CubeOptions = {
  size: 3,
};

const defaultMegaminxOptions: MegaminxOptions = {
  size: 2,
};

const defaultPyraminxOptions: PyraminxOptions = {
  size: 3,
};

const defaultSkewbOptions: SkewbOptions = {};

const defaultSquare1Options: Square1Options = {};

export function createCube(
  cubeOptions: CubeOptions = {}
): [RubiksCube, RubiksCubeSimulator] {
  const options = { ...defaultCubeOptions, ...cubeOptions };
  const geometry = new RubiksCube(options.size);
  const simulator = new RubiksCubeSimulator(options.size);

  return [geometry, simulator];
}

export function createCubeNet(
  cubeOptions: CubeOptions = {}
): [RubiksCubeNet, RubiksCubeSimulator] {
  const options = { ...defaultCubeOptions, ...cubeOptions };
  const geometry = new RubiksCubeNet(options.size);
  const simulator = new RubiksCubeSimulator(options.size);

  return [geometry, simulator];
}

export function createMegaminx(
  megaminxOptions: MegaminxOptions = {}
): [Megaminx, MegaminxSimulator] {
  const options = { ...defaultMegaminxOptions, ...megaminxOptions };
  const geometry = new Megaminx(options.size);
  const simulator = new MegaminxSimulator();

  return [geometry, simulator];
}

export function createMegaminxNet(
  megaminxOptions: MegaminxOptions = {}
): [MegaminxNet, MegaminxSimulator] {
  const options = { ...defaultMegaminxOptions, ...megaminxOptions };
  const geometry = new MegaminxNet(options.size);
  const simulator = new MegaminxSimulator();

  return [geometry, simulator];
}

export function createPyraminx(
  pyraminxOptions: PyraminxOptions = {}
): [Pyraminx, PyraminxSimulator] {
  const options = { ...defaultPyraminxOptions, ...pyraminxOptions };
  const geometry = new Pyraminx(options.size);
  const simulator = new PyraminxSimulator();

  return [geometry, simulator];
}

export function createPyraminxNet(
  pyraminxOptions: PyraminxOptions = {}
): [PyraminxNet, PyraminxSimulator] {
  const options = { ...defaultPyraminxOptions, ...pyraminxOptions };
  const geometry = new PyraminxNet(options.size);
  const simulator = new PyraminxSimulator();

  return [geometry, simulator];
}

export function createSkewb(
  skewbOptions: SkewbOptions = {}
): [Skewb, SkewbSimulator] {
  const options = { ...defaultSkewbOptions, ...skewbOptions };
  const geometry = new Skewb();
  const simulator = new PyraminxSimulator();

  return [geometry, simulator];
}

export function createSkewbNet(
  skewbOptions: SkewbOptions = {}
): [SkewbNet, SkewbSimulator] {
  const options = { ...defaultSkewbOptions, ...skewbOptions };
  const geometry = new SkewbNet();
  const simulator = new PyraminxSimulator();

  return [geometry, simulator];
}

export function createSquare1(
  sq1Options: Square1Options = {}
): [Square1, Square1Simualtor] {
  const options = { ...defaultSquare1Options, ...sq1Options };
  const geometry = new Square1();
  const simulator = new Square1Simualtor();

  return [geometry, simulator];
}

export function createSquare1Net(
  sq1Options: Square1Options = {}
): [Square1Net, Square1Simualtor] {
  const options = { ...defaultSquare1Options, ...sq1Options };
  const geometry = new Square1Net();
  const simulator = new Square1Simualtor();

  return [geometry, simulator];
}
