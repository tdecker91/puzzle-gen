import { Matrix4 } from "../math/matrix";

export class Camera {
  matrix: Matrix4;

  constructor() {
    this.matrix = Matrix4.perspective(Math.PI / 2, 1, 0.1, 1000);
    this.matrix.translate(0, 0, -5);
    this.matrix.scale(4, 4, 1);
  }
}
