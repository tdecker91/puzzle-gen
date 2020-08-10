import { Object3D } from "./object3d";
import { Geometry } from "./geometry";
import { vec3 } from "gl-matrix";

export class Group extends Object3D {
  
  objects: Geometry[];

  constructor(objects: Geometry[]) {
    super();
    this.setObjects(objects);
  }

  setObjects(objects: Geometry[]) {
    this.objects = objects;
  }

  addObject(object: Geometry) {
    this.objects.push(object);
  }

  setCentroid(vector: vec3) {
    this.centroid = vector;
  }

}