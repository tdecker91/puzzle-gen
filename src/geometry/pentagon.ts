import { Face, IFace } from "./face";
import { vec3 } from "gl-matrix";
import { Geometry } from "./geometry";
import { polarToCartesian } from "../math/utils";

export class Pentagon extends Geometry {
  constructor(radius: number) {
    let vertices: vec3[] = [];

    for (let i = 0; i < 5; i++) {
      const theta = (i * (2 * Math.PI)) / 5 - Math.PI / 10;
      const v = polarToCartesian(radius, theta);
      vertices.push([v[0], v[1], 0]);
    }

    let faces: IFace[] = [
      new Face([0, 1, 2, 3, 4], vertices, { value: "#FF0000" }),
    ];

    super(vertices, faces);
  }
}
