import { Geometry } from './geometry';
import { vec3 } from 'gl-matrix';
import { IColor } from './color';
import { Face3, IFace } from './face';

export class Triangle extends Geometry {
  constructor(a: vec3, b: vec3, c: vec3, color: IColor) {
    let verticies: vec3[] = [
      a, b, c
    ];
    let faces: IFace[] = [
      new Face3(0, 1, 2, null, color)
    ];
    super(verticies, faces);
  }
}