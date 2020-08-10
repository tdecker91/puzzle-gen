import { vec3, mat4 } from 'gl-matrix';
import { IFace } from './face';
import { Object3D } from './object3d';
import { IColor } from './color';

export class Geometry extends Object3D {
  vertices: vec3[];
  faces: IFace[];

  constructor(vertices: vec3[], faces: IFace[]) {
    super();

    this.vertices = vertices;
    this.faces = faces;

    this.calculateCentroid();
  }

  private calculateCentroid() {
    let cx = 0, cy = 0, cz = 0
    this.vertices.forEach(vertex => {
      cx += vertex[0];
      cy += vertex[1];
      cz += vertex[2];
    });

    cx /= this.vertices.length;
    cy /= this.vertices.length;
    cz /= this.vertices.length;

    this.centroid = vec3.clone([cx, cy, cz]);
  }
}