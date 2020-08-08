import { Geometry } from "./geometry";
import { vec3 } from "gl-matrix";
import { IFace, Face4 } from "./face";
import { IColor } from "./color";

export class Plane extends Geometry {

  constructor(width: number, height: number, color: IColor) {
    let verticies: vec3[] = [
      vec3.clone([-width/2,height/2,0]),
      vec3.clone([width/2,height/2,0]),
      vec3.clone([width/2,-height/2,0]),
      vec3.clone([-width/2,-height/2,0]),
    ];
    let faces: IFace[] = [
      new Face4(0, 1, 2, 3)
    ];
    super(verticies, faces, color);
  }
 
}