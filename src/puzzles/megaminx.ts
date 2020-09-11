import { Group } from './../geometry/group';
import { Object3D } from './../geometry/object3d';
import { DividedPentagon } from '../geometry/dividedPentagon';

export class Megaminx {
  stickers: Object3D[];
  group: Group;

  constructor() {
    this.stickers = [new DividedPentagon(2, .6)];
    this.group = new Group(this.stickers);
  }

}