import { Geometry } from "./../geometry/geometry";
import { Face } from "./../geometry/face";
import { IColor } from "./../geometry/color";
import {
  WHITE,
  RED,
  GREEN,
  PURPLE,
  YELLOW,
  BLUE,
  GREY,
  DARK_BLUE,
  LIGHT_YELLOW,
  PINK,
  LIGHT_GREEN,
  ORANGE,
  BLACK,
} from "./colors";
import { Group } from "./../geometry/group";
import { DividedPentagon } from "./../geometry/dividedPentagon";
import { pentagonInRadius } from "../math/utils";
import { chunkArray } from "../utils/arrays";
import { Matrix4 } from "../math/matrix";

const DEG_36_RADIANS = (36 * Math.PI) / 180;
const DEG_72_RADIANS = (72 * Math.PI) / 180;

/**
 * for a megaminx with side length 1,
 * layer widths that look good.
 */
const OPTIMAL_LAYER_WIDTH = {
  2: 0.3,
  3: 0.17,
  4: 0.121,
};

function getLayerWidth(length: number, layers: number): number {
  return OPTIMAL_LAYER_WIDTH[layers] || length / (layers * 1.9);
}

export class MegaminxNet {
  faces: { [face: string]: Geometry };
  group: Group;

  private layers: number;

  private U: DividedPentagon;
  private R: DividedPentagon;
  private F: DividedPentagon;
  private dr: DividedPentagon;
  private dl: DividedPentagon;
  private L: DividedPentagon;

  private d: DividedPentagon;
  private br: DividedPentagon;
  private BR: DividedPentagon;
  private BL: DividedPentagon;
  private bl: DividedPentagon;
  private b: DividedPentagon;

  constructor(layers: number) {
    this.layers = layers;
    const sideLength = 0.75;
    const layerWidth = getLayerWidth(length, layers);

    // Left
    this.U = new DividedPentagon(WHITE, layers, sideLength, layerWidth);
    this.F = new DividedPentagon(RED, layers, sideLength, layerWidth);
    this.R = new DividedPentagon(BLUE, layers, sideLength, layerWidth);
    this.L = new DividedPentagon(GREEN, layers, sideLength, layerWidth);
    this.dl = new DividedPentagon(LIGHT_YELLOW, layers, sideLength, layerWidth);
    this.dr = new DividedPentagon(PINK, layers, sideLength, layerWidth);

    // Right
    this.BL = new DividedPentagon(PURPLE, layers, sideLength, layerWidth);
    this.BR = new DividedPentagon(YELLOW, layers, sideLength, layerWidth);
    this.d = new DividedPentagon(GREY, layers, sideLength, layerWidth);
    this.bl = new DividedPentagon(DARK_BLUE, layers, sideLength, layerWidth);
    this.br = new DividedPentagon(LIGHT_GREEN, layers, sideLength, layerWidth);
    this.b = new DividedPentagon(ORANGE, layers, sideLength, layerWidth);

    const ind = 2 * pentagonInRadius(sideLength);

    // Left
    this.U.translate(0, ind, 0);
    this.U.rotate(5 * DEG_36_RADIANS, 0, 0, 1);

    this.R.rotate(-DEG_72_RADIANS, 0, 0, 1);
    this.R.translate(0, ind, 0);
    this.R.rotate(5 * DEG_36_RADIANS, 0, 0, 1);

    this.L.rotate(DEG_72_RADIANS, 0, 0, 1);
    this.L.translate(0, ind, 0);
    this.L.rotate(-5 * DEG_36_RADIANS, 0, 0, 1);

    this.dl.rotate(2 * DEG_72_RADIANS, 0, 0, 1);
    this.dl.translate(0, ind, 0);
    this.dl.rotate(-5 * DEG_36_RADIANS, 0, 0, 1);

    this.dr.rotate(-2 * DEG_72_RADIANS, 0, 0, 1);
    this.dr.translate(0, ind, 0);
    this.dr.rotate(-5 * DEG_36_RADIANS, 0, 0, 1);

    // Right
    this.b.rotate(Math.PI, 0, 0, 1);
    this.b.rotate(-2 * DEG_36_RADIANS, 0, 0, 1);

    this.d.rotate(3 * DEG_36_RADIANS, 0, 0, 1);
    this.d.translate(0, ind, 0);
    this.d.rotate(5 * DEG_36_RADIANS, 0, 0, 1);

    this.br.rotate(DEG_36_RADIANS, 0, 0, 1);
    this.br.translate(0, ind, 0);
    this.br.rotate(5 * DEG_36_RADIANS, 0, 0, 1);

    this.BR.rotate(-DEG_36_RADIANS, 0, 0, 1);
    this.BR.translate(0, ind, 0);
    this.BR.rotate(-5 * DEG_36_RADIANS, 0, 0, 1);

    this.BL.rotate(-3 * DEG_36_RADIANS, 0, 0, 1);
    this.BL.translate(0, ind, 0);
    this.BL.rotate(5 * DEG_36_RADIANS, 0, 0, 1);

    this.bl.rotate(5 * DEG_36_RADIANS, 0, 0, 1);
    this.bl.translate(0, ind, 0);
    this.bl.rotate(-5 * DEG_36_RADIANS, 0, 0, 1);

    let bottomTransforms = new Matrix4();
    bottomTransforms.rotate(-DEG_72_RADIANS, 0, 0, 1);
    bottomTransforms.translate(0, 2 * ind, 0);
    bottomTransforms.rotate(2 * DEG_72_RADIANS, 0, 0, 1);
    bottomTransforms.translate(0, -ind, 0);

    [this.d, this.bl, this.BL, this.BR, this.br, this.b].forEach((face) => {
      Matrix4.multiply(face.matrix, bottomTransforms, face.matrix);
    });

    this.faces = {
      U: this.U,
      F: this.F,
      R: this.R,
      dr: this.dr,
      dl: this.dl,
      L: this.L,
      d: this.d,
      br: this.br,
      BR: this.BR,
      BL: this.BL,
      bl: this.bl,
      b: this.b,
    };

    this.group = new Group([
      this.U,
      this.F,
      this.L,
      this.dr,
      this.dl,
      this.R,
      this.d,
      this.bl,
      this.BL,
      this.BR,
      this.br,
      this.b,
    ]);
    this.group.scale(0.33, 0.33, 0.33);
    this.group.translate(-1.75 * sideLength, 0, 0);
  }

