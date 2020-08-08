import { mat4, vec3, ReadonlyVec3 } from "gl-matrix";
import * as uuid from 'uuid/v4';
import { IColor } from "./color";

export class Object3D {
  matrix: mat4;
  uid: string;
  color: IColor;

  constructor(color: IColor) {
    this.uid = uuid();
    this.color = color;
    this.matrix = mat4.create();
  }

  translate(vector: ReadonlyVec3) {
    mat4.translate(this.matrix, this.matrix, vector);
  }

  rotate(rad: number, axis: ReadonlyVec3) {
    mat4.rotate(this.matrix, this.matrix, rad, axis);
  }
}