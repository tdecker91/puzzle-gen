import { Turn, TurnType } from "./../../algorithms/algorithm";
import { MEGAMINX_FACES } from "./constants";
import { Simulator, Pair } from "./../simulator";
import { fillArray } from "../../utils/arrays";
import { parseMegaminxAlgorithm } from "../../algorithms/megaminx";

/**
 * Simulator to define megaminx type puzzles
 *
 * Currently only standard megaminx size supported.
 */
export class MegaminxSimulator extends Simulator {
  constructor() {
    super();

    MEGAMINX_FACES.forEach((faceName) => {
      this.addFace(fillArray(11, faceName), faceName);
    });

    const U = this.faces.get("U"); // White
    const R = this.faces.get("R"); // Blue
    const F = this.faces.get("F"); // Red
    const dr = this.faces.get("dr"); // Pink
    const dl = this.faces.get("dl"); // Light Yellow
    const L = this.faces.get("L"); // Green
    const d = this.faces.get("d"); // Gray
    const br = this.faces.get("br"); // Light Green
    const BR = this.faces.get("BR"); // Yellow
    const BL = this.faces.get("BL"); // Purple
    const bl = this.faces.get("bl"); // Dark Blue
    const b = this.faces.get("b"); // Orange

    // R
    this.addTurn(
      [
        [F[2], U[6]],
        [F[1], U[5]],
        [F[10], U[4]],
        [U[6], BR[10]],
        [U[5], BR[9]],
        [U[4], BR[8]],
        [BR[10], br[8]],
        [BR[9], br[7]],
        [BR[8], br[6]],
        [br[8], dr[2]],
        [br[7], dr[1]],
        [br[6], dr[10]],
        [dr[2], F[2]],
        [dr[1], F[1]],
        [dr[10], F[10]],

        ...makeFaceTurnDefinitions(R),
      ],
      "R"
    );

    // F
    this.addTurn(
      [
        [U[2], R[2]],
        [U[3], R[3]],
        [U[4], R[4]],
        [R[2], dr[2]],
        [R[3], dr[3]],
        [R[4], dr[4]],
        [dr[2], dl[2]],
        [dr[3], dl[3]],
        [dr[4], dl[4]],
        [dl[2], L[2]],
        [dl[3], L[3]],
        [dl[4], L[4]],
        [L[2], U[2]],
        [L[3], U[3]],
        [L[4], U[4]],

        ...makeFaceTurnDefinitions(F),
      ],
      "F"
    );

    // U
    this.addTurn(
      [
        [F[2], L[4]],
        [F[3], L[5]],
        [F[4], L[6]],
        [L[4], BL[8]],
        [L[5], BL[9]],
        [L[6], BL[10]],
        [BL[8], BR[6]],
        [BL[9], BR[7]],
        [BL[10], BR[8]],
        [BR[6], R[10]],
        [BR[7], R[1]],
        [BR[8], R[2]],
        [R[10], F[2]],
        [R[1], F[3]],
        [R[2], F[4]],

        ...makeFaceTurnDefinitions(U),
      ],
      "U"
    );

    // L
    this.addTurn(
      [
        [F[4], dl[4]],
        [F[5], dl[5]],
        [F[6], dl[6]],
        [dl[4], bl[8]],
        [dl[5], bl[9]],
        [dl[6], bl[10]],
        [bl[8], BL[6]],
        [bl[9], BL[7]],
        [bl[10], BL[8]],
        [BL[6], U[10]],
        [BL[7], U[1]],
        [BL[8], U[2]],
        [U[10], F[4]],
        [U[1], F[5]],
        [U[2], F[6]],

        ...makeFaceTurnDefinitions(L),
      ],
      "L"
    );

    // BR
    this.addTurn(
      [
        [U[6], BL[10]],
        [U[7], BL[1]],
        [U[8], BL[2]],
        [BL[10], b[8]],
        [BL[1], b[9]],
        [BL[2], b[10]],
        [b[8], br[4]],
        [b[9], br[5]],
        [b[10], br[6]],
        [br[4], R[8]],
        [br[5], R[9]],
        [br[6], R[10]],
        [R[8], U[6]],
        [R[9], U[7]],
        [R[10], U[8]],

        ...makeFaceTurnDefinitions(BR),
      ],
      "BR"
    );

    // BL
    this.addTurn(
      [
        [U[8], L[6]],
        [U[9], L[7]],
        [U[10], L[8]],
        [L[6], bl[10]],
        [L[7], bl[1]],
        [L[8], bl[2]],
        [bl[10], b[6]],
        [bl[1], b[7]],
        [bl[2], b[8]],
        [b[6], BR[4]],
        [b[7], BR[5]],
        [b[8], BR[6]],
        [BR[4], U[8]],
        [BR[5], U[9]],
        [BR[6], U[10]],

        ...makeFaceTurnDefinitions(BL),
      ],
      "BL"
    );

    // dr
    this.addTurn(
      [
        [F[8], R[4]],
        [F[9], R[5]],
        [F[10], R[6]],
        [R[4], br[8]],
        [R[5], br[9]],
        [R[6], br[10]],
        [br[8], d[6]],
        [br[9], d[7]],
        [br[10], d[8]],
        [d[6], dl[10]],
        [d[7], dl[1]],
        [d[8], dl[2]],
        [dl[10], F[8]],
        [dl[1], F[9]],
        [dl[2], F[10]],

        ...makeFaceTurnDefinitions(dr),
      ],
      "dr"
    );

    // dl
    this.addTurn(
      [
        [F[6], dr[4]],
        [F[7], dr[5]],
        [F[8], dr[6]],
        [dr[4], d[8]],
        [dr[5], d[9]],
        [dr[6], d[10]],
        [d[8], bl[6]],
        [d[9], bl[7]],
        [d[10], bl[8]],
        [bl[6], L[10]],
        [bl[7], L[1]],
        [bl[8], L[2]],
        [L[10], F[6]],
        [L[1], F[7]],
        [L[2], F[8]],

        ...makeFaceTurnDefinitions(dl),
      ],
      "dl"
    );

    // d
    this.addTurn(
      [
        [br[10], b[2]],
        [br[1], b[3]],
        [br[2], b[4]],
        [b[2], bl[4]],
        [b[3], bl[5]],
        [b[4], bl[6]],
        [bl[4], dl[8]],
        [bl[5], dl[9]],
        [bl[6], dl[10]],
        [dl[8], dr[6]],
        [dl[9], dr[7]],
        [dl[10], dr[8]],
        [dr[6], br[10]],
        [dr[7], br[1]],
        [dr[8], br[2]],

        ...makeFaceTurnDefinitions(d),
      ],
      "d"
    );

    // br
    this.addTurn(
      [
        [b[10], d[4]],
        [b[1], d[5]],
        [b[2], d[6]],
        [d[4], dr[8]],
        [d[5], dr[9]],
        [d[6], dr[10]],
        [dr[8], R[6]],
        [dr[9], R[7]],
        [dr[10], R[8]],
        [R[6], BR[10]],
        [R[7], BR[1]],
        [R[8], BR[2]],
        [BR[10], b[10]],
        [BR[1], b[1]],
        [BR[2], b[2]],

        ...makeFaceTurnDefinitions(br),
      ],
      "br"
    );

    // bl
    this.addTurn(
      [
        [BL[4], L[8]],
        [BL[5], L[9]],
        [BL[6], L[10]],
        [L[8], dl[6]],
        [L[9], dl[7]],
        [L[10], dl[8]],
        [dl[6], d[10]],
        [dl[7], d[1]],
        [dl[8], d[2]],
        [d[10], b[4]],
        [d[1], b[5]],
        [d[2], b[6]],
        [b[4], BL[4]],
        [b[5], BL[5]],
        [b[6], BL[6]],

        ...makeFaceTurnDefinitions(bl),
      ],
      "bl"
    );

    // b
    this.addTurn(
      [
        [br[2], BR[2]],
        [br[3], BR[3]],
        [br[4], BR[4]],
        [BR[2], BL[2]],
        [BR[3], BL[3]],
        [BR[4], BL[4]],
        [BL[2], bl[2]],
        [BL[3], bl[3]],
        [BL[4], bl[4]],
        [bl[2], d[2]],
        [bl[3], d[3]],
        [bl[4], d[4]],
        [d[2], br[2]],
        [d[3], br[3]],
        [d[4], br[4]],

        ...makeFaceTurnDefinitions(b),
      ],
      "b"
    );

    // "Pochmann notation"

    // D++ / D--
    this.addTurn(
      [
        // Top Layer
        [F[0], R[0]],
        [F[1], R[9]],
        [F[5], R[3]],
        [F[6], R[4]],
        [F[7], R[5]],
        [F[8], R[6]],
        [F[9], R[7]],
        [F[10], R[8]],

        [R[0], BR[0]],
        [R[3], BR[9]],
        [R[4], BR[10]],
        [R[5], BR[1]],
        [R[6], BR[2]],
        [R[7], BR[3]],
        [R[8], BR[4]],
        [R[9], BR[5]],

        [BR[0], BL[0]],
        [BR[9], BL[1]],
        [BR[10], BL[2]],
        [BR[1], BL[3]],
        [BR[2], BL[4]],
        [BR[3], BL[5]],
        [BR[4], BL[6]],
        [BR[5], BL[7]],

        [BL[0], L[0]],
        [BL[1], L[7]],
        [BL[2], L[8]],
        [BL[3], L[9]],
        [BL[4], L[10]],
        [BL[5], L[1]],
        [BL[6], L[2]],
        [BL[7], L[3]],

        [L[0], F[0]],
        [L[7], F[5]],
        [L[8], F[6]],
        [L[9], F[7]],
        [L[10], F[8]],
        [L[1], F[9]],
        [L[2], F[10]],
        [L[3], F[1]],

        // Bottom Layer
        [dr[0], br[0]],
        [dr[1], br[5]],
        [dr[2], br[6]],
        [dr[3], br[7]],
        [dr[4], br[8]],
        [dr[5], br[9]],
        [dr[6], br[10]],
        [dr[7], br[1]],
        [dr[8], br[2]],
        [dr[9], br[3]],
        [dr[10], br[4]],

        [br[0], b[0]],
        [br[1], b[3]],
        [br[2], b[4]],
        [br[3], b[5]],
        [br[4], b[6]],
        [br[5], b[7]],
        [br[6], b[8]],
        [br[7], b[9]],
        [br[8], b[10]],
        [br[9], b[1]],
        [br[10], b[2]],

        [b[0], bl[0]],
        [b[1], bl[3]],
        [b[2], bl[4]],
        [b[3], bl[5]],
        [b[4], bl[6]],
        [b[5], bl[7]],
        [b[6], bl[8]],
        [b[7], bl[9]],
        [b[8], bl[10]],
        [b[9], bl[1]],
        [b[10], bl[2]],

        [bl[0], dl[0]],
        [bl[1], dl[5]],
        [bl[2], dl[6]],
        [bl[3], dl[7]],
        [bl[4], dl[8]],
        [bl[5], dl[9]],
        [bl[6], dl[10]],
        [bl[7], dl[1]],
        [bl[8], dl[2]],
        [bl[9], dl[3]],
        [bl[10], dl[4]],

        [dl[0], dr[0]],
        [dl[1], dr[9]],
        [dl[2], dr[10]],
        [dl[3], dr[1]],
        [dl[4], dr[2]],
        [dl[5], dr[3]],
        [dl[6], dr[4]],
        [dl[7], dr[5]],
        [dl[8], dr[6]],
        [dl[9], dr[7]],
        [dl[10], dr[8]],

        ...makeFaceTurnDefinitions(d),
      ],
      "D++"
    );

    // R++ / R--
    this.addTurn(
      [
        // Top Layer
        [F[0], U[0]],
        [F[7], U[3]],
        [F[8], U[4]],
        [F[9], U[5]],
        [F[10], U[6]],
        [F[1], U[7]],
        [F[2], U[8]],
        [F[3], U[9]],

        [U[0], BL[0]],
        [U[3], BL[9]],
        [U[4], BL[10]],
        [U[5], BL[1]],
        [U[6], BL[2]],
        [U[7], BL[3]],
        [U[8], BL[4]],
        [U[9], BL[5]],

        [BL[0], bl[0]],
        [BL[9], bl[1]],
        [BL[10], bl[2]],
        [BL[1], bl[3]],
        [BL[2], bl[4]],
        [BL[3], bl[5]],
        [BL[4], bl[6]],
        [BL[5], bl[7]],

        [bl[0], dl[0]],
        [bl[1], dl[7]],
        [bl[2], dl[8]],
        [bl[3], dl[9]],
        [bl[4], dl[10]],
        [bl[5], dl[1]],
        [bl[6], dl[2]],
        [bl[7], dl[3]],

        [dl[0], F[0]],
        [dl[7], F[7]],
        [dl[8], F[8]],
        [dl[9], F[9]],
        [dl[10], F[10]],
        [dl[1], F[1]],
        [dl[2], F[2]],
        [dl[3], F[3]],

        // Bottom Layer
        [dr[0], R[0]],
        [dr[1], R[9]],
        [dr[2], R[10]],
        [dr[3], R[1]],
        [dr[4], R[2]],
        [dr[5], R[3]],
        [dr[6], R[4]],
        [dr[7], R[5]],
        [dr[8], R[6]],
        [dr[9], R[7]],
        [dr[10], R[8]],

        [R[0], BR[0]],
        [R[1], BR[5]],
        [R[2], BR[6]],
        [R[3], BR[7]],
        [R[4], BR[8]],
        [R[5], BR[9]],
        [R[6], BR[10]],
        [R[7], BR[1]],
        [R[8], BR[2]],
        [R[9], BR[3]],
        [R[10], BR[4]],

        [BR[0], b[0]],
        [BR[1], b[1]],
        [BR[2], b[2]],
        [BR[3], b[3]],
        [BR[4], b[4]],
        [BR[5], b[5]],
        [BR[6], b[6]],
        [BR[7], b[7]],
        [BR[8], b[8]],
        [BR[9], b[9]],
        [BR[10], b[10]],

        [b[0], d[0]],
        [b[1], d[5]],
        [b[2], d[6]],
        [b[3], d[7]],
        [b[4], d[8]],
        [b[5], d[9]],
        [b[6], d[10]],
        [b[7], d[1]],
        [b[8], d[2]],
        [b[9], d[3]],
        [b[10], d[4]],

        [d[0], dr[0]],
        [d[1], dr[5]],
        [d[2], dr[6]],
        [d[3], dr[7]],
        [d[4], dr[8]],
        [d[5], dr[9]],
        [d[6], dr[10]],
        [d[7], dr[1]],
        [d[8], dr[2]],
        [d[9], dr[3]],
        [d[10], dr[4]],

        ...makeFaceTurnDefinitions(br),
      ],
      "R++"
    );
  }

