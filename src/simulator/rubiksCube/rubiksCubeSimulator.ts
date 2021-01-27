import { fillArray } from "../../utils/arrays";
import {
  CUBE_FACES,
  CUBE_AXIS,
  CUBE_AXIS_FACES,
  AXIS_ORIENTATION,
  SIMULATOR_FACE,
  AXIS_FACE_ORIENTATION,
} from "./constants";
import { Simulator, TurnDefinitions } from "../simulator";
import { range } from "../../math/utils";

export class RubiksCubeSimulator extends Simulator {
  private size: number;
  private gridSize: number;

  constructor(size: number) {
    super();

    this.size = size;
    this.gridSize = size * size;

    CUBE_FACES.forEach((faceName) => {
      // Create stickers for face
      this.addFace(fillArray(this.gridSize, faceName), faceName);
      const faceChanges = this.makeFaceTurnDefinitions(faceName);

      // Create rotation for stickers on face only
      this.addTurn(faceChanges, faceName);
    });

    // Create rotations for stickers on each layer
    // around each turnable axis
    [CUBE_AXIS.X, CUBE_AXIS.Y, CUBE_AXIS.Z].forEach((axis) => {
      for (let column = 0; column < this.size; column++) {
        let layerChanges: TurnDefinitions = [];

        CUBE_AXIS_FACES[axis].forEach((faceName, i) => {
          const nextFaceName =
            CUBE_AXIS_FACES[axis][(i + 1) % CUBE_AXIS_FACES[axis].length];
          const nextFace = this.faces.get(nextFaceName);
          const currentFace = this.faces.get(faceName);

          for (let row = 0; row < this.size; row++) {
            const stickerIndex = this.size * row + column;
            const sticker1 =
              currentFace[
                this.axisAlignedSticker(axis, faceName, stickerIndex)
              ];
            const sticker2 =
              nextFace[
                this.axisAlignedSticker(axis, nextFaceName, stickerIndex)
              ];

            layerChanges.push([sticker1, sticker2]);
          }
        });

        this.addTurn(layerChanges, `${axis}-${column}`);
      }
    });
  }

  /**
   * Makes turn definitions for a face of the cube
   *
   * @param faceName the label of the face to make turn definitions
   * @example returning turn definitions for stickers on a 2x2
   * ```
   * addFace(['y', 'y', 'y', 'y'], 'U');
   * // returns { faceId: 'U', stickerIds: ['1','2','3','4'] }
   *
   * makeTurnDefinitions('U');
   * // returns [
   * //   ['1','2'],
   * //   ['2','4'],
   * //   ['3','1'],
   * //   ['4','3']
   * // ]
   * ```
   */
  private makeFaceTurnDefinitions(faceName: string): TurnDefinitions {
    const stickerIds = this.faces.get(faceName);

    return stickerIds.map((stickerId, i) => [
      stickerId,
      stickerIds[this.clockwiseSticker(i)],
    ]);
  }

  /**
   * Given sticker i return the index it will go to
   * after rotating clockwise
   *
   * ex. stickers are stored in an array but represent a grid
   * so, for a 3x3 sticker index 0 will rotate to 2, 1 to 5, etc...
   *
   * ```
   *  0 | 1 | 2
   *  ----------
   *  3 | 4 | 5
   *  ----------
   *  6 | 7 | 8
   * ```
   */
  private clockwiseSticker(stickerIndex): number {
    return (((stickerIndex + 1) * this.size) % (this.gridSize + 1)) - 1;
  }

  /**
   * Given sticker i return the index it will go to
   * after rotating counterclockwise
   */
  private counterClockwiseSticker(stickerIndex): number {
    return this.oppositeSticker(this.clockwiseSticker(stickerIndex));
  }

  /**
   * Given sticker i return the index it will go to
   * after rotating 180 degrees
   */
  private oppositeSticker(stickerIndex): number {
    return this.gridSize - (stickerIndex + 1);
  }

  private axisAlignedSticker(axis: string, face: string, stickerIndex: number) {
    switch (AXIS_ORIENTATION[axis][face]) {
      case 0:
        return stickerIndex;
      case 1:
        return this.clockwiseSticker(stickerIndex);
      case 2:
        return this.oppositeSticker(stickerIndex);
      case -1:
        return this.counterClockwiseSticker(stickerIndex);
      default:
        throw `Invalid axis face orientation value ${AXIS_ORIENTATION[axis][face]}`;
    }
  }

  /**
   * Performs a turn on a given face.
   *
   * @param face the face to turn
   * @param axis axis to perform inner layer turns on
   * @param reverse true if you want to turn the face counter clockwise
   * @param from inner layer to start turning from
   * @param to last inner layer to stop turning
   * @param to last inner layer to stop turning
   */
  private turnFace(
    face: SIMULATOR_FACE,
    axis: CUBE_AXIS,
    reverse: boolean,
    from: number,
    to: number
  ) {
    if (Math.abs(to - from) >= this.size - 1) {
      console.error(
        `Invalid number of layers to turn, skipping turn.; face=${face}, layers=${
          Math.abs(to - from) + 1
        }`
      );
      return;
    }

    // Rotate face
    this.doTurn(face, reverse);
    // Turn inner layers
    range(from, to).forEach((layer) => {
      this.doTurn(
        `${axis}-${layer}`,
        AXIS_FACE_ORIENTATION[face] ? !reverse : reverse
      );
    });
  }

