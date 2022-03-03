import { Geometry } from "./geometry";
import { IColor } from "./color";
import { Face, IFace } from "./face";
import { SQRT_3 } from "../math/constants";
import { Vector3 } from "../math/vector";

export class Triangle extends Geometry {
  constructor(a: Vector3, b: Vector3, c: Vector3, color: IColor) {
    let verticies: Vector3[] = [a, b, c];
    let faces: IFace[] = [new Face([0, 1, 2], verticies, color)];
    super(verticies, faces);
  }
}

export class EquilateralTriangle extends Triangle {
  constructor(base: number, color: IColor) {
    let height = base * (SQRT_3 / 2);

    super(
      Vector3.fromValues(0, 0, 0),
      Vector3.fromValues(base / 2, height, 0),
      Vector3.fromValues(base, 0, 0),
      color
    );
  }
}
