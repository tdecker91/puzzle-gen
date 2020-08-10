import { mat4, ReadonlyVec3, vec3 } from "gl-matrix";
import * as uuid from 'uuid/v4';
import { IColor } from "./color";

export class Object3D {
  matrix: mat4;
  uid: string;
  color?: IColor;
  centroid: vec3;

  constructor() {
    this.uid = uuid();
    this.matrix = mat4.create();
    this.centroid = [0,0,0];
  }

  translate(vector: ReadonlyVec3) {
    mat4.translate(this.matrix, this.matrix, vector);
  }

  rotate(rad: number, axis: ReadonlyVec3) {
    mat4.rotate(this.matrix, this.matrix, rad, axis);
  }

  setColor(color: IColor) {
    this.color = color;
  }
}