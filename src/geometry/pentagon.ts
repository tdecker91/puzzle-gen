import { Face, IFace } from "./face";
import { Geometry } from "./geometry";
import { polarToCartesian } from "../math/utils";
import { Vector3 } from "../math/vector";

export class Pentagon extends Geometry {
  constructor(radius: number) {
    let vertices: Vector3[] = [];

    for (let i = 0; i < 5; i++) {
      const theta = (i * (2 * Math.PI)) / 5 - Math.PI / 10;
      const v = polarToCartesian(radius, theta);
      vertices.push(Vector3.fromValues(v.x, v.y, 0));
    }

    let faces: IFace[] = [
      new Face([0, 1, 2, 3, 4], vertices, { value: "#FF0000" }),
    ];

    super(vertices, faces);
  }
}
