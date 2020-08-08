import { Geometry } from "../geometry/geometry";

export class Scene {

  objects: Geometry[];

  constructor() {
    this.objects = [];
  }

  add(geometry: Geometry) {
    this.objects.push(geometry);
  }

}