  U(reverse?: boolean) {
    this.doTurn("U", reverse);
  }

  R(reverse?: boolean) {
    this.doTurn("R", reverse);
  }

  F(reverse?: boolean) {
    this.doTurn("F", reverse);
  }

  dr(reverse?: boolean) {
    this.doTurn("dr", reverse);
  }

  dl(reverse?: boolean) {
    this.doTurn("dl", reverse);
  }

  L(reverse?: boolean) {
    this.doTurn("L", reverse);
  }

  d(reverse?: boolean) {
    this.doTurn("d", reverse);
  }

  br(reverse?: boolean) {
    this.doTurn("br", reverse);
  }

  BR(reverse?: boolean) {
    this.doTurn("BR", reverse);
  }

  BL(reverse?: boolean) {
    this.doTurn("BL", reverse);
  }

  bl(reverse?: boolean) {
    this.doTurn("bl", reverse);
  }

  b(reverse?: boolean) {
    this.doTurn("b", reverse);
  }

  /**
   * D++ for Pochmann notation. D-- if reverse = false
   */
  Dxx(reverse?: boolean) {
    this.doTurn("D++", reverse);
  }

  /**
   * R++ for Pochmann notation. R-- if reverse = false
   */
  Rxx(reverse?: boolean) {
    this.doTurn("R++", reverse);
  }

