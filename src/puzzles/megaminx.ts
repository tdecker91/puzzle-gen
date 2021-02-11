import { Face } from "./../geometry/face";
import { IColor } from "./../geometry/color";
import {
  WHITE,
  RED,
  GREEN,
  YELLOW,
  BLUE,
  ORANGE,
  LIGHT_GREEN,
  PINK,
  LIGHT_YELLOW,
  DARK_BLUE,
  GREY,
  PURPLE,
  BLACK,
} from "./colors";
import { Group } from "./../geometry/group";
import { Object3D } from "./../geometry/object3d";
import { DividedPentagon } from "../geometry/dividedPentagon";
import { dodecahedronInRadius } from "../math/utils";

const OPTIMAL_LAYER_WIDTH = {
  2: 0.3,
  3: 0.17,
  4: 0.121,
};

function getLayerWidth(length: number, layers: number): number {
  return OPTIMAL_LAYER_WIDTH[layers] || length / (layers * 1.9);
}

export class Megaminx {
  stickers: Object3D[];
  group: Group;
  faces: { [face: string]: DividedPentagon };

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

  constructor(layers: number = 2) {
    this.layers = layers;
    const length = 0.75;
    const megaminxRadius = dodecahedronInRadius(length);
    const layerWidth = getLayerWidth(length, layers);

    // Front
    this.U = new DividedPentagon(WHITE, layers, length, layerWidth);
    this.F = new DividedPentagon(RED, layers, length, layerWidth);
    this.R = new DividedPentagon(BLUE, layers, length, layerWidth);
    this.dr = new DividedPentagon(PINK, layers, length, layerWidth);
    this.dl = new DividedPentagon(LIGHT_YELLOW, layers, length, layerWidth);
    this.L = new DividedPentagon(GREEN, layers, length, layerWidth);

    // Back
    this.d = new DividedPentagon(GREY, layers, length, layerWidth);
    this.br = new DividedPentagon(LIGHT_GREEN, layers, length, layerWidth);
    this.BR = new DividedPentagon(YELLOW, layers, length, layerWidth);
    this.BL = new DividedPentagon(PURPLE, layers, length, layerWidth);
    this.bl = new DividedPentagon(DARK_BLUE, layers, length, layerWidth);
    this.b = new DividedPentagon(ORANGE, layers, length, layerWidth);

    this.F.translate([0, 0, megaminxRadius]);

    this.b.rotate(Math.PI, [0, 0, 1]);
    this.b.rotate(Math.PI, [0, 1, 0]);
    this.b.translate([0, 0, megaminxRadius]);

    this.U.rotate(Math.PI, [0, 0, 1]);
    this.U.rotate(((180 - 116.57) * Math.PI) / 180, [1, 0, 0]);
    this.U.translate([0, 0, megaminxRadius]);

    this.L.rotate((72 * Math.PI) / 180, [0, 0, 1]);
    this.L.rotate(Math.PI, [0, 0, 1]);
    this.L.rotate(((180 - 116.57) * Math.PI) / 180, [1, 0, 0]);
    this.L.translate([0, 0, megaminxRadius]);

    this.R.rotate((72 * Math.PI) / 180, [0, 0, 1]);
    this.R.rotate(Math.PI / 5, [0, 0, 1]);
    this.R.rotate(((180 - 116.57) * Math.PI) / 180, [1, 0, 0]);
    this.R.translate([0, 0, megaminxRadius]);

    this.dr.rotate((72 * Math.PI) / 180, [0, 0, 1]);
    this.dr.rotate(-Math.PI / 5, [0, 0, 1]);
    this.dr.rotate(((180 - 116.57) * Math.PI) / 180, [1, 0, 0]);
    this.dr.translate([0, 0, megaminxRadius]);

    this.dl.rotate((72 * Math.PI) / 180, [0, 0, 1]);
    this.dl.rotate((-3 * Math.PI) / 5, [0, 0, 1]);
    this.dl.rotate(((180 - 116.57) * Math.PI) / 180, [1, 0, 0]);
    this.dl.translate([0, 0, megaminxRadius]);

    this.BL.rotate(Math.PI / 5, [0, 0, 1]);
    this.BL.rotate((-116.57 * Math.PI) / 180, [1, 0, 0]);
    this.BL.translate([0, 0, megaminxRadius]);

    this.BR.rotate(-Math.PI / 5, [0, 0, 1]);
    this.BR.rotate((-116.57 * Math.PI) / 180, [1, 0, 0]);
    this.BR.translate([0, 0, megaminxRadius]);

    this.bl.rotate((3 * Math.PI) / 5, [0, 0, 1]);
    this.bl.rotate((-116.57 * Math.PI) / 180, [1, 0, 0]);
    this.bl.translate([0, 0, megaminxRadius]);

    this.d.rotate((5 * Math.PI) / 5, [0, 0, 1]);
    this.d.rotate((-116.57 * Math.PI) / 180, [1, 0, 0]);
    this.d.translate([0, 0, megaminxRadius]);

    this.br.rotate((7 * Math.PI) / 5, [0, 0, 1]);
    this.br.rotate((-116.57 * Math.PI) / 180, [1, 0, 0]);
    this.br.translate([0, 0, megaminxRadius]);

    this.stickers = [
      this.U,
      this.F,
      this.R,
      this.dr,
      this.dl,
      this.L,
      this.d,
      this.br,
      this.BR,
      this.BL,
      this.bl,
      this.b,
    ];

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

    this.group = new Group(this.stickers);
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
