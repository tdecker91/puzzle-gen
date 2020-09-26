import { YELLOW, RED, BLUE, WHITE, ORANGE, GREEN } from './../colors';
import { Group } from './../../geometry/group';
import { Object3D } from './../../geometry/object3d';
import { makeGrid } from '../../geometry/grid';

export class RubiksCubeNet {
  stickers: Object3D[];
  group: Group; 

  constructor(size: number) {
    const cubeWidth = 1;

    const U = makeGrid(cubeWidth, size, YELLOW);
    const R = makeGrid(cubeWidth, size, RED);
    const F = makeGrid(cubeWidth, size, BLUE);
    const D = makeGrid(cubeWidth, size, WHITE);
    const L = makeGrid(cubeWidth, size, ORANGE);
    const B = makeGrid(cubeWidth, size, GREEN);

    const uGroup = new Group(U);
    uGroup.translate([0, cubeWidth, 0]);

    const rGroup = new Group(R);
    rGroup.translate([cubeWidth,0,0]);
    
    const fGroup = new Group(F);

    const dGroup = new Group(D);
    dGroup.translate([0, -cubeWidth, 0]);
    
    const lGroup = new Group(L);
    lGroup.translate([-cubeWidth, 0, 0]);
    
    const bGroup = new Group(B);
    bGroup.translate([2*cubeWidth, 0, 0]);

    this.stickers = [uGroup, rGroup, fGroup, dGroup, lGroup, bGroup];

    this.group = new Group(this.stickers);
    this.group.translate([-cubeWidth/4,0,0]);
    this.group.scale([.5,.5,.5])
  }
}