  /**
   * Performs a U turn
   * @param reverse true if you want to turn the face counter clockwise (U')
   * @param layers how many inner layers of the face to turn defaults to 1. Cannot be the cube size or greater
   */
  U(reverse: boolean = false, layers: number = 1) {
    this.turnFace(
      SIMULATOR_FACE.U,
      CUBE_AXIS.Y,
      reverse,
      this.size - 1,
      this.size - layers
    );
  }

  /**
   * Performs an R turn
   * @param reverse true if you want to turn the face counter clockwise (R')
   * @param layers how many inner layers of the face to turn defaults to 1. Cannot be the cube size or greater
   */
  R(reverse: boolean = false, layers: number = 1) {
    this.turnFace(
      SIMULATOR_FACE.R,
      CUBE_AXIS.X,
      reverse,
      this.size - 1,
      this.size - layers
    );
  }

  /**
   * Performs an F turn
   * @param reverse true if you want to turn the face counter clockwise (F')
   * @param layers how many inner layers of the face to turn defaults to 1. Cannot be the cube size or greater
   */
  F(reverse: boolean = false, layers: number = 1) {
    this.turnFace(SIMULATOR_FACE.F, CUBE_AXIS.Z, reverse, 0, layers - 1);
  }

  /**
   * Performs a D turn
   * @param reverse true if you want to turn the face counter clockwise (D')
   * @param layers how many inner layers of the face to turn defaults to 1. Cannot be the cube size or greater
   */
  D(reverse: boolean = false, layers: number = 1) {
    this.turnFace(SIMULATOR_FACE.D, CUBE_AXIS.Y, reverse, 0, layers - 1);
  }

  /**
   * Performs an L turn
   * @param reverse true if you want to turn the face counter clockwise (L')
   * @param layers how many inner layers of the face to turn defaults to 1. Cannot be the cube size or greater
   */
  L(reverse: boolean = false, layers: number = 1) {
    this.turnFace(SIMULATOR_FACE.L, CUBE_AXIS.X, reverse, 0, layers - 1);
  }

  /**
   * Performs a B turn
   * @param reverse true if you want to turn the face counter clockwise (B')
   * @param layers how many inner layers of the face to turn defaults to 1. Cannot be the cube size or greater
   */
  B(reverse: boolean = false, layers: number = 1) {
    this.turnFace(
      SIMULATOR_FACE.B,
      CUBE_AXIS.Z,
      reverse,
      this.size - 1,
      this.size - layers
    );
  }

  /**
   * Rotates the middle slice in the direction of an L turn
   * https://ruwix.com/the-rubiks-cube/notation/advanced/
   *
   * Will rotate all middle layers inbetween R and L for larger cubes
   */
  M(reverse: boolean = false) {
    for (let layer = 1; layer < this.size - 1; layer++) {
      this.doTurn(`${CUBE_AXIS.X}-${layer}`, !reverse);
    }
  }

  /**
   * Rotates the standing layers in the direction of an F turn
   * https://ruwix.com/the-rubiks-cube/notation/advanced/
   *
   * Will rotate all middle layers inbetween F and B for larger cubes
   */
  S(reverse: boolean = false) {
    for (let layer = 1; layer < this.size - 1; layer++) {
      this.doTurn(`${CUBE_AXIS.Z}-${layer}`, reverse);
    }
  }

  /**
   * Rotates the equitorial layers in the direction of a D turn
   * https://ruwix.com/the-rubiks-cube/notation/advanced/
   *
   * Will rotate all middle layers inbetween U and D for larger cubes
   */
  E(reverse: boolean = false) {
    for (let layer = 1; layer < this.size - 1; layer++) {
      this.doTurn(`${CUBE_AXIS.Y}-${layer}`, !reverse);
    }
  }

  /**
   * rotates the entire cube on R
   */
  X(reverse: boolean = false) {
    this.doTurn("R", reverse);
    this.doTurn("L", !reverse);
    for (let layer = 0; layer < this.size; layer++) {
      this.doTurn(`${CUBE_AXIS.X}-${layer}`, reverse);
    }
  }

  /**
   * rotates the entire cube on U
   */
  Y(reverse: boolean = false) {
    this.doTurn("U", reverse);
    this.doTurn("D", !reverse);
    for (let layer = 0; layer < this.size; layer++) {
      this.doTurn(`${CUBE_AXIS.Y}-${layer}`, reverse);
    }
  }

  /**
   * rotates the entire cube on F
   */
  Z(reverse: boolean = false) {
    this.doTurn("F", reverse);
    this.doTurn("B", !reverse);
    for (let layer = 0; layer < this.size; layer++) {
      this.doTurn(`${CUBE_AXIS.Z}-${layer}`, reverse);
    }
  }

  reset(): void {
    this.faces.forEach((stickerIds, faceName) => {
      stickerIds.forEach((stickerId) => {
        this.stickers.set(stickerId, faceName);
      });
    });
  }
}
