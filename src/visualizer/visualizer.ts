import { getDefaultOptions } from "./options";
import { mat4, quat, vec3 } from "gl-matrix";
import { MASK_COLOR } from "./../puzzles/colors";
import { VisualizerType } from "./enum";
import { PuzzleGeometry } from "./../puzzles/puzzleGeometry";
import {
  CubeOptions,
  SkewbOptions,
  MegaminxOptions,
  PyraminxOptions,
  Square1Options,
  PuzzleOptions,
  ColorScheme,
} from "./interface";
import { Renderer } from "./../rendering/renderer";
import { Scene } from "../rendering/scene";
import { Camera } from "./../rendering/camera";
import { Simulator, SimulatorValues } from "../simulator/simulator";
import {
  createCube,
  createCubeNet,
  createCubeTop,
  createMegaminx,
  createMegaminxNet,
  createPyraminx,
  createPyraminxNet,
  createSkewb,
  createSkewbNet,
  createSquare1,
  createSquare1Net,
} from "./puzzleCreator";
import { IColor } from "../geometry/color";

/**
 * Applies a color scheme to simulator values
 *
 * @param faceValues face values from the simulator
 * @param scheme color scheme to
 */
function applyColorScheme(
  faceValues: SimulatorValues,
  scheme: ColorScheme
): { [face: string]: IColor[] } {
  return Object.keys(faceValues).reduce((colors, face) => {
    colors[face] = faceValues[face].map((value) => scheme[value] || MASK_COLOR);
    return colors;
  }, {});
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
    case VisualizerType.CUBE_TOP:
      return createCubeTop(options as CubeOptions);
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

function isSquare1(type: VisualizerType) {
  return type === VisualizerType.SQUARE1 || type === VisualizerType.SQUARE1_NET;
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
  protected type: VisualizerType;
  protected options: PuzzleOptions;

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
    this.setPuzzleOptions(options);
    this.render();
  }

  private applyColors() {
    if (this.options.stickerColors && !isSquare1(this.type)) {
      this.puzzleGeometry.setColors(this.options.stickerColors);
    } else {
      this.applySimulatorColors();
    }
  }

  private applySimulatorColors() {
    if (this.options.mask) this.applyMask(this.options);
    if (this.options.alg || this.options.case) this.applyAlgorithm();

    const faceValues = this.simulator.getValues();
    const faceColors = applyColorScheme(faceValues, this.options.scheme);

    this.puzzleGeometry.setColors(faceColors);
  }

  private applyAlgorithm() {
    if (isSquare1(this.type)) {
      // puzzle factory applies algorithm to square 1 when greating the puzzle geometry
      return;
    }

    if (this.options.case) {
      this.simulator.case(this.options.case);
    } else if (this.options.alg) {
      this.simulator.alg(this.options.alg);
    }
  }

  private applyMask(options: PuzzleOptions) {
    Object.keys(options.mask).forEach((maskedFace) => {
      options.mask[maskedFace].forEach((index) =>
        this.simulator.setValue(maskedFace, index, "mask")
      );
    });
  }

  setPuzzleOptions(options: PuzzleOptions) {
    this.options = { ...getDefaultOptions(this.type), ...options };

    [this.puzzleGeometry, this.simulator] = puzzleFactory(
      this.type,
      this.options
    );
    this.scene.clear();
    this.scene.add(this.puzzleGeometry.group);

    if (this.options.rotations) {
      let matrix = mat4.create();
      this.options.rotations.forEach((rotation) => {
        const { x, y, z } = rotation;
        mat4.mul(
          matrix,
          mat4.fromQuat(mat4.create(), quat.fromEuler(quat.create(), x, y, z)),
          matrix
        );
      });

      mat4.mul(this.puzzleGeometry.group.matrix, mat4.create(), matrix);
    }

    this.applyColors();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
