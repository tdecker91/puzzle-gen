import { vec3 } from 'gl-matrix';
import { YELLOW, RED, BLUE, GREEN, ORANGE } from './../colors';
import { Geometry } from './../../geometry/geometry';
import { Group } from './../../geometry/group';
import { Object3D } from './../../geometry/object3d';
import { makeGrid, makeRow } from './../../geometry/grid';

export class RubiksCubeTopLayer {
  stickers: Object3D[];
  group: Group;

  private size: number;
  private stickerWidth: number;
  private halfStickerWidth: number;
  private cubeWidth: number;
  private halfCubeWidth: number;

  constructor(size: number, rotationAngle: number = Math.PI/4) {
    this.size = size;
    this.stickerWidth = 1/2;
    this.halfStickerWidth = this.stickerWidth/2;
    this.cubeWidth = (this.stickerWidth * size);
    this.halfCubeWidth = this.cubeWidth/2;

    const U = new Group(makeGrid(this.cubeWidth, this.size, YELLOW));
    const R = new Group(makeRow(this.cubeWidth, this.size, RED));
    const F = new Group(makeRow(this.cubeWidth, this.size, BLUE));
    const B = new Group(makeRow(this.cubeWidth, this.size, GREEN));
    const L = new Group(makeRow(this.cubeWidth, this.size, ORANGE));

    const borderOffset = this.halfCubeWidth + this.halfStickerWidth;
    B.translate([0,borderOffset, 0]);
    B.rotate(Math.PI, [0,0,1]);
    F.translate([0,-borderOffset,0]);
    R.translate([borderOffset,0,0]);
    R.rotate(Math.PI/2, [0,0,1]);
    L.translate([-borderOffset,0,0]);
    L.rotate(-Math.PI/2, [0,0,1]);

    this.rotateBorder(F.objects as Geometry[], rotationAngle);
    this.rotateBorder(R.objects as Geometry[], rotationAngle);
    this.rotateBorder(B.objects as Geometry[], rotationAngle);
    this.rotateBorder(L.objects as Geometry[], rotationAngle);

    this.stickers = [
      U,
      R,
      F,
      B,
      L
    ];
    this.group = new Group(this.stickers);
  }

  /**
   * given a row of stickers centered at 0,0,0
   * rotates each vertex of each sticker around
   * the top of the sticker.
   */
  private rotateBorder(stickers: Geometry[], radians: number) {
    stickers.forEach(sticker => {
      sticker.vertices = sticker.vertices.map(vertex => {
        return vec3.rotateX(vertex, vertex, [0, this.halfStickerWidth, 0], radians);
      });
    })
  }
}