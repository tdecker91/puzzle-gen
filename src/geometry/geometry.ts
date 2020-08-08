import { vec3, mat4 } from 'gl-matrix';
import { IFace } from './face';
import { Object3D } from './object3d';
import { IColor } from './color';

export class Geometry extends Object3D {
  vertices: vec3[];
  faces: IFace[];

  constructor(verticies: vec3[], faces: IFace[], color: IColor) {
    super(color);

    this.vertices = verticies;
    this.faces = faces;
  }
}