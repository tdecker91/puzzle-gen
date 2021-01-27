import { IColor } from "./../../geometry/color";
import { vec3 } from "gl-matrix";
import { YELLOW, RED, BLUE, GREEN, ORANGE } from "./../colors";
import { Geometry } from "./../../geometry/geometry";
import { Group } from "./../../geometry/group";
import { Object3D } from "./../../geometry/object3d";
import { makeGrid, makeRow } from "./../../geometry/grid";
import { chunkArray } from "../../utils/arrays";

export class RubiksCubeTopLayer {
  stickers: Object3D[];
  group: Group;

  private size: number;
  private stickerWidth: number;
  private halfStickerWidth: number;
  private cubeWidth: number;
  private halfCubeWidth: number;

  private U: Group;
  private R: Group;
  private F: Group;
  private L: Group;
  private B: Group;

  constructor(size: number, rotationAngle: number = Math.PI / 4) {
    this.size = size;
    this.stickerWidth = 1 / 2;
    this.halfStickerWidth = this.stickerWidth / 2;
    this.cubeWidth = this.stickerWidth * size;
    this.halfCubeWidth = this.cubeWidth / 2;

    this.U = new Group(makeGrid(this.cubeWidth, this.size, YELLOW));
    this.R = new Group(makeRow(this.cubeWidth, this.size, RED));
    this.F = new Group(makeRow(this.cubeWidth, this.size, BLUE));
    this.B = new Group(makeRow(this.cubeWidth, this.size, GREEN));
    this.L = new Group(makeRow(this.cubeWidth, this.size, ORANGE));

    const borderOffset = this.halfCubeWidth + this.halfStickerWidth;
    this.B.translate([0, borderOffset, 0]);
    this.B.rotate(Math.PI, [0, 0, 1]);

    this.F.translate([0, -borderOffset, 0]);

    this.R.translate([borderOffset, 0, 0]);
    this.R.rotate(Math.PI / 2, [0, 0, 1]);

    this.L.translate([-borderOffset, 0, 0]);
    this.L.rotate(-Math.PI / 2, [0, 0, 1]);

    this.rotateBorder(this.F.objects as Geometry[], rotationAngle);
    this.rotateBorder(this.R.objects as Geometry[], rotationAngle);
    this.rotateBorder(this.B.objects as Geometry[], rotationAngle);
    this.rotateBorder(this.L.objects as Geometry[], rotationAngle);

    this.stickers = [this.U, this.R, this.F, this.B, this.L];
    this.group = new Group(this.stickers);
  }

  private setFaceColors(faceStickers: Group, colors: IColor[]) {
    faceStickers.objects.forEach((g: Geometry, i) => {
      if (colors && colors[i]) {
        g.faces[0].color = colors[i];
      }
    });
  }

  setColors(colors: IColor[]) {
    const numStickers = this.size * this.size;
    let [u, r, f, d, l, b] = chunkArray<IColor>(colors, numStickers);

    this.setFaceColors(this.U, u);
    this.setFaceColors(this.R, r);
    this.setFaceColors(this.F, f);
    this.setFaceColors(this.L, l);
    this.setFaceColors(this.B, b);
  }

  /**
   * given a row of stickers centered at 0,0,0
   * rotates each vertex of each sticker around
   * the top of the sticker.
   */
  private rotateBorder(stickers: Geometry[], radians: number) {
    stickers.forEach((sticker) => {
      sticker.vertices = sticker.vertices.map((vertex) => {
        return vec3.rotateX(
          vertex,
          vertex,
          [0, this.halfStickerWidth, 0],
          radians
        );
      });
    });
  }
}
