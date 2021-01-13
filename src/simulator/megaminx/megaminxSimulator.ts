import { MEGAMINX_FACES } from './constants';
import { Simulator, Pair } from './../simulator';
import { fillArray } from '../../utils/arrays';

/**
 * Simulator to define megaminx type puzzles
 * 
 * Currently only standard megaminx size supported.
 */
export class MegaminxSimulator extends Simulator {
  constructor() {
    super();

    MEGAMINX_FACES.forEach(faceName => {
      this.addFace(fillArray(11, faceName), faceName);
    });

    const U = this.faces.get('U');    // White
    const R = this.faces.get('R');    // Blue
    const F = this.faces.get('F');    // Red
    const dr = this.faces.get('dr');  // Pink
    const dl = this.faces.get('dl');  // Light Yellow
    const L = this.faces.get('L');    // Green
    const d = this.faces.get('d');    // Gray
    const br = this.faces.get('br');  // Light Green
    const BR = this.faces.get('BR');  // Yellow
    const BL = this.faces.get('BL');  // Purle
    const bl = this.faces.get('bl');  // Dark Blue
    const b = this.faces.get('b');    // Orange

    // R
    this.addTurn([
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
    ], 'R');

    // F
    this.addTurn([
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

      ...makeFaceTurnDefinitions(F)
    ], 'F');

    // U
    this.addTurn([
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

      ...makeFaceTurnDefinitions(U)
    ], 'U');

    // L
    this.addTurn([
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

      ...makeFaceTurnDefinitions(L)
    ], 'L');

    // BR
    this.addTurn([
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

      ...makeFaceTurnDefinitions(BR)
    ], 'BR');

    // BL
    this.addTurn([
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

      ...makeFaceTurnDefinitions(BL)
    ],'BL');

    // dr
    this.addTurn([
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
      [dl[10], bl[8]],
      [dl[1], bl[9]],
      [dl[2], bl[10]],

      ...makeFaceTurnDefinitions(dr)
    ], 'dr');

    // dl
    this.addTurn([
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

      ...makeFaceTurnDefinitions(dl)
    ], 'dl')

    // d
    this.addTurn([
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

      ...makeFaceTurnDefinitions(d)
    ], 'd');

    // br
    this.addTurn([
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

      ...makeFaceTurnDefinitions(br)
    ], 'br')

    // bl
    this.addTurn([
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

      ...makeFaceTurnDefinitions(bl)
    ], 'bl')

    // b
    this.addTurn([
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

      ...makeFaceTurnDefinitions(b)
    ], 'b')
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