import { Face } from "./../geometry/face";
import { IColor } from "./../geometry/color";
import { GREEN, RED, BLUE, YELLOW, BLACK } from "./colors";
import { TriangleLattice } from "./../geometry/triangleLattice";
import { Group } from "./../geometry/group";
import { Object3D } from "./../geometry/object3d";
import { chunkArray } from "../utils/arrays";

const ARC_COS_THIRD = Math.acos(1 / 3);
const DEG_120_RADIANS = (120 * Math.PI) / 180;
const SQRT_24 = Math.sqrt(24);

export class Pyraminx {
  faces: Object3D[];
  group: Group;

  private size: number;

  private L: TriangleLattice;
  private R: TriangleLattice;
  private U: TriangleLattice;
  private B: TriangleLattice;

  constructor(size: number, sideLength: number = 1.75) {
    this.size = size;

    const insphereRadius = sideLength / SQRT_24;

    const U = new TriangleLattice(sideLength, size, YELLOW);
    const R = new TriangleLattice(sideLength, size, GREEN);
    const L = new TriangleLattice(sideLength, size, BLUE);
    const B = new TriangleLattice(sideLength, size, RED);

    this.L = L;
    this.R = R;
    this.U = U;
    this.B = B;

    U.rotate(DEG_120_RADIANS, [0, 0, 1]);
    U.rotate(ARC_COS_THIRD, [1, 0, 0]);
    U.translate([0, 0, insphereRadius]);

    R.rotate(ARC_COS_THIRD, [1, 0, 0]);
    R.translate([0, 0, insphereRadius]);

    L.rotate(-DEG_120_RADIANS, [0, 0, 1]);
    L.rotate(ARC_COS_THIRD, [1, 0, 0]);
    L.translate([0, 0, insphereRadius]);

    B.rotate(Math.PI, [0, 1, 0]);
    B.translate([0, 0, insphereRadius]);

    this.faces = [U, L, R, B];

    this.group = new Group(this.faces);

    this.group.rotate(-Math.PI / 3, [1, 0, 0]);
    this.group.rotate(Math.PI / 2.5, [0, 0, 1]);
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
