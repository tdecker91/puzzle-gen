/**
 * Credit to logic https://github.com/toji/gl-matrix/blob/master/src/vec3.js
 */
import { Matrix4 } from "./matrix";

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  static fromValues(x: number, y: number, z: number) {
    return new Vector3(x, y, z);
  }

  static fromVec2(vec2: Vector2) {
    return new Vector3(vec2.x, vec2.y, 0);
  }

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  transformMat4(m: Matrix4) {
    let w =
      m.values[3] * this.x +
      m.values[7] * this.y +
      m.values[11] * this.z +
      m.values[15];
    w = w || 1.0;

    const x =
      (m.values[0] * this.x +
        m.values[4] * this.y +
        m.values[8] * this.z +
        m.values[12]) /
      w;
    const y =
      (m.values[1] * this.x +
        m.values[5] * this.y +
        m.values[9] * this.z +
        m.values[13]) /
      w;
    const z =
      (m.values[2] * this.x +
        m.values[6] * this.y +
        m.values[10] * this.z +
        m.values[14]) /
      w;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  translate(x: number, y: number, z: number) {
    this.x += x;
    this.y += y;
    this.z += z;

    return this;
  }

  multiply(x: number, y: number, z: number) {
    this.x = this.x * x;
    this.y = this.y * y;
    this.z = this.z * z;
  }

  rotateX(origin: Vector3, radians: number) {
    // translate point to origin
    let x = this.x - origin.x;
    let y = this.y - origin.y;
    let z = this.z - origin.z;

    // rotate
    this.x = x;
    this.y = y * Math.cos(radians) - z * Math.sin(radians);
    this.z = y * Math.sin(radians) + z * Math.cos(radians);

    // translate back
    this.x += origin.x;
    this.y += origin.y;
    this.z += origin.z;

    return this;
  }

  rotateZ(origin: Vector3, radians: number) {
    // translate point to origin
    let x = this.x - origin.x;
    let y = this.y - origin.y;
    let z = this.z - origin.z;

    // rotate
    this.x = x * Math.cos(radians) - y * Math.sin(radians);
    this.y = x * Math.sin(radians) + y * Math.cos(radians);
    this.z = z;

    // translate back
    this.x += origin.x;
    this.y += origin.y;
    this.z += origin.z;

    return this;
  }

  clone() {
    return Vector3.fromValues(this.x, this.y, this.z);
  }
}

export class Vector2 {
  public x: number;
  public y: number;

  static fromValues(x: number, y: number) {
    return new Vector2(x, y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
