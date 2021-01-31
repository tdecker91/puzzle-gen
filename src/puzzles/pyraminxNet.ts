import { Face } from "./../geometry/face";
import { IColor } from "./../geometry/color";
import { GREEN, RED, BLUE, YELLOW, BLACK } from "./colors";
import { TriangleLattice } from "./../geometry/triangleLattice";
import { Group } from "./../geometry/group";
import { Object3D } from "./../geometry/object3d";
import { SQRT_3 } from "../math/constants";
import { chunkArray } from "../utils/arrays";

const DEG_60_RADIANS = (60 * Math.PI) / 180;

export class PyraminxNet {
  faces: Object3D[];
  group: Group;

  private size: number;

  private L: TriangleLattice;
  private R: TriangleLattice;
  private U: TriangleLattice;
  private B: TriangleLattice;

  constructor(size: number, sideLength: number = 0.925) {
    this.size = size;

    const fullHeight = sideLength * (SQRT_3 / 2);
    const inDiameter = fullHeight / 1.5;

    const U = new TriangleLattice(sideLength, size, YELLOW);
    const R = new TriangleLattice(sideLength, size, GREEN);
    const L = new TriangleLattice(sideLength, size, BLUE);
    const B = new TriangleLattice(sideLength, size, RED);

    this.L = L;
    this.R = R;
    this.U = U;
    this.B = B;

    R.rotate(-DEG_60_RADIANS, [0, 0, 1]);
    R.translate([0, inDiameter, 0]);
    R.rotate(2 * DEG_60_RADIANS, [0, 0, 1]);

    U.rotate(DEG_60_RADIANS, [0, 0, 1]);
    U.translate([0, inDiameter, 0]);
    U.rotate(-2 * DEG_60_RADIANS, [0, 0, 1]);

    B.rotate(3 * DEG_60_RADIANS, [0, 0, 1]);
    B.translate([0, inDiameter, 0]);
    B.rotate(-2 * DEG_60_RADIANS, [0, 0, 1]);

    this.faces = [U, R, L, B];

    this.group = new Group(this.faces);
  }

  setColors(colors: { [face: string]: IColor[] }) {
    let { left, right, top, back } = colors;

    this.setFaceColors(this.L, left);
    this.setFaceColors(this.R, right);
    this.setFaceColors(this.U, top);
    this.setFaceColors(this.B, back);
  }

  private setFaceColors(lattice: TriangleLattice, colors: IColor[]) {
    lattice.faces.forEach((f: Face, i) => {
      if (colors && colors[i]) {
        f.color = colors[i];
      } else {
        f.color = BLACK;
      }
    });
  }
}