  /**
   * Parses and executes a megaminx algorithm using WCA standard notation
   *
   * @see https://www.stefan-pochmann.info/spocc/other_stuff/tools/scramble_megaminx/)
   * @see https://www.worldcubeassociation.org/regulations/#12d
   *
   * @param alg megaminx algorithm to parse
   * @example
   * ```
   * R-- D++ R++ U'
   * ```
   */
  alg(alg: string) {
    if (!alg) {
      return;
    }

    // pochmann notation
    this.doTurns(parseMegaminxAlgorithm(alg));
  }

  case(alg: string) {
    if (!alg) {
      return;
    }

    let turns = parseMegaminxAlgorithm(alg)
      .reverse()
      .map((turn) => ({
        ...turn,
        turnType:
          turn.turnType === TurnType.Clockwise
            ? TurnType.CounterClockwise
            : TurnType.Clockwise,
      }));

    this.doTurns(turns);
  }

  doTurns(turns: Turn[]) {
    turns.forEach((turn) => {
      let reverse = turn.turnType === TurnType.CounterClockwise;
      let turnFunc;

      switch (turn.unit) {
        case "Rxx":
          turnFunc = this.Rxx.bind(this); break;
        case "Dxx":
          turnFunc = this.Dxx.bind(this); break;
        case "U":
          turnFunc = this.U.bind(this); break;
        case "R":
          turnFunc = this.R.bind(this); break;
        case "F":
          turnFunc = this.F.bind(this); break;
        case "L":
          turnFunc = this.L.bind(this); break;
        case "BL":
          turnFunc = this.BL.bind(this); break;
        case "BR":
          turnFunc = this.BR.bind(this); break;
      }

      for (let i = turn.n; i > 0; i--) {
        turnFunc(reverse);
      }

    });
  }
}

/**
 * Generates turn definitions for rotating a megaminx face clockwise
 * @param face array of sticker ids
 */
function makeFaceTurnDefinitions(face: string[]): Pair<string>[] {
  return [
    // Edges
    [face[1], face[9]],
    [face[9], face[7]],
    [face[7], face[5]],
    [face[5], face[3]],
    [face[3], face[1]],

    // Corners
    [face[2], face[10]],
    [face[10], face[8]],
    [face[8], face[6]],
    [face[6], face[4]],
    [face[4], face[2]],
  ];
}
