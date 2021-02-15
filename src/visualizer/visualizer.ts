import { Square1 } from "./../puzzles/square1/square1";
import { Geometry } from "./../geometry/geometry";
import { Arrow } from "./../geometry/arrow";
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
  ArrowDefinition,
  validatePuzzleOptions,
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
  createMegaminxTop,
  createPyraminx,
  createPyraminxNet,
  createSkewb,
  createSkewbNet,
  createSquare1,
  createSquare1Net,
} from "./puzzleCreator";
import { IColor } from "../geometry/color";
import { applyTransformations } from "../rendering/utils";
import { Group } from "../geometry/group";

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
  }
}

function isSquare1(type: VisualizerType) {
  return type === VisualizerType.SQUARE1 || type === VisualizerType.SQUARE1_NET;
}

function isPyraminx(type: VisualizerType) {
  return type === VisualizerType.PYRAMINX || type === VisualizerType.PYRAMINX_NET;
}

function isMegaminx(type: VisualizerType) {
  return type === VisualizerType.MEGAMINX ||
    type === VisualizerType.MEGAMINX_NET ||
    type === VisualizerType.MEGAMINX_TOP;
}

/**
 * Return true if we can apply simulator colors. Currently
 * we don't simulate n-layered megaminx/pyraminx.
 */
function canApplySimulatorColors(type: VisualizerType, size: number) {
  if (isPyraminx(type)) {
    return size === 3;
  }

  if (isMegaminx(type)) {
    return size === 2;
  }

  return true;
}

function createArrow(a: ArrowDefinition, puzzle: PuzzleGeometry): Arrow {
  // Get the face the arrow is pointing to
  let startFace = puzzle.faces[a.start.face];
  let endFace = puzzle.faces[a.end.face];

  if (!startFace || !endFace) {
    throw new Error(`Invalid arrow definition ${JSON.stringify(a)}`);
  }

  let startTransformations = [startFace.matrix, puzzle.group.matrix];
  let endTransformations = [endFace.matrix, puzzle.group.matrix];

  let start: vec3;
  let end: vec3;

  // Get the stickers on the face
  if (startFace instanceof Geometry && endFace instanceof Geometry) {
    start = startFace.faces[a.start.sticker]?.centroid;
    end = endFace.faces[a.end.sticker]?.centroid;
  } else {
    if (puzzle instanceof Square1) {
      start = (startFace as any).objects[a.start.sticker]?.faces[0].centroid;
      end = (endFace as any).objects[a.end.sticker]?.faces[0].centroid;
    } else {
      start = (startFace as Group).objects[a.start.sticker]?.centroid;
      end = (endFace as Group).objects[a.end.sticker]?.centroid;
    }
    startTransformations.unshift(
      (startFace as Group).objects[a.start.sticker]?.matrix
    );
    endTransformations.unshift(
      (endFace as Group).objects[a.end.sticker]?.matrix
    );
  }

  if (!start || !end) {
    throw new Error(`Invalid arrow definition ${JSON.stringify(a)}`);
  }

  let p1 = applyTransformations(start, startTransformations);
  let p2 = applyTransformations(end, endTransformations);

  return new Arrow(p1, p2);
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
    const hasCustomColors = this.options.stickerColors && !isSquare1(this.type);
    const canUseSimulator = canApplySimulatorColors(this.type, (<any>this.options).size);

    if (hasCustomColors) {
      this.puzzleGeometry.setColors(this.options.stickerColors);
    } else if (canUseSimulator) {
      this.applySimulatorColors();
    } else {
      // Apply scheme to puzzle geomety manually, for puzzles
      // not supported by simulators (megaminx != 2 pyraminx != 3)
      const faces = this.puzzleGeometry.faces;
      Object.keys(faces).forEach(face => {
        const stickers = faces[face];
        const faceColor = this.options.scheme[face];
        if (stickers instanceof Geometry) {
          stickers.faces.forEach(f => f.color = faceColor);
        } else if (stickers instanceof Group) {
          stickers.objects.forEach(o => o.color = faceColor);
        }
      });
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

  /**
   * build the group matrix for the puzzle. This sets up the
   * rotation, scale, and translation for the resulting rendered
   * image.
   */
  private buildGroupMatrix() {
    // Rotate the group matrix
    if (this.options.rotations) {
      let matrix = mat4.create();
      this.options.rotations.forEach((rotation) => {
        const { x = 0, y = 0, z = 0 } = rotation;
        mat4.mul(
          matrix,
          mat4.fromQuat(mat4.create(), quat.fromEuler(quat.create(), x, y, z)),
          matrix
        );
      });

      mat4.mul(this.puzzleGeometry.group.matrix, mat4.create(), matrix);
    }

    // Scale the group matrix
    if (this.options.scale) {
      let scale = this.options.scale;
      mat4.scale(
        this.puzzleGeometry.group.matrix,
        this.puzzleGeometry.group.matrix,
        vec3.fromValues(scale, scale, scale)
      );
    }

    // Translate the group matrix
    if (this.options.translation) {
      const { x = 0, y = 0, z = 0 } = this.options.translation;
      let translationMatrix = mat4.fromTranslation(
        mat4.create(),
        vec3.fromValues(x, y, z)
      );

      mat4.mul(
        this.puzzleGeometry.group.matrix,
        translationMatrix,
        this.puzzleGeometry.group.matrix
      );
    }
  }

  private addArrows() {
    if (!this.options.arrows) {
      return;
    }

    this.options.arrows.forEach((arrow) => {
      try {
        this.scene.add(createArrow(arrow, this.puzzleGeometry));
      } catch {
        console.warn(`Invalid arrow ${JSON.stringify(arrow)}`);
      }
    });
  }

  setPuzzleOptions(options: PuzzleOptions) {
    this.options = { ...getDefaultOptions(this.type), ...options };
    validatePuzzleOptions(this.options);

    [this.puzzleGeometry, this.simulator] = puzzleFactory(
      this.type,
      this.options
    );
    this.buildGroupMatrix();
    this.applyColors();

    this.scene.clear();
    this.scene.add(this.puzzleGeometry.group);

    this.addArrows();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
