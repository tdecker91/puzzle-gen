import { calculateCentroid } from "../math/utils";
import { Vector3 } from "../math/vector";
import { Object3D } from "./object3d";

export class Arrow extends Object3D {
  p1: Vector3;
  p2: Vector3;

  constructor(p1: Vector3, p2: Vector3) {
    super();

    this.p1 = p1;
    this.p2 = p2;
    this.centroid = calculateCentroid([p1, p2]);
  }
}
