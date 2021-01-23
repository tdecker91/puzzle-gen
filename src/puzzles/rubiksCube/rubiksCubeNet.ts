import { Geometry } from './../../geometry/geometry';
import { IColor } from './../../geometry/color';
import { YELLOW, RED, BLUE, WHITE, ORANGE, GREEN } from './../colors';
import { Group } from './../../geometry/group';
import { Object3D } from './../../geometry/object3d';
import { makeGrid } from '../../geometry/grid';
import { chunkArray } from '../../utils/arrays';

export class RubiksCubeNet {
  stickers: Object3D[];
  group: Group; 

  private size: number;

  private U: Group;
  private R: Group;
  private F: Group;
  private D: Group;
  private L: Group;
  private B: Group;

  constructor(size: number) {
    const cubeWidth = 1;
    this.size = size;

    const U = makeGrid(cubeWidth, size, YELLOW);
    const R = makeGrid(cubeWidth, size, RED);
    const F = makeGrid(cubeWidth, size, BLUE);
    const D = makeGrid(cubeWidth, size, WHITE);
    const L = makeGrid(cubeWidth, size, ORANGE);
    const B = makeGrid(cubeWidth, size, GREEN);

    this.U = new Group(U);
    this.U.translate([0, cubeWidth, 0]);

    this.R = new Group(R);
    this.R.translate([cubeWidth,0,0]);
    
    this.F = new Group(F);

    this.D = new Group(D);
    this.D.translate([0, -cubeWidth, 0]);
    
    this.L = new Group(L);
    this.L.translate([-cubeWidth, 0, 0]);
    
    this.B = new Group(B);
    this.B.translate([2*cubeWidth, 0, 0]);

    this.stickers = [this.U, this.R, this.F, this.D, this.L, this.B];

    this.group = new Group(this.stickers);
    this.group.translate([-cubeWidth/4,0,0]);
    this.group.scale([.5,.5,.5])
  }

  private setFaceColors(faceStickers: Group, colors: IColor[]) {
    faceStickers.objects.forEach((g: Geometry, i) => {
      if (colors && colors[i]) {
        g.faces[0].color = colors[i];
      }
    });
  }

  setColors(colors: IColor[]) {
    const numStickers = this.size*this.size;
    let [u,r,f,d,l,b] = chunkArray<IColor>(colors, numStickers);

    this.setFaceColors(this.U, u);
    this.setFaceColors(this.R, r);
    this.setFaceColors(this.F, f);
    this.setFaceColors(this.D, d);
    this.setFaceColors(this.L, l);
    this.setFaceColors(this.B, b);
  }
}