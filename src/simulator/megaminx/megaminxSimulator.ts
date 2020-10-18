import { MEGAMINX_FACES } from './constants';
import { Simulator, TurnDefinitions } from './../simulator';
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
      let { stickerIds } = this.addFace(fillArray(11, faceName), faceName);

      let changes = [];
      for (let i = 1; i <= 11; i++) {
        changes.push([
          stickerIds[(i + 2) % 11],
          stickerIds[i]
        ])
      }
      this.addTurn(changes, faceName);
    });

    const U = this.faces.get('U');
    const R = this.faces.get('R');
    const F = this.faces.get('F');
    const dr = this.faces.get('dr');
    const dl = this.faces.get('dl');
    const L = this.faces.get('L');
    const d = this.faces.get('d');
    const br = this.faces.get('br');
    const BR = this.faces.get('BR');
    const BL = this.faces.get('BL');
    const b = this.faces.get('b');

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
    ], 'R-0');

    console.log(this.turns.get('R-0'))
  }
}