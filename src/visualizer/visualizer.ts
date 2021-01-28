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
      return createMegaminx(options as MegaminxOptions);
    case VisualizerType.MEGAMINX_NET:
      return createMegaminxNet(options as MegaminxOptions);
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
  }
}

/**
 * Encapsulates logic for setting up a puzzle environment for rendering
 * images. Sets up puzzle geometry, applies any algorithm or masking
 * if necessary, and renders the puzzle
 */
export class Visualizer {
  protected camera: Camera;
  protected scene: Scene;
  protected renderer: Renderer;

  protected puzzleGeometry: PuzzleGeometry;
  public simulator: Simulator;

  constructor(
    renderer: Renderer,
    type: VisualizerType,
    options: PuzzleOptions
  ) {
    this.camera = new Camera();
    this.scene = new Scene();
    this.renderer = renderer;

    [this.puzzleGeometry, this.simulator] = puzzleFactory(type, options);
    this.scene.add(this.puzzleGeometry.group);

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
