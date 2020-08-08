import { mat4 } from "gl-matrix";

export class Camera {

  matrix: mat4;

  constructor() {
    // this.matrix = mat4.create();
    // this.matrix = 
    this.matrix = mat4.create();
    mat4.perspective(this.matrix, Math.PI/2, 1, .1, 1000);
    mat4.scale(this.matrix, this.matrix, [1,-1,1]);
    mat4.translate(this.matrix, this.matrix, [0, 0, -5]);
  }

}