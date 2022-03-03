/**
 * Credit to logic https://github.com/toji/gl-matrix/blob/master/src/mat4.js
 */

import { Quaternion } from "./quaternion";

const EPSILON = 0.000001;

export class Matrix4 {
  public values: number[];

  /**
   * Returns a 4x4 matrix with the given values
   */
  static fromValues(
    m1: number,
    m2: number,
    m3: number,
    m4: number,
    m5: number,
    m6: number,
    m7: number,
    m8: number,
    m9: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m14: number,
    m15: number,
    m16: number
  ): Matrix4 {
    return new Matrix4([
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m9,
      m10,
      m11,
      m12,
      m13,
      m14,
      m15,
      m16,
    ]);
  }

  static fromQuaternion(q: Quaternion): Matrix4 {
    let { a: x, b: y, c: z, d: w } = q;

    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    return Matrix4.fromValues(
      1 - yy - zz,
      yx + wz,
      zx - wy,
      0,
      yx - wz,
      1 - xx - zz,
      zy + wx,
      0,
      zx + wy,
      zy - wx,
      1 - xx - yy,
      0,
      0,
      0,
      0,
      1
    );
  }

  static fromTranslation(x: number, y: number, z: number) {
    return Matrix4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1);
  }

  static fromXRotation(radians: number) {
    let s = Math.sin(radians);
    let c = Math.cos(radians);

    return Matrix4.fromValues(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
  }

  static fromYRotation(radians: number) {
    let s = Math.sin(radians);
    let c = Math.cos(radians);

    return Matrix4.fromValues(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
  }

  /**
   * copy values from one matrix to another
   */
  static copy(out: Matrix4, matrix: Matrix4) {
    out.values[0] = matrix.values[0];
    out.values[1] = matrix.values[1];
    out.values[2] = matrix.values[2];
    out.values[3] = matrix.values[3];
    out.values[4] = matrix.values[4];
    out.values[5] = matrix.values[5];
    out.values[6] = matrix.values[6];
    out.values[7] = matrix.values[7];
    out.values[8] = matrix.values[8];
    out.values[9] = matrix.values[9];
    out.values[10] = matrix.values[10];
    out.values[11] = matrix.values[11];
    out.values[12] = matrix.values[12];
    out.values[13] = matrix.values[13];
    out.values[14] = matrix.values[14];
    out.values[15] = matrix.values[15];
  }

  static multiply(out: Matrix4, a: Matrix4, b: Matrix4): Matrix4 {
    let a00 = a.values[0],
      a01 = a.values[1],
      a02 = a.values[2],
      a03 = a.values[3];
    let a10 = a.values[4],
      a11 = a.values[5],
      a12 = a.values[6],
      a13 = a.values[7];
    let a20 = a.values[8],
      a21 = a.values[9],
      a22 = a.values[10],
      a23 = a.values[11];
    let a30 = a.values[12],
      a31 = a.values[13],
      a32 = a.values[14],
      a33 = a.values[15];

    // Cache only the current line of the second matrix
    let b0 = b.values[0],
      b1 = b.values[1],
      b2 = b.values[2],
      b3 = b.values[3];
    out.values[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out.values[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out.values[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out.values[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b.values[4];
    b1 = b.values[5];
    b2 = b.values[6];
    b3 = b.values[7];
    out.values[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out.values[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out.values[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out.values[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b.values[8];
    b1 = b.values[9];
    b2 = b.values[10];
    b3 = b.values[11];
    out.values[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out.values[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out.values[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out.values[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b.values[12];
    b1 = b.values[13];
    b2 = b.values[14];
    b3 = b.values[15];
    out.values[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out.values[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out.values[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out.values[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  /**
   * Generates a perspective projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   */
  static perspective(
    fovy: number,
    aspect: number,
    near: number,
    far: number
  ): Matrix4 {
    const f = 1.0 / Math.tan(fovy / 2);
    const values = [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0];

    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      values[10] = (far + near) * nf;
      values[14] = 2 * far * near * nf;
    } else {
      values[10] = -1;
      values[14] = -2 * near;
    }

    return new Matrix4(values);
  }

  constructor(values?: number[]) {
    if (Array.isArray(values) && values.length == 16) {
      this.values = values;
    } else {
      this.values = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
  }

  translate(x: number, y: number, z: number) {
    this.values[12] =
      this.values[0] * x +
      this.values[4] * y +
      this.values[8] * z +
      this.values[12];
    this.values[13] =
      this.values[1] * x +
      this.values[5] * y +
      this.values[9] * z +
      this.values[13];
    this.values[14] =
      this.values[2] * x +
      this.values[6] * y +
      this.values[10] * z +
      this.values[14];
    this.values[15] =
      this.values[3] * x +
      this.values[7] * y +
      this.values[11] * z +
      this.values[15];
  }

  scale(x: number, y: number, z: number) {
    this.values[0] = this.values[0] * x;
    this.values[1] = this.values[1] * x;
    this.values[2] = this.values[2] * x;
    this.values[3] = this.values[3] * x;
    this.values[4] = this.values[4] * y;
    this.values[5] = this.values[5] * y;
    this.values[6] = this.values[6] * y;
    this.values[7] = this.values[7] * y;
    this.values[8] = this.values[8] * z;
    this.values[9] = this.values[9] * z;
    this.values[10] = this.values[10] * z;
    this.values[11] = this.values[11] * z;
  }

  /**
   * Rotates the matrix by the given angle around the axis (x, y, z)
   */
  rotate(radians: number, x: number, y: number, z: number) {
    let len = Math.hypot(x, y, z);

    if (len < EPSILON) {
      return;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    let s = Math.sin(radians);
    let c = Math.cos(radians);
    let t = 1 - c;

    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;

    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    a00 = this.values[0];
    a01 = this.values[1];
    a02 = this.values[2];
    a03 = this.values[3];
    a10 = this.values[4];
    a11 = this.values[5];
    a12 = this.values[6];
    a13 = this.values[7];
    a20 = this.values[8];
    a21 = this.values[9];
    a22 = this.values[10];
    a23 = this.values[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    this.values[0] = a00 * b00 + a10 * b01 + a20 * b02;
    this.values[1] = a01 * b00 + a11 * b01 + a21 * b02;
    this.values[2] = a02 * b00 + a12 * b01 + a22 * b02;
    this.values[3] = a03 * b00 + a13 * b01 + a23 * b02;
    this.values[4] = a00 * b10 + a10 * b11 + a20 * b12;
    this.values[5] = a01 * b10 + a11 * b11 + a21 * b12;
    this.values[6] = a02 * b10 + a12 * b11 + a22 * b12;
    this.values[7] = a03 * b10 + a13 * b11 + a23 * b12;
    this.values[8] = a00 * b20 + a10 * b21 + a20 * b22;
    this.values[9] = a01 * b20 + a11 * b21 + a21 * b22;
    this.values[10] = a02 * b20 + a12 * b21 + a22 * b22;
    this.values[11] = a03 * b20 + a13 * b21 + a23 * b22;
  }

  multiply(b: Matrix4) {
    Matrix4.multiply(this, this, b);
  }
}
