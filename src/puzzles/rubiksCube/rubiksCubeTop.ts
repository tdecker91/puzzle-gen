import { vec3 } from 'gl-matrix';
import { IColor } from './../../geometry/color';
import { Face } from './../../geometry/face';
import { Geometry } from './../../geometry/geometry';
import { Group } from './../../geometry/group';
import { Object3D } from './../../geometry/object3d';

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

    const U = new Group(this.makeGrid({value: '#FFFF00'}));
    const R = new Group(this.makeRow({value: '#FF0000'}));
    const F = new Group(this.makeRow({value: '#0000FF'}));
    const B = new Group(this.makeRow({value: '#00FF00'}));
    const L = new Group(this.makeRow({value: '#FFA500'}));

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
   * Makes a grid of colored planes for the
   * rubiks cube stickers. Indexed from the top
   * left to bottom right. See Below
   * 
   *    0 1 2 
   *    3 4 5
   *    6 7 8
   */
  private makeGrid(color: IColor): Geometry[] {
    let stickers = [];
    for (let i = 0; i < this.size; i++) {
      let vOffset = -this.halfCubeWidth + this.halfStickerWidth + (this.stickerWidth * i);;
      stickers = stickers.concat(this.makeRow(color, vOffset))
    }
    return stickers;
  }

  /**
   * Makes a row of planes for the rubiks cube stickers.
   * indexed from left to right
   * 
   *     0 1 2
   */
  private makeRow(color: IColor, vOffset: number = 0): Geometry[] {
    let stickers = [];
    
    for (let i = 0; i < this.size; i++) {
      let hOffset = -this.halfCubeWidth + this.halfStickerWidth + (this.stickerWidth * i);
      let vertices: vec3[] = [
        [-this.halfStickerWidth + hOffset, this.halfStickerWidth + vOffset,  0],
        [this.halfStickerWidth  + hOffset, this.halfStickerWidth + vOffset,  0],
        [this.halfStickerWidth  + hOffset, -this.halfStickerWidth + vOffset, 0],
        [-this.halfStickerWidth + hOffset, -this.halfStickerWidth + vOffset, 0],
      ]
      let faces = [
        new Face([0,1,2,3], vertices, color)
      ]
      stickers.push(new Geometry(vertices, faces));
    }

    return stickers;
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