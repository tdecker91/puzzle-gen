import { IFace } from "./face";
import { Object3D } from "./object3d";
import { calculateCentroid } from "../math/utils";
import { Vector3 } from "../math/vector";

export class Geometry extends Object3D {
  vertices: Vector3[];
  faces: IFace[];

  constructor(vertices: Vector3[], faces: IFace[]) {
    super();

    this.vertices = vertices;
    this.faces = faces;

    this.centroid = calculateCentroid(this.vertices);
  }
}
