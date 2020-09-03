import { Plane } from "../geometry/plane";
import { IColor } from "../geometry/color";
import { Group } from "../geometry/group";
import { Object3D } from "../geometry/object3d";

export class RubiksCube {

  stickers: Object3D[];
  group: Group;

  constructor(size: number) {
    const width = 1/2;
    const spacing = .02;
    const cubeWidth = (width * size) + (spacing * (size + 1));
    const halfWidth = cubeWidth/2;

    const U = this.makeStickers(size, {value: '#FFFF00A0'}, width, spacing);
    const R = this.makeStickers(size, {value: '#FF0000A0'}, width, spacing);
    const F = this.makeStickers(size, {value: '#0000FFA0'}, width, spacing);
    const D = this.makeStickers(size, {value: '#FFFFFFA0'}, width, spacing);
    const L = this.makeStickers(size, {value: '#FFA500A0'}, width, spacing);
    const B = this.makeStickers(size, {value: '#00FF00A0'}, width, spacing);

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

    this.group.rotate(0.593411946, [1,0,0]);
    this.group.rotate(0.785398, [0,1,0]);
  }

  private makeStickers(
    size: number,
    color: IColor,
    width: number,
    spacing: number
  ): Plane[] {
    let stickers = [];
    const cubeWidth = (width * size) + (spacing * (size + 1));
    const halfWidth = cubeWidth/2;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let sticker = new Plane(width, width, color);
        sticker.translate([
          spacing + (j * (width + spacing)) - halfWidth,
          0 - spacing - (i * (width + spacing)) + halfWidth,
          0
        ]);
        stickers.push(sticker);
      }
    }
    return stickers;
  }
}