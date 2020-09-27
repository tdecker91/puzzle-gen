import { fillArray } from '../utils/arrays';
import { CUBE_FACES, CUBE_AXIS, CUBE_AXIS_FACES, AXIS_ORIENTATION } from './constants';
import { Simulator, TurnDefinitions } from './simulator';

export class RubiksCubeSimulator extends Simulator {

  private size: number;
  private gridSize: number;

  constructor(size: number) {
    super();

    this.size = size;
    this.gridSize = size * size;

    CUBE_FACES.forEach(faceName => {
      // Create stickers for face
      this.addFace(fillArray(this.gridSize, faceName), faceName);
      const faceChanges = this.makeFaceTurnDefinitions(faceName);

      // Create rotation for stickers on face only
      this.addTurn(faceChanges, faceName);
    });

    // Create rotations for stickers on each layer
    // around each turnable axis
    CUBE_AXIS.forEach(axis => {
      for (let column = 0; column < this.size; column++) {
        let layerChanges: TurnDefinitions = [];

        CUBE_AXIS_FACES[axis].forEach((faceName, i) => {
          const nextFaceName = CUBE_AXIS_FACES[axis][(i + 1) % CUBE_AXIS_FACES[axis].length];
          const nextFace = this.faces.get(nextFaceName);
          const currentFace = this.faces.get(faceName);

          for (let row = 0; row < this.size; row++) {
            const stickerIndex = (this.size * row) + column;
            const sticker1 = currentFace[this.axisAlignedSticker(axis, faceName, stickerIndex)];
            const sticker2 = nextFace[this.axisAlignedSticker(axis, nextFaceName, stickerIndex)];

            layerChanges.push(
              [sticker1, sticker2]
            )
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
      stickerIds[this.clockwiseSticker(i)]
    ]);
  }

  /**
   * Given sticker i return the index it will go to
   * after rotating clockwise
   * 
   * ex. stickers are stored in an array but represent a grid
   * so, for a 3x3 sticker index 0 will rotate to 2, 1 to 5, etc...
   * 
   *  0 | 1 | 2
   *  ----------
   *  3 | 4 | 5
   *  ----------
   *  6 | 7 | 8
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
    return this.gridSize - (stickerIndex + 1)
  }

  private axisAlignedSticker(axis: string, face: string, stickerIndex: number) {
    switch (AXIS_ORIENTATION[axis][face]) {
      case 0: return stickerIndex;
      case 1: return this.clockwiseSticker(stickerIndex);
      case 2: return this.oppositeSticker(stickerIndex);
      case -1: return this.counterClockwiseSticker(stickerIndex);
      default:
        throw `Invalid axis face orientation value ${AXIS_ORIENTATION[axis][face]}`;
    }
  }

  uTurn() {
    this.doTurn('U');
    this.doTurn(`Y-${this.size-1}`);
  }

  rTurn() {
    this.doTurn('R');
    this.doTurn(`X-${this.size-1}`);
  }

  fTurn() {
    this.doTurn('F');
    this.doTurn(`Z-0`);
  }

  dTurn() {
    this.doTurn('D');
    this.doTurn(`Y-0`, true);
  }

  lTurn() {
    this.doTurn('L');
    this.doTurn(`X-0`, true);
  }

  bTurn() {
    this.doTurn('B');
    this.doTurn(`Z-${this.size-1}`, true);
  }

  reset(): void {

  }
}