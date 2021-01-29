import { TurnType } from "../../algorithms/algorithm";
import { parseSkewbAlgorithm } from "../../algorithms/skewb";
import { fillArray } from "../../utils/arrays";
import { Simulator } from "./../simulator";

/**
 * Simulates a standard skewb
 *
 * Imagine the faces like this
 * ```
 *      U
 *    L F R B
 *      D
 * ```
 *
 * each face has 5 sickers (1 center, 4 corners), stored as
 * an array. Each index of the array maps to stickers like
 * so, 0 being the center, 1-4 being the corners from top left
 * to bottom right
 * ```
 *      1   2
 *        0
 *      3   4
 * ```
 *
 * So all together the simulator stores information like
 * this
 * ```
 *          U1    U2
 *             U0
 *          U3    U4
 * L1    L2 F1    F2 R1    R2 B1    B2
 *    L0       F0       R0       B0
 * L3    L4 F3    F4 F3    F4 B3    B4
 *          D1    D2
 *             D0
 *          D3    D4
 * ```
 */
export class SkewbSimulator extends Simulator {
  constructor() {
    super();

    const { stickerIds: top } = this.addFace(fillArray(5, "top"), "top");
    const { stickerIds: front } = this.addFace(fillArray(5, "front"), "front");
    const { stickerIds: right } = this.addFace(fillArray(5, "right"), "right");
    const { stickerIds: bottom } = this.addFace(
      fillArray(5, "bottom"),
      "bottom"
    );
    const { stickerIds: back } = this.addFace(fillArray(5, "back"), "back");
    const { stickerIds: left } = this.addFace(fillArray(5, "left"), "left");

    // Skewb Notation https://www.worldcubeassociation.org/regulations/#12h
    this.addTurn(
      [
        [right[0], back[0]],
        [right[2], back[4]],
        [right[3], back[1]],
        [right[4], back[3]],

        [back[0], bottom[0]],
        [back[4], bottom[2]],
        [back[1], bottom[3]],
        [back[3], bottom[4]],

        [bottom[0], right[0]],
        [bottom[2], right[2]],
        [bottom[3], right[3]],
        [bottom[4], right[4]],

        [front[4], top[2]],
        [top[2], left[3]],
        [left[3], front[4]],
      ],
      "R"
    );

    this.addTurn(
      [
        [center(top), center(left)],
        [topLeft(top), topLeft(left)],
        [topRight(top), topRight(left)],
        [bottomLeft(top), bottomLeft(left)],

        [center(left), center(back)],
        [topLeft(left), topRight(back)],
        [topRight(left), bottomRight(back)],
        [bottomLeft(left), topLeft(back)],

        [center(back), center(top)],
        [topRight(back), topLeft(top)],
        [bottomRight(back), topRight(top)],
        [topLeft(back), bottomLeft(top)],

        [topRight(right), topLeft(front)],
        [topLeft(front), bottomLeft(bottom)],
        [bottomLeft(bottom), topRight(right)],
      ],
      "U"
    );

    this.addTurn(
      [
        [center(left), center(front)],
        [bottomLeft(left), topLeft(front)],
        [topRight(left), bottomRight(front)],
        [bottomRight(left), bottomLeft(front)],

        [center(front), center(bottom)],
        [topLeft(front), topRight(bottom)],
        [bottomRight(front), bottomLeft(bottom)],
        [bottomLeft(front), topLeft(bottom)],

        [center(bottom), center(left)],
        [topRight(bottom), bottomLeft(left)],
        [bottomLeft(bottom), topRight(left)],
        [topLeft(bottom), bottomRight(left)],

        [bottomRight(back), bottomLeft(top)],
        [bottomLeft(top), bottomLeft(right)],
        [bottomLeft(right), bottomRight(back)],
      ],
      "L"
    );

    this.addTurn(
      [
        [center(back), center(left)],
        [topRight(back), bottomRight(left)],
        [bottomLeft(back), topLeft(left)],
        [bottomRight(back), bottomLeft(left)],

        [center(left), center(bottom)],
        [bottomRight(left), bottomRight(bottom)],
        [topLeft(left), topLeft(bottom)],
        [bottomLeft(left), bottomLeft(bottom)],

        [center(bottom), center(back)],
        [bottomRight(bottom), topRight(back)],
        [topLeft(bottom), bottomLeft(back)],
        [bottomLeft(bottom), bottomRight(back)],

        [topLeft(top), bottomLeft(front)],
        [bottomLeft(front), bottomRight(right)],
        [bottomRight(right), topLeft(top)],
      ],
      "B"
    );
  }

  R(reverse?: boolean) {
    this.doTurn("R", reverse);
  }

  U(reverse?: boolean) {
    this.doTurn("U", reverse);
  }

  L(reverse?: boolean) {
    this.doTurn("L", reverse);
  }

  B(reverse?: boolean) {
    this.doTurn("B", reverse);
  }

  alg(alg: string) {
    if (!alg) {
      return;
    }

    parseSkewbAlgorithm(alg).forEach((turn) => {
      let reverse = turn.turnType === TurnType.CounterClockwise;

      switch (turn.unit) {
        case "R":
          this.R(reverse);
          break;
        case "U":
          this.U(reverse);
          break;
        case "L":
          this.L(reverse);
          break;
        case "B":
          this.B(reverse);
          break;
      }
    });
  }
}

const center = (face): string => face[0];
const topLeft = (face): string => face[1];
const topRight = (face): string => face[2];
const bottomLeft = (face): string => face[3];
const bottomRight = (face): string => face[4];
