import { Object3D } from "./object3d";
import { Vector3 } from "../math/vector";

export class Group extends Object3D {
  objects: Object3D[];

  constructor(objects: Object3D[] = []) {
    super();
    this.setObjects(objects);
  }

  setObjects(objects: Object3D[]) {
    this.objects = objects;
  }

  addObject(object: Object3D) {
    this.objects.push(object);
  }

  setCentroid(vector: Vector3) {
    this.centroid = vector;
  }
}
