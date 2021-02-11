import { Face } from "./../geometry/face";
import {
  DEG_30_RADIANS,
  DEG_36_RADIANS,
  DEG_72_RADIANS,
} from "./../math/constants";
import { IColor } from "./../geometry/color";
import { WHITE, RED, BLUE, GREEN, BLACK, YELLOW, PURPLE } from "./colors";
import { DividedPentagon } from "./../geometry/dividedPentagon";
import { degreesToRadians, dodecahedronInRadius } from "../math/utils";
import { Group } from "../geometry/group";

const OPTIMAL_LAYER_WIDTH = {
  2: 0.3,
  3: 0.17,
  4: 0.121,
};

function getLayerWidth(length: number, layers: number): number {
  return OPTIMAL_LAYER_WIDTH[layers] || length / (layers * 1.9);
}

export class MegaminxTop {
  group: Group;
  faces: { [face: string]: DividedPentagon };

  private U: DividedPentagon;
  private R: DividedPentagon;
  private F: DividedPentagon;
  private BR: DividedPentagon;
  private BL: DividedPentagon;
  private L: DividedPentagon;

  constructor() {
    this.createFaces();
    this.removeHiddenStickers();
  }

  private createFaces() {
    const layers = 2;
    const length = 0.75;
    const layerWidth = getLayerWidth(length, layers);
    const megaminxRadius = dodecahedronInRadius(length);

    this.U = new DividedPentagon(WHITE, layers, length, layerWidth);
    this.F = new DividedPentagon(RED, layers, length, layerWidth);
    this.R = new DividedPentagon(BLUE, layers, length, layerWidth);
    this.L = new DividedPentagon(GREEN, layers, length, layerWidth);
    this.BR = new DividedPentagon(YELLOW, layers, length, layerWidth);
    this.BL = new DividedPentagon(PURPLE, layers, length, layerWidth);

    this.F.translate([0, 0, megaminxRadius]);

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

    this.BL.rotate(Math.PI / 5, [0, 0, 1]);
    this.BL.rotate((-116.57 * Math.PI) / 180, [1, 0, 0]);
    this.BL.translate([0, 0, megaminxRadius]);

    this.BR.rotate(-Math.PI / 5, [0, 0, 1]);
    this.BR.rotate((-116.57 * Math.PI) / 180, [1, 0, 0]);
    this.BR.translate([0, 0, megaminxRadius]);

    this.faces = {
      U: this.U,
      F: this.F,
      R: this.R,
      dr: this.BR,
      dl: this.BL,
      L: this.L,
    };

    this.group = new Group([this.U, this.F, this.R, this.BR, this.BL, this.L]);
    this.group.rotate(degreesToRadians(63), [1, 0, 0]);
  }

  setColors(colors: { [face: string]: IColor[] }) {
    let { U, R, F, L, BR, BL } = colors;
    this.createFaces();

    // If length is larger than we expect for
    // a side of the puzzle, assume we're receiving
    // colors for the entire face of the puzzle. and
    // just take out the the colors for visible stickers
    // if (R.length > 3) {
    //   R = R.slice(2, 5);
    //   F = F.slice(2, 5);
    //   L = L.slice(2, 5);
    //   BR = BR.slice(2, 5);
    //   BL = BL.slice(2, 5);
    // }

    // this.U.faces[1].color = BLACK;
    // this.R.faces[1].color = BLACK;
    // this.F.faces[1].color = BLACK;
    // this.L.faces[1].color = BLACK;
    // this.BR.faces[1].color = BLACK;
    // this.BL.faces[1].color = BLACK;

    this.setFaceColors(this.U, U);
    this.setFaceColors(this.R, R);
    this.setFaceColors(this.F, F);
    this.setFaceColors(this.L, L);
    this.setFaceColors(this.BR, BR);
    this.setFaceColors(this.BL, BL);

    this.removeHiddenStickers();
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

  /**
   * hide stickers that aren't in the top layer
   * so only the top of the megaminx is shown
   */
  private removeHiddenStickers() {
    this.F.faces = this.F.faces.slice(2, 5);
    this.BL.faces = this.BL.faces.slice(8, 11);
    this.L.faces = this.L.faces.slice(4, 7);
    this.R.faces = [this.R.faces[1], this.R.faces[2], this.R.faces[10]];
    this.BR.faces = this.BR.faces.slice(6, 9);
  }
}
