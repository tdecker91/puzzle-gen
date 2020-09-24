import { Plane } from "../../geometry/plane";
import { IColor } from "../../geometry/color";
import { Group } from "../../geometry/group";
import { Object3D } from "../../geometry/object3d";

export class RubiksCube {

  stickers: Object3D[];
  group: Group;

  constructor(size: number) {
    const width = 1/2;
    const cubeWidth = (width * size);
    const halfWidth = cubeWidth/2;

    const U = this.makeStickers(size, {value: '#FFFF00'}, width);
    const R = this.makeStickers(size, {value: '#FF0000'}, width);
    const F = this.makeStickers(size, {value: '#0000FF'}, width);
    const D = this.makeStickers(size, {value: '#FFFFFF'}, width);
    const L = this.makeStickers(size, {value: '#FFA500'}, width);
    const B = this.makeStickers(size, {value: '#00FF00'}, width);

    const uGroup = new Group(U);
    uGroup.rotate(-Math.PI/2, [0,1,0]);
    uGroup.rotate(-Math.PI/2, [1,0,0]);
    uGroup.translate([0,0,halfWidth]);

    const rGroup = new Group(R);
    rGroup.translate([0,0,halfWidth]);

    const fGroup = new Group(F);
    fGroup.rotate(-Math.PI/2, [0,1,0]);
    fGroup.translate([0, 0, halfWidth]);

    const dGroup = new Group(D);
    dGroup.rotate(-Math.PI/2, [0,1,0]);
    dGroup.rotate(Math.PI/2, [1,0,0]);
    dGroup.translate([0,0,halfWidth]);
    
    const lGroup = new Group(L);
    lGroup.rotate(-Math.PI, [0,1,0]);
    lGroup.translate([0,0,halfWidth]);
    
    const bGroup = new Group(B);
    bGroup.rotate(Math.PI/2, [0,1,0]);
    bGroup.translate([0,0,halfWidth]);

    this.stickers = [uGroup, rGroup, fGroup, dGroup, lGroup, bGroup];

    this.group = new Group(this.stickers);

    this.group.translate([0,0,-1])
    this.group.rotate(0.593411946, [1,0,0]);
    this.group.rotate(0.785398, [0,1,0]);
  }

  private makeStickers(
    size: number,
    color: IColor,
    width: number
  ): Plane[] {
    let stickers = [];
    const cubeWidth = (width * size);
    const halfWidth = cubeWidth/2;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let sticker = new Plane(width, width, color);
        sticker.translate([
          (j * (width)) - halfWidth,
          0 - (i * (width)) + halfWidth,
          0
        ]);
        stickers.push(sticker);
      }
    }
    return stickers;
  }
}