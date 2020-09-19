import { Geometry } from './geometry';
import { vec3 } from 'gl-matrix';
import { IColor } from './color';
import { Face, IFace } from './face';
import { SQRT_3 } from '../math/constants';

export class Triangle extends Geometry {
  constructor(a: vec3, b: vec3, c: vec3, color: IColor) {
    let verticies: vec3[] = [
      a, b, c
    ];
    let faces: IFace[] = [
      new Face([0, 1, 2], verticies, color)
    ];
    super(verticies, faces);
  }
}

export class EquilateralTriangle extends Triangle {
  constructor(base: number, color: IColor) {
    let height = base * (SQRT_3 / 2);

    super(
      [0, 0, 0],
      [base/2, height, 0],
      [base, 0, 0],
      color
    );
  }
}