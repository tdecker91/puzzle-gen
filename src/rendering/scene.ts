import { Object3D } from "../geometry/object3d";

export class Scene {
  objects: Object3D[];

  constructor() {
    this.objects = [];
  }

  add(geometry: Object3D) {
    this.objects.push(geometry);
  }
}
