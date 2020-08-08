import { vec3 } from "gl-matrix";
import { IColor } from "./color";

export interface IFace {
  normal: vec3;
  verticies: number[];
  color?: IColor;
}

export class Face4 implements IFace {
  a: number;
  b: number;
  c: number;
  d: number;
  verticies: number[];
  normal: vec3;
  color: IColor;

  constructor(a: number, b: number, c: number, d: number, normal?: vec3, color?: IColor) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.verticies = [a, b, c, d];
    this.color = color;

    console.warn('need to calculate or set normal');

    this.normal = normal;
  }
}