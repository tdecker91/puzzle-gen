import { Geometry } from "./../../geometry/geometry";
import { IColor } from "./../../geometry/color";
import { YELLOW, RED, BLUE, WHITE, ORANGE, GREEN, BLACK } from "./../colors";
import { Group } from "../../geometry/group";
import { Object3D } from "../../geometry/object3d";
import { makeGrid } from "../../geometry/grid";

export class RubiksCube {
  stickers: Object3D[];
  group: Group;
  faces: { [face: string]: Group };

  private size: number;

  private U: Group;
  private R: Group;
  private F: Group;
  private D: Group;
  private L: Group;
  private B: Group;

  constructor(size: number) {
    this.size = size;
    const cubeWidth = 1.25;
    const halfWidth = cubeWidth / 2;

    this.U = new Group(makeGrid(cubeWidth, size, YELLOW));
    this.R = new Group(makeGrid(cubeWidth, size, RED));
    this.F = new Group(makeGrid(cubeWidth, size, BLUE));
    this.D = new Group(makeGrid(cubeWidth, size, WHITE));
    this.L = new Group(makeGrid(cubeWidth, size, ORANGE));
    this.B = new Group(makeGrid(cubeWidth, size, GREEN));

    this.U.rotate(-Math.PI / 2, 0, 1, 0);
    this.U.rotate(-Math.PI / 2, 1, 0, 0);
    this.U.translate(0, 0, halfWidth);

    this.R.translate(0, 0, halfWidth);

    this.F.rotate(-Math.PI / 2, 0, 1, 0);
    this.F.translate(0, 0, halfWidth);

    this.D.rotate(-Math.PI / 2, 0, 1, 0);
    this.D.rotate(Math.PI / 2, 1, 0, 0);
    this.D.translate(0, 0, halfWidth);

    this.L.rotate(-Math.PI, 0, 1, 0);
    this.L.translate(0, 0, halfWidth);

    this.B.rotate(Math.PI / 2, 0, 1, 0);
    this.B.translate(0, 0, halfWidth);

    this.stickers = [this.U, this.R, this.F, this.D, this.L, this.B];

    this.faces = {
      U: this.U,
      R: this.R,
      F: this.F,
      D: this.D,
      L: this.L,
      B: this.B,
    };

    this.group = new Group(this.stickers);
  }

  private setFaceColors(faceStickers: Group, colors: IColor[]) {
    faceStickers.objects.forEach((g: Geometry, i) => {
      if (colors && colors[i]) {
        g.faces[0].color = colors[i];
      } else {
        g.faces[0].color = BLACK;
      }
    });
  }

  setColors(colors: { [face: string]: IColor[] }) {
    let { U, R, F, D, L, B } = colors;

    this.setFaceColors(this.U, U);
    this.setFaceColors(this.R, R);
    this.setFaceColors(this.F, F);
    this.setFaceColors(this.D, D);
    this.setFaceColors(this.L, L);
    this.setFaceColors(this.B, B);
  }
}
