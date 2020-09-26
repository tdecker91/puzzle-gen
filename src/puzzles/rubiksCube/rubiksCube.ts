import { YELLOW, RED, BLUE, WHITE, ORANGE, GREEN } from './../colors';
import { Group } from "../../geometry/group";
import { Object3D } from "../../geometry/object3d";
import { makeGrid } from '../../geometry/grid';

export class RubiksCube {

  stickers: Object3D[];
  group: Group;

  constructor(size: number) {
    const width = 1/2;
    const cubeWidth = (width * size);
    const halfWidth = cubeWidth/2;

    const U = makeGrid(cubeWidth, size, YELLOW);
    const R = makeGrid(cubeWidth, size, RED);
    const F = makeGrid(cubeWidth, size, BLUE);
    const D = makeGrid(cubeWidth, size, WHITE);
    const L = makeGrid(cubeWidth, size, ORANGE);
    const B = makeGrid(cubeWidth, size, GREEN);

    const uGroup = new Group(U);
    uGroup.rotate(-Math.PI/2, [0,1,0]);
    uGroup.rotate(-Math.PI/2, [1,0,0]);
    uGroup.translate([0,0,halfWidth]);

    const rGroup = new Group(R);
    rGroup.translate([0,0,halfWidth]);

    const fGroup = new Group(F);
    fGroup.rotate(-Math.PI/2, [0,1,0]);
    fGroup.translate([0, 0, halfWidth]);

    const dGroup = new Group(D);
    dGroup.rotate(-Math.PI/2, [0,1,0]);
    dGroup.rotate(Math.PI/2, [1,0,0]);
    dGroup.translate([0,0,halfWidth]);
    
    const lGroup = new Group(L);
    lGroup.rotate(-Math.PI, [0,1,0]);
    lGroup.translate([0,0,halfWidth]);
    
    const bGroup = new Group(B);
    bGroup.rotate(Math.PI/2, [0,1,0]);
    bGroup.translate([0,0,halfWidth]);

    this.stickers = [uGroup, rGroup, fGroup, dGroup, lGroup, bGroup];

    this.group = new Group(this.stickers);

    this.group.translate([0,0,-1])
    this.group.rotate(0.593411946, [1,0,0]);
    this.group.rotate(0.785398, [0,1,0]);
  }
}