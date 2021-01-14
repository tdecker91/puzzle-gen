import { Face } from './../geometry/face';
import { IColor } from './../geometry/color';
import { WHITE, RED, GREEN, PURPLE, YELLOW, BLUE, GREY, DARK_BLUE, LIGHT_YELLOW, PINK, LIGHT_GREEN, ORANGE } from './colors';
import { Group } from './../geometry/group';
import { Object3D } from './../geometry/object3d';
import { DividedPentagon } from './../geometry/dividedPentagon';
import { pentagonInRadius } from '../math/utils';
import { chunkArray } from '../utils/arrays';

const DEG_36_RADIANS = 36 * Math.PI / 180;
const DEG_72_RADIANS = 72 * Math.PI / 180;

/**
 * for a megaminx with side length 1,
 * layer widths that look good.
 */
const OPTIMAL_LAYER_WIDTH = {
  2: .3,
  3: .17,
  4: .121
}

function getLayerWidth(length: number, layers: number): number {
  return OPTIMAL_LAYER_WIDTH[layers] || (length / (layers * 1.9));
}

export class MegaminxNet {
  faces: Object3D[];
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
    const sideLength = .75;
    const layerWidth = getLayerWidth(length, layers);

    // Top
    this.U = new DividedPentagon(WHITE, layers, sideLength, layerWidth);
    this.F = new DividedPentagon(RED, layers, sideLength, layerWidth);
    this.L = new DividedPentagon(GREEN, layers, sideLength, layerWidth);
    this.BL = new DividedPentagon(PURPLE, layers, sideLength, layerWidth);
    this.BR = new DividedPentagon(YELLOW, layers, sideLength, layerWidth);
    this.R = new DividedPentagon(BLUE, layers, sideLength, layerWidth);
    
    // Bottom
    this.d = new DividedPentagon(GREY, layers, sideLength, layerWidth);
    this.bl = new DividedPentagon(DARK_BLUE, layers, sideLength, layerWidth);
    this.dl = new DividedPentagon(LIGHT_YELLOW, layers, sideLength, layerWidth);
    this.dr = new DividedPentagon(PINK, layers, sideLength, layerWidth);
    this.br = new DividedPentagon(LIGHT_GREEN, layers, sideLength, layerWidth);
    this.b = new DividedPentagon(ORANGE, layers, sideLength, layerWidth);

    const ind = 2 * pentagonInRadius(sideLength);

    this.F.translate([0,ind,0]);
    this.F.rotate(5 * DEG_36_RADIANS, [0,0,1]);

    this.L.rotate(-DEG_72_RADIANS, [0,0,1]);
    this.L.translate([0,ind,0]);
    this.L.rotate(3 * DEG_36_RADIANS, [0,0,1]);

    this.BL.rotate(-2 * DEG_72_RADIANS, [0,0,1]);
    this.BL.translate([0,ind,0]);
    this.BL.rotate(-DEG_36_RADIANS, [0,0,1]);

    this.BR.rotate(2 * DEG_72_RADIANS, [0,0,1]);
    this.BR.translate([0,ind,0]);
    this.BR.rotate(DEG_36_RADIANS, [0,0,1]);

    this.R.rotate(DEG_72_RADIANS, [0,0,1]);
    this.R.translate([0,ind,0]);
    this.R.rotate(-3 * DEG_36_RADIANS, [0,0,1]);

    // Bottom
    this.d.rotate(Math.PI, [0,0,1]);

    this.bl.rotate(3 * DEG_36_RADIANS, [0,0,1]);
    this.bl.translate([0,ind,0]);
    this.bl.rotate(3 * DEG_36_RADIANS, [0,0,1]);

    this.dl.rotate(DEG_36_RADIANS, [0,0,1]);
    this.dl.translate([0,ind,0]);
    this.dl.rotate(-DEG_36_RADIANS, [0,0,1]);

    this.dr.rotate(-DEG_36_RADIANS, [0,0,1]);
    this.dr.translate([0,ind,0]);
    this.dr.rotate(DEG_36_RADIANS, [0,0,1]);

    this.br.rotate(-3 * DEG_36_RADIANS, [0,0,1]);
    this.br.translate([0,ind,0]);
    this.br.rotate(-3 * DEG_36_RADIANS, [0,0,1]);

    this.b.rotate(5 * DEG_36_RADIANS, [0,0,1]);
    this.b.translate([0,ind,0]);
    this.b.rotate(5 * DEG_36_RADIANS, [0,0,1]);

    const top = new Group([this.U, this.F, this.L, this.BL, this.BR, this.R])
    const bottom = new Group([this.d, this.bl, this.dr, this.dl, this.br, this.b])

    bottom.rotate(-DEG_72_RADIANS, [0,0,1])
    bottom.translate([0,2*ind,0]);
    bottom.rotate(2 * DEG_72_RADIANS, [0,0,1])
    bottom.translate([0,-ind,0]);
    
    this.group = new Group([top, bottom]);
    this.group.scale([.33,.33,.33]);
    this.group.translate([-1.75*sideLength,0,0]);
  }

  setColors(colors: IColor[]) {
    const n = this.layers;
    const numStickers =  (5 * n * n - (5 * n) + 1);
    let [U,R,F,dr,dl,L, d, br, BR, BL, bl, b] = chunkArray<IColor>(colors, numStickers);

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
      }
    });
  }
}