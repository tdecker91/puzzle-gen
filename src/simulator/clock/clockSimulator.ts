import {
  ClockCorner,
  ClockMoveType,
  parseClockAlgorithm,
} from "../../algorithms/clock";
import { Simulator } from "../simulator";

type Dial = "UR" | "UL" | "DR" | "DL";
type TurnValue =
  | -1
  | -2
  | -3
  | -4
  | -5
  | -6
  | -7
  | -8
  | -9
  | -10
  | -11
  | -12
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;
type Peg = 0 | 1 | 2 | 3;

enum PegState {
  Top,
  Bottom,
}

// map of how the dials will turn based on the peg configuration
const dialConfigs = {
  UR: {
    "0000": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "0001": [1, 2, 3, 4, 5, 6, 7, 8],
    "0010": [2],
    "0011": [0, 2],
    "0100": [0, 1, 2, 3, 4, 5, 7, 8],
    "0101": [1, 2, 4, 5, 7, 8],
    "0110": [2, 6],
    "0111": [0, 2, 6],
    "1000": [0, 1, 2, 3, 4, 5, 6, 7],
    "1001": [1, 2, 3, 4, 5, 6, 7],
    "1010": [2, 8],
    "1011": [0, 2, 8],
    "1100": [0, 1, 2, 3, 4, 5],
    "1101": [1, 2, 4, 5],
    "1110": [2, 6, 8],
    "1111": [0, 2, 6, 8],
  },
  UL: {
    "0000": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "0001": [0],
    "0010": [0, 1, 3, 4, 5, 6, 7, 8],
    "0011": [0, 2],
    "0100": [0, 1, 2, 3, 4, 5, 7, 8],
    "0101": [0, 6],
    "0110": [0, 1, 3, 4, 7, 8],
    "0111": [0, 2, 6],
    "1000": [0, 1, 2, 3, 4, 5, 6, 7],
    "1001": [0, 8],
    "1010": [0, 1, 3, 4, 6, 7],
    "1011": [0, 2, 8],
    "1100": [0, 1, 2, 3, 4, 5],
    "1101": [0, 6, 8],
    "1110": [0, 1, 3, 4],
    "1111": [0, 2, 6, 8],
  },
  DR: {
    "0000": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "0001": [1, 2, 3, 4, 5, 6, 7, 8],
    "0010": [0, 1, 3, 4, 5, 6, 7, 8],
    "0011": [3, 4, 5, 6, 7, 8],
    "0100": [0, 1, 2, 3, 4, 5, 7, 8],
    "0101": [1, 2, 4, 5, 7, 8],
    "0110": [0, 1, 3, 4, 7, 8],
    "0111": [4, 5, 7, 8],
    "1000": [8],
    "1001": [0, 8],
    "1010": [2, 8],
    "1011": [0, 2, 8],
    "1100": [6, 8],
    "1101": [0, 6, 8],
    "1110": [2, 6, 8],
    "1111": [0, 2, 6, 8],
  },
  DL: {
    "0000": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "0001": [1, 2, 3, 4, 5, 6, 7, 8],
    "0010": [0, 1, 3, 4, 5, 6, 7, 8],
    "0011": [3, 4, 5, 6, 7, 8],
    "0100": [6],
    "0101": [0, 6],
    "0110": [2, 6],
    "0111": [0, 2, 6],
    "1000": [0, 1, 2, 3, 4, 5, 6, 7],
    "1001": [1, 2, 3, 4, 5, 6, 7],
    "1010": [0, 1, 3, 4, 6, 7],
    "1011": [3, 4, 6, 7],
    "1100": [6, 8],
    "1101": [0, 6, 8],
    "1110": [2, 6, 8],
    "1111": [0, 2, 6, 8],
  },
};

export class ClockSimulator extends Simulator {
  top: number[];
  bottom: number[];
  pegs: PegState[];
  flipped: boolean;

  constructor() {
    super();
    // Values from 0 - 11
    this.top = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.bottom = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    // pegs order is UL, UR, DL, DR
    this.pegs = [PegState.Top, PegState.Top, PegState.Top, PegState.Top];

    this.flipped = false;
  }

  private rotateDials(top: number[], bottom: number[], turns: number) {
    top.forEach((i) => {
      this.top[i] = (12 + (this.top[i] + turns)) % 12;
    });
    bottom.forEach((i) => {
      this.bottom[i] = (12 + (this.bottom[i] - turns)) % 12;
    });
  }

  private stringifyPegs(pegs): string {
    return pegs
      .map((p) => (p == PegState.Top ? "0" : "1"))
      .reverse()
      .join("");
  }