  setColors(colors: { [face: string]: IColor[] }) {
    let { U, R, F, d, L, b, dr, dl, br, BR, BL, bl } = colors;

    this.setFaceColors(this.U, U);
    this.setFaceColors(this.R, R);
    this.setFaceColors(this.F, F);
    this.setFaceColors(this.d, d);
    this.setFaceColors(this.L, L);
    this.setFaceColors(this.b, b);
    this.setFaceColors(this.dr, dr);
    this.setFaceColors(this.dl, dl);
    this.setFaceColors(this.BR, BR);
    this.setFaceColors(this.BL, BL);
    this.setFaceColors(this.bl, bl);
    this.setFaceColors(this.br, br);
  }

  oldSetColors(colors: IColor[]) {
    const n = this.layers;
    const numStickers = 5 * n * n - 5 * n + 1;
    let [U, R, F, dr, dl, L, d, br, BR, BL, bl, b] = chunkArray<IColor>(
      colors,
      numStickers
    );

    this.setFaceColors(this.U, U);
    this.setFaceColors(this.R, R);
    this.setFaceColors(this.F, F);
    this.setFaceColors(this.d, d);
    this.setFaceColors(this.L, L);
    this.setFaceColors(this.b, b);
    this.setFaceColors(this.dr, dr);
    this.setFaceColors(this.dl, dl);
    this.setFaceColors(this.br, br);
    this.setFaceColors(this.BR, BR);
    this.setFaceColors(this.BL, BL);
    this.setFaceColors(this.bl, bl);
  }

  private setFaceColors(faceStickers: DividedPentagon, colors: IColor[]) {
    faceStickers.faces.forEach((f: Face, i) => {
      if (colors && colors[i]) {
        f.color = colors[i];
      } else {
        f.color = BLACK;
      }
    });
  }
}
