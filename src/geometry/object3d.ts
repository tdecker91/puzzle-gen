import { IColor } from "./color";
import { generateUid } from "./uid";
import { Vector3 } from "../math/vector";
import { Matrix4 } from "../math/matrix";

export class Object3D {
  matrix: Matrix4;
  uid: number;
  color?: IColor;
  centroid: Vector3;

  constructor() {
    this.uid = generateUid();
    this.matrix = new Matrix4();
    this.centroid = Vector3.fromValues(0, 0, 0);
  }

  translate(x: number, y: number, z: number) {
    this.matrix.translate(x, y, z);
  }

  rotate(rad: number, x: number, y: number, z: number) {
    this.matrix.rotate(rad, x, y, z);
  }

  scale(x: number, y: number, z: number) {
    this.matrix.scale(x, y, z);
  }

  setColor(color: IColor) {
    this.color = color;
  }
}
