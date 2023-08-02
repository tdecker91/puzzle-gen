import { polarToCartesian } from "../math/utils";
import { Vector3 } from "../math/vector";
import { IColor } from "./color";
import { Face } from "./face";
import { Geometry } from "./geometry";

export class Circle extends Geometry {
  constructor(radius: number, subdivisions: number, color?: IColor) {
    let vertices = [];
    let faceIndices = [];

    for (let i = 0; i < subdivisions; i++) {
      vertices.push(
        Vector3.fromVec2(
          polarToCartesian(radius, 0 + Math.PI * i * (2 / subdivisions))
        )
      );
      faceIndices.push(i);
    }

    let face = new Face(faceIndices, vertices, color);

    super(vertices, [face]);
  }
}
