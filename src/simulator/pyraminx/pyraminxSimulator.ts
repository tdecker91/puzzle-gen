import { fillArray } from '../../utils/arrays';
import { Simulator } from './../simulator';

export class PyraminxSimulator extends Simulator {

  constructor() {
    super();

    const { stickerIds: U } = this.addFace(fillArray(9, 'top'), 'top');
    const { stickerIds: L } = this.addFace(fillArray(9, 'left'), 'left');
    const { stickerIds: R } = this.addFace(fillArray(9, 'right'), 'right');
    const { stickerIds: B } = this.addFace(fillArray(9, 'back'), 'back');

    // Tip turns
    this.addTurn([
      [U[8], R[8]],
      [R[8], L[8]],
      [L[8], U[8]],
    ], 'u');

    this.addTurn([
      [L[0], B[8]],
      [B[8], U[4]],
      [U[4], L[0]],
    ], 'l');

    this.addTurn([
      [L[4], R[0]],
      [R[0], B[4]],
      [B[4], L[4]],
    ], 'r');

    this.addTurn([
      [R[4], U[0]],
      [U[0], B[0]],
      [B[0], R[4]],
    ], 'b')

    // Full turns
    this.addTurn([
      [U[5], R[5]],
      [U[6], R[6]],
      [U[7], R[7]],
      [U[8], R[8]],

      [R[5], L[5]],
      [R[6], L[6]],
      [R[7], L[7]],
      [R[8], L[8]],

      [L[5], U[5]],
      [L[6], U[6]],
      [L[7], U[7]],
      [L[8], U[8]]
    ], 'U');

    this.addTurn([
      [L[0], B[8]],
      [L[1], B[6]],
      [L[2], B[5]],
      [L[5], B[7]],

      [B[8], U[4]],
      [B[6], U[3]],
      [B[5], U[7]],
      [B[7], U[2]],

      [U[4], L[0]],
      [U[3], L[1]],
      [U[7], L[2]],
      [U[2], L[5]]
    ], 'L');

    this.addTurn([
      [L[2], R[5]],
      [L[3], R[1]],
      [L[4], R[0]],
      [L[7], R[2]],

      [R[5], B[2]],
      [R[1], B[3]],
      [R[0], B[4]],
      [R[2], B[7]],

      [B[2], L[2]],
      [B[3], L[3]],
      [B[4], L[4]],
      [B[7], L[7]]
    ], 'R');

    this.addTurn([
      [R[2], U[5]],
      [R[3], U[1]],
      [R[4], U[0]],
      [R[7], U[2]],

      [U[5], B[5]],
      [U[1], B[1]],
      [U[0], B[0]],
      [U[2], B[2]],

      [B[5], R[2]],
      [B[1], R[3]],
      [B[0], R[4]],
      [B[2], R[7]],
    ], 'B');
  }

  U(reverse?: boolean) {
    this.doTurn('U', reverse);
  }

  R(reverse?: boolean) {
    this.doTurn('R', reverse);
  }

  L(reverse?: boolean) {
    this.doTurn('L', reverse);
  }

  B(reverse?: boolean) {
    this.doTurn('B', reverse);
  }

  u(reverse?: boolean) {
    this.doTurn('u', reverse);
  }

  r(reverse?: boolean) {
    this.doTurn('r', reverse);
  }

  l(reverse?: boolean) {
    this.doTurn('l', reverse);
  }

  b(reverse?: boolean) {
    this.doTurn('b', reverse);
  }

}