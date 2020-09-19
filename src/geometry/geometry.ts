import { vec3, mat4 } from 'gl-matrix';
import { IFace } from './face';
import { Object3D } from './object3d';
import { IColor } from './color';
import { calculateCentroid } from '../math/utils';

export class Geometry extends Object3D {
  vertices: vec3[];
  faces: IFace[];

  constructor(vertices: vec3[], faces: IFace[]) {
    super();

    this.vertices = vertices;
    this.faces = faces;

    this.centroid = calculateCentroid(this.vertices);
  }
}