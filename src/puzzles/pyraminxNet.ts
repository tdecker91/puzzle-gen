import { TriangleLattice } from './../geometry/triangleLattice';
import { Group } from './../geometry/group';
import { Object3D } from './../geometry/object3d';
import { SQRT_3 } from '../math/constants';

const DEG_60_RADIANS = (60 * Math.PI) / 180;

export class PyraminxNet {
  faces: Object3D[];
  group: Group;

  constructor(size: number, sideLength: number = .925) {
    const fullHeight = sideLength * (SQRT_3 / 2);
    const inDiameter = fullHeight/1.5

    const U = new TriangleLattice(sideLength, size, { value: '#FF0000'});
    const L = new TriangleLattice(sideLength, size, { value: '#00FF00'});
    const R = new TriangleLattice(sideLength, size, { value: '#0000FF'});
    const B = new TriangleLattice(sideLength, size, { value: '#FFFF00'});

    U.rotate(-DEG_60_RADIANS, [0,0,1]);
    U.translate([0,inDiameter,0]);

    R.rotate(DEG_60_RADIANS, [0,0,1]);
    R.translate([0,inDiameter,0]);

    B.rotate(3 * DEG_60_RADIANS, [0,0,1]);
    B.translate([0,inDiameter,0]);

    this.faces = [
      U,
      L,
      R,
      B
    ];

    this.group = new Group(this.faces);
  }
}