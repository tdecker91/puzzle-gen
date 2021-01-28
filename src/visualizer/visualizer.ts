import { RED, BLUE, WHITE, ORANGE, GREEN } from './../puzzles/colors';
import { PyraminxNet } from './../puzzles/pyraminxNet';
import { VisualizerType } from "./enum";
import { PuzzleGeometry } from "./../puzzles/puzzleGeometry";
import {
  CubeOptions,
  SkewbOptions,
  MegaminxOptions,
  PyraminxOptions,
  Square1Options,
  PuzzleOptions,
} from "./interface";
import { Renderer } from "./../rendering/renderer";
import { Scene } from "../rendering/scene";
import { Camera } from "./../rendering/camera";
import { Simulator } from "../simulator/simulator";
import {
  createCube,
  createCubeNet,
  createMegaminx,
  createMegaminxNet,
  createPyraminx,
  createPyraminxNet,
  createSkewb,
  createSkewbNet,
  createSquare1,
  createSquare1Net,
} from "./puzzleCreator";
import { YELLOW } from '../puzzles/colors';

const defaultCubeOptions: CubeOptions = {
  size: 3,
  scheme: {
    U: YELLOW,
    R: RED,
    F: BLUE,
    D: WHITE,
    L: ORANGE,
    B: GREEN
  }
};

const defaultMegaminxOptions: MegaminxOptions = {
  size: 2,
};

const defaultPyraminxOptions: PyraminxOptions = {
  size: 3,
};

const defaultSkewbOptions: SkewbOptions = {};

const defaultSquare1Options: Square1Options = {};

function getDefaultOptions(type: VisualizerType): PuzzleOptions {
  switch (type) {
    case VisualizerType.CUBE:
    case VisualizerType.CUBE_NET:
      return defaultCubeOptions;
    case VisualizerType.MEGAMINX:
    case VisualizerType.MEGAMINX_NET:
      return defaultMegaminxOptions;
    case VisualizerType.PYRAMINX:
    case VisualizerType.PYRAMINX_NET:
      return defaultPyraminxOptions;
    case VisualizerType.SKEWB:
    case VisualizerType.SKEWB_NET:
      return defaultSkewbOptions;
    case VisualizerType.SQUARE1:
    case VisualizerType.SQUARE1_NET:
      return defaultSquare1Options;
  }
}

/**
 * Creates puzzle geometry and and simulator for a given puzzle type.
 * Will initialize the geometry and simulator based on puzzle options
 * passed in
 *
 * @param type Type of the puzzle {@link VisualizerType} (cube, skewb, etc...)
 * @param options  Puzzle options {@link PuzzleOptions}
 */
function puzzleFactory<T extends PuzzleOptions>(
  type: VisualizerType,
  options: T
): [PuzzleGeometry, Simulator] {
  switch (type) {
    case VisualizerType.CUBE:
      return createCube(options as CubeOptions);
    case VisualizerType.CUBE_NET:
      return createCubeNet(options as CubeOptions);
    case VisualizerType.MEGAMINX:
      return createMegaminx(options as MegaminxOptions) as any;
    case VisualizerType.MEGAMINX_NET:
      return createMegaminxNet(options as MegaminxOptions) as any;
    case VisualizerType.PYRAMINX:
      return createPyraminx(options as PyraminxOptions) as any;
    case VisualizerType.PYRAMINX_NET:
      return createPyraminxNet(options as PyraminxOptions) as any;
    case VisualizerType.SKEWB:
      return createSkewb(options as SkewbOptions) as any;
    case VisualizerType.SKEWB_NET:
      return createSkewbNet(options as SkewbOptions) as any;
    case VisualizerType.SQUARE1:
      return createSquare1(options as Square1Options) as any;
    case VisualizerType.SQUARE1_NET:
      return createSquare1Net(options as Square1Options) as any;
  }
}

/**
 * Encapsulates logic for setting up a puzzle environment for rendering
 * images. Sets up puzzle geometry, applies any algorithm or masking
 * if necessary, and renders the puzzle
 */
export class Visualizer {
  private camera: Camera;
  private scene: Scene;
  private renderer: Renderer;
  private type: VisualizerType;

  public puzzleGeometry: PuzzleGeometry;
  public simulator: Simulator;

  constructor(
    renderer: Renderer,
    type: VisualizerType,
    options: PuzzleOptions = {}
  ) {
    this.type = type;
    this.camera = new Camera();
    this.scene = new Scene();
    this.renderer = renderer;
    options = {...getDefaultOptions(type), ...options};

    [this.puzzleGeometry, this.simulator] = puzzleFactory(type, options);
    this.scene.add(this.puzzleGeometry.group);

    this.applyAlgorithm(options);

    this.render();
  }

  private applyAlgorithm(options: PuzzleOptions) {
    if (!options.alg) return;

    this.simulator.alg(options.alg);

    const faceValues = this.simulator.getValues();

    // Get sticker colors from simulator values
    const colors = Object.keys(faceValues).reduce((colors, face) => {
      colors[face] = faceValues[face].map(value => options.scheme[value])
      return colors;
    }, {});

    this.puzzleGeometry.setColors(colors)
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
