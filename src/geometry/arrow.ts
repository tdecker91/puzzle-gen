import { vec3 } from "gl-matrix";
import { calculateCentroid } from "../math/utils";
import { Object3D } from "./object3d";

export class Arrow extends Object3D {
  p1: vec3;
  p2: vec3;

  constructor(p1: vec3, p2: vec3) {
    super();

    this.p1 = p1;
    this.p2 = p2;
    this.centroid = calculateCentroid([p1, p2]);
  }
}
