import { Geometry } from './geometry';
import { vec3 } from 'gl-matrix';
import { IFace, Face4 } from './face';

export class Cube extends Geometry {

  /**
   *   0 - - - 1
   *   | \     | \
   *   |   3 - - - 2
   *   |   |   |   |
   *   4 - | - 5   |
   *     \ |     \ |
   *       7 - - - 6 
   */
  constructor(width: number) {
    const vertices: vec3[] = [
      [-width/2,width/2,width/2], 
      [width/2,width/2,width/2],
      [width/2,-width/2,width/2],
      [-width/2,-width/2,width/2],
      [-width/2,width/2,-width/2],
      [width/2,width/2,-width/2],
      [width/2,-width/2,-width/2],
      [-width/2,-width/2,-width/2],
    ];
    const faces: IFace[] = [
      new Face4(0,1,2,3),
      new Face4(3,2,6,7),
      new Face4(2,1,5,6),
      new Face4(7,6,5,4),
      new Face4(1,0,4,5),
      new Face4(0,3,7,4),
    ]
    super(vertices, faces);
  }

}