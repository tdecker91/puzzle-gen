import { Plane } from './../../geometry/plane';
import { IColor } from './../../geometry/color';
import { Group } from './../../geometry/group';
import { Object3D } from './../../geometry/object3d';

export class RubiksCubeNet {
  stickers: Object3D[];
  group: Group; 

  constructor(size: number) {
    const cubeWidth = 1;
    const stickerWidth = cubeWidth/size;

    const U = this.makeStickers(size, {value: '#FFFF00'}, stickerWidth);
    const R = this.makeStickers(size, {value: '#FF0000'}, stickerWidth);
    const F = this.makeStickers(size, {value: '#0000FF'}, stickerWidth);
    const D = this.makeStickers(size, {value: '#FFFFFF'}, stickerWidth);
    const L = this.makeStickers(size, {value: '#FFA500'}, stickerWidth);
    const B = this.makeStickers(size, {value: '#00FF00'}, stickerWidth);

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
    this.group.translate([-cubeWidth/4,0,0]);
    this.group.scale([.5,.5,.5])
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
        stickers.push(sticker)
      }
    }
    return stickers;
  }
}