import { DEG_60_RADIANS } from './../math/constants';
import { TriangleLattice } from './../geometry/triangleLattice';
import { Group } from './../geometry/group';
import { Object3D } from './../geometry/object3d';

const ARC_COS_THIRD = Math.acos(1/3);
const DEG_120_RADIANS = (120 * Math.PI) / 180;
const SQRT_24 = Math.sqrt(24);

export class Pyraminx {
  faces: Object3D[];
  group: Group;

  constructor(size: number, sideLength: number = 1.75) {
    const insphereRadius = sideLength / SQRT_24;

    const U = new TriangleLattice(sideLength, size, { value: '#FF0000'});
    const L = new TriangleLattice(sideLength, size, { value: '#00FF00'});
    const R = new TriangleLattice(sideLength, size, { value: '#0000FF'});
    const B = new TriangleLattice(sideLength, size, { value: '#FFFF00'});

    U.rotate(DEG_120_RADIANS, [0,0,1]);
    U.rotate(ARC_COS_THIRD, [1,0,0]);
    U.translate([0,0,insphereRadius]);

    L.rotate(ARC_COS_THIRD, [1,0,0]);
    L.translate([0,0,insphereRadius]);

    R.rotate(-DEG_120_RADIANS, [0,0,1]);
    R.rotate(ARC_COS_THIRD, [1,0,0]);
    R.translate([0,0,insphereRadius]);

    B.rotate(Math.PI, [0,1,0]);
    B.translate([0,0,insphereRadius]);

    this.faces = [
      U,
      L,
      R,
      B
    ];

    this.group = new Group(this.faces);

    this.group.rotate(-Math.PI/3, [1,0,0]);
    this.group.rotate(Math.PI/2.5, [0,0,1]);
  }
}