import { Geometry } from "./geometry";
import { IFace, Face } from "./face";
import { IColor } from "./color";
import { Vector3 } from "../math/vector";

export class Plane extends Geometry {
  constructor(width: number, height: number, color: IColor) {
    let vertices: Vector3[] = [
      Vector3.fromValues(0, 0, 0),
      Vector3.fromValues(width, 0, 0),
      Vector3.fromValues(width, -height, 0),
      Vector3.fromValues(0, -height, 0),
    ];
    let faces: IFace[] = [new Face([0, 1, 2, 3], vertices, color)];
    super(vertices, faces);
  }
}
