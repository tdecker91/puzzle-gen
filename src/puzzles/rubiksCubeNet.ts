import { Object3D } from './../geometry/object3d';
import { Plane } from "../geometry/plane";
import { IColor } from "../geometry/color";
import { Group } from "../geometry/group";

export class RubiksCubeNet {
  stickers: Object3D[];
  group: Group; 

  constructor(size: number) {
    const width = 1/2;
    const spacing = .01;
    const cubeWidth = (width * size) + (spacing * (size + 1));

    const U = this.makeStickers(size, {value: '#FFFF00'}, width, spacing);
    const R = this.makeStickers(size, {value: '#FF0000'}, width, spacing);
    const F = this.makeStickers(size, {value: '#0000FF'}, width, spacing);
    const D = this.makeStickers(size, {value: '#FFFFFF'}, width, spacing);
    const L = this.makeStickers(size, {value: '#FFA500'}, width, spacing);
    const B = this.makeStickers(size, {value: '#00FF00'}, width, spacing);

    const uGroup = new Group(U);
    uGroup.translate([0, cubeWidth, 0]);

    const rGroup = new Group(R);
    rGroup.translate([cubeWidth,0,0]);
    rGroup.rotate(Math.PI/2, [0,0,1]);
    
    const fGroup = new Group(F);

    const dGroup = new Group(D);
    dGroup.translate([0, -cubeWidth, 0]);
    
    const lGroup = new Group(L);
    lGroup.translate([-cubeWidth, 0, 0]);
    lGroup.rotate(-Math.PI/2, [0,0,1]);
    
    const bGroup = new Group(B);
    bGroup.translate([2*cubeWidth, 0, 0]);
    bGroup.rotate(Math.PI, [0,0,1]);

    this.stickers = [uGroup, rGroup, fGroup, dGroup, lGroup, bGroup];

    this.group = new Group(this.stickers);
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
        stickers.push(sticker)
      }
    }
    return stickers;
  }
}