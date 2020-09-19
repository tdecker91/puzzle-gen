import { IColor } from './color';
import { IFace, Face } from './face';
import { vec3 } from 'gl-matrix';
import { Geometry } from "./geometry";
import { SQRT_3 } from "../math/constants";

/**
 * Geometry to build a triangle lattice for the
 * pyraminx puzzle
 */
export class TriangleLattice extends Geometry {
  constructor(base: number, size: number, color: IColor) {
    const halfBase = base/2;
    const fullHeight = base * (SQRT_3 / 2);
    const triangleBase = base/size;
    const triangleHeight = fullHeight/size;
    const inradius = fullHeight/3

    let vertices: vec3[] = [];
    let faces: IFace[] = [];

    /**
     *       9
     *     7   8
     *   4   5   6 
     * 0   1   2   3
     */
    let index = 0;
    for (let layer = 0; layer <= size; layer++) {
      for (let vertex = 0, count = size - layer; vertex <= count; vertex++) {
        const horizontalOffset =  -halfBase;
        const verticalOffset = -inradius;

        const x = (triangleBase * vertex) + (layer * triangleBase/2) + horizontalOffset;
        const y = (triangleHeight * layer) + verticalOffset

        vertices.push([x, y, 0]);

        if (vertex < count && layer < size) {
          // up triangle
          faces.push(new Face([index,index+1,index+count+1], null, color))
          // console.log('face', index, index+1, index+count+1);
          // down triangle
          if (layer > 0) {
            faces.push(new Face([index, index+1, index-count-1], null, color));
          }
        }

        index++;
      }
    }

    super(vertices, faces);
  }
}