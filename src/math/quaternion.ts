/**
 * Credit to logic https://github.com/toji/gl-matrix/blob/master/src/quat.js
 */
export class Quaternion {
  static fromEuler(x: number, y: number, z: number): Quaternion {
    let halfToRad = Math.PI / 360;
    x *= halfToRad;
    z *= halfToRad;
    y *= halfToRad;

    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);

    let a = sx * cy * cz - cx * sy * sz;
    let b = cx * sy * cz + sx * cy * sz;
    let c = cx * cy * sz - sx * sy * cz;
    let d = cx * cy * cz + sx * sy * sz;

    return new Quaternion(a, b, c, d);
  }

  constructor(
    public a: number,
    public b: number,
    public c: number,
    public d: number
  ) {}
}
