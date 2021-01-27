import { Geometry } from "./../../geometry/geometry";
import { IColor } from "./../../geometry/color";
import { YELLOW, RED, BLUE, WHITE, ORANGE, GREEN } from "./../colors";
import { Group } from "../../geometry/group";
import { Object3D } from "../../geometry/object3d";
import { makeGrid } from "../../geometry/grid";
import { chunkArray } from "../../utils/arrays";

export class RubiksCube {
  stickers: Object3D[];
  group: Group;

  private size: number;

  private U: Group;
  private R: Group;
  private F: Group;
  private D: Group;
  private L: Group;
  private B: Group;

  constructor(size: number) {
    this.size = size;
    const cubeWidth = 1.5;
    const halfWidth = cubeWidth / 2;

    this.U = new Group(makeGrid(cubeWidth, size, YELLOW));
    this.R = new Group(makeGrid(cubeWidth, size, RED));
    this.F = new Group(makeGrid(cubeWidth, size, BLUE));
    this.D = new Group(makeGrid(cubeWidth, size, WHITE));
    this.L = new Group(makeGrid(cubeWidth, size, ORANGE));
    this.B = new Group(makeGrid(cubeWidth, size, GREEN));

    this.U.rotate(-Math.PI / 2, [0, 1, 0]);
    this.U.rotate(-Math.PI / 2, [1, 0, 0]);
    this.U.translate([0, 0, halfWidth]);

    this.R.translate([0, 0, halfWidth]);

    this.F.rotate(-Math.PI / 2, [0, 1, 0]);
    this.F.translate([0, 0, halfWidth]);

    this.D.rotate(-Math.PI / 2, [0, 1, 0]);
    this.D.rotate(Math.PI / 2, [1, 0, 0]);
    this.D.translate([0, 0, halfWidth]);

    this.L.rotate(-Math.PI, [0, 1, 0]);
    this.L.translate([0, 0, halfWidth]);

    this.B.rotate(Math.PI / 2, [0, 1, 0]);
    this.B.translate([0, 0, halfWidth]);

    this.stickers = [this.U, this.R, this.F, this.D, this.L, this.B];

    this.group = new Group(this.stickers);

    this.group.translate([0, 0, -1]);
    this.group.rotate(0.593411946, [1, 0, 0]);
    this.group.rotate(0.785398, [0, 1, 0]);
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
    this.setFaceColors(this.D, d);
    this.setFaceColors(this.L, l);
    this.setFaceColors(this.B, b);
  }
}