  /**
   * returns peg state for the back side of the clock.
   * This is used when performing y2 or to know the state
   * when rotating the back dials
   */
  private invertPegState() {
    let oppositePegState = (state: PegState) => {
      switch (state) {
        case PegState.Top:
          return PegState.Bottom;
        case PegState.Bottom:
          return PegState.Top;
      }
    };

    return [this.pegs[1], this.pegs[0], this.pegs[3], this.pegs[2]].map((ps) =>
      oppositePegState(ps)
    );
  }

  /**
   * Returns the dial on the bottom. For example top UR is the same as Bottom UL
   */
  private invertTurnDial(dial: Dial): Dial {
    return {
      UL: "UR",
      UR: "UL",
      DL: "DR",
      DR: "DL",
    }[dial] as Dial;
  }

  // /**
  //  * clock dials are stored in array of 9 values. Given an index for
  //  * a dial on the top face this will return an index for the dial that is
  //  * underneath.
  //  */
  // private invertClockDial(clockDial: number) {
  //   return [2,1,0, 5,4,3, 8,7,6][clockDial];
  // }

  private turn(dial: Dial, value: TurnValue) {
    // Top
    const pegState = this.stringifyPegs(this.pegs);
    const dialsToTurn = dialConfigs[dial][pegState];

    // Bottom
    const bottomPegState = this.invertPegState();
    const bottomDial: Dial = this.invertTurnDial(dial);
    const bottomClocksToTurn =
      dialConfigs[bottomDial][this.stringifyPegs(bottomPegState)];

    console.log(
      "bottom turn",
      bottomPegState,
      this.stringifyPegs(bottomPegState),
      bottomDial,
      bottomClocksToTurn
    );

    this.rotateDials(dialsToTurn, bottomClocksToTurn, value);
  }

  /**
   * Sets all four pegs of the clock
   *
   * @param ul true if ur peg should be "UP"
   * @param ur ...
   * @param dl ...
   * @param dr ...
   */
  setPegs(ul: boolean, ur: boolean, dl: boolean, dr: boolean) {
    this.pegs = [ul, ur, dl, dr].map((shouldBeUp) => {
      if (shouldBeUp) {
        return PegState.Top;
      } else {
        return PegState.Bottom;
      }
    });
  }

  togglePeg(peg: Peg) {
    if (this.pegs[peg] == PegState.Top) {
      this.pegs[peg] = PegState.Bottom;
    } else {
      this.pegs[peg] = PegState.Top;
    }
  }

  UR(turns: TurnValue) {
    this.turn("UR", turns);
  }

  DR(turns: TurnValue) {
    this.turn("DR", turns);
  }

  UL(turns: TurnValue) {
    this.turn("UL", turns);
  }

  DL(turns: TurnValue) {
    this.turn("DL", turns);
  }

  y2() {
    this.flipped = !this.flipped;
    let temp = this.top;
    this.top = this.bottom;
    this.bottom = temp;

    this.pegs = this.invertPegState();
  }

  case(alg: string) {
    parseClockAlgorithm(alg)
      .map((move) => ({ 
        ...move,
        clockwise: !move.clockwise,
        value: move.value * -1
      }))
      .reverse()
      .forEach((move) => {
        this.doClockMove(move);
      });
  }

  alg(alg: string) {
    parseClockAlgorithm(alg).forEach((move) => {
      this.doClockMove(move);
    });
  }

  private doClockMove(move) {
    console.log("doing clock move", move);
    if (move.type == ClockMoveType.ROTATE) {
      this.y2();
    } else {
      // set pegs
      switch (move.corner) {
        case ClockCorner.ALL:
          this.setPegs(true, true, true, true);
          break;
        case ClockCorner.UR:
          this.setPegs(false, true, false, false);
          break;
        case ClockCorner.DR:
          this.setPegs(false, false, false, true);
          break;
        case ClockCorner.DL:
          this.setPegs(false, false, true, false);
          break;
        case ClockCorner.UL:
          this.setPegs(true, false, false, false);
          break;
        case ClockCorner.U:
          this.setPegs(true, true, false, false);
          break;
        case ClockCorner.D:
          this.setPegs(false, false, true, true);
          break;
        case ClockCorner.R:
          this.setPegs(false, true, false, true);
          break;
        case ClockCorner.L:
          this.setPegs(true, false, true, false);
          break;
      }

      // rotate correct number of values
      switch (move.corner) {
        case ClockCorner.ALL:
        case ClockCorner.UR:
        case ClockCorner.U:
        case ClockCorner.R:
          this.UR(move.value as TurnValue);
          break;

        case ClockCorner.DR:
        case ClockCorner.D:
          this.DR(move.value as TurnValue);
          break;

        case ClockCorner.DL:
        case ClockCorner.L:
          this.DL(move.value as TurnValue);
          break;

        case ClockCorner.UL:
          this.UL(move.value as TurnValue);
          break;
      }
    }
  }
}
