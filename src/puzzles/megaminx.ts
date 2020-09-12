import { Plane } from './../geometry/plane';
import { Group } from './../geometry/group';
import { Object3D } from './../geometry/object3d';
import { DividedPentagon } from '../geometry/dividedPentagon';
import { dodecahedronInRadius, pentagonInRadius } from '../math/utils';

export class Megaminx {
  stickers: Object3D[];
  group: Group;

  constructor() {
    const length = 1;
    const megaminxRadius = dodecahedronInRadius(length);
    const inr = pentagonInRadius(length);
    console.log('mega radius', megaminxRadius)

    const U = new DividedPentagon({value: '#FF0000'}, 2, length);
    const D = new DividedPentagon({value: '#00FF00'}, 2, length);
    const B = new DividedPentagon({value: '#0000FF'}, 2, length);

    const A = new DividedPentagon({value: '#FFFFFF'}, 2, length);
    const C = new DividedPentagon({value: '#FF00FF'}, 2, length);
    const E = new DividedPentagon({value: '#FFFF00'}, 2, length);
    const F = new DividedPentagon({value: '#00FFFF'}, 2, length);
    const G = new DividedPentagon({value: '#FFA000'}, 2, length);
    const H = new DividedPentagon({value: '#FF00A0'}, 2, length);
    const I = new DividedPentagon({value: '#A8A8A8'}, 2, length);
    const J = new DividedPentagon({value: '#005FF0'}, 2, length);
    const K = new DividedPentagon({value: '#FF7881'}, 2, length);

    U.translate([0,0,megaminxRadius])
    D.rotate(Math.PI, [0,0,1])
    D.translate([0,0,-megaminxRadius])
    // F.translate([0,0,megaminxRadius])
    B.rotate(Math.PI,[0,0,1])
    B.rotate((180 - 116.57) * Math.PI/180, [1,0,0])
    B.translate([0,0,megaminxRadius])

    A.rotate(72 * Math.PI/180, [0,0,1])
    A.rotate(Math.PI, [0,0,1])
    A.rotate((180 - 116.57) * Math.PI/180, [1,0,0])
    A.translate([0,0,megaminxRadius]);

    C.rotate(72 * Math.PI/180, [0,0,1])
    C.rotate(Math.PI/5, [0,0,1])
    C.rotate((180 - 116.57) * Math.PI/180, [1,0,0])
    C.translate([0,0,megaminxRadius]);

    E.rotate(72 * Math.PI/180, [0,0,1])
    E.rotate(-Math.PI/5, [0,0,1])
    E.rotate((180 - 116.57) * Math.PI/180, [1,0,0])
    E.translate([0,0,megaminxRadius]);

    F.rotate(72 * Math.PI/180, [0,0,1])
    F.rotate(-3 * Math.PI/5, [0,0,1])
    F.rotate((180 - 116.57) * Math.PI/180, [1,0,0])
    F.translate([0,0,megaminxRadius]);

    // G.rotate(Math.PI, [0,0,1])
    G.rotate(Math.PI/5, [0,0,1])
    G.rotate(-116.57 * Math.PI/180, [1,0,0])
    G.translate([0,0,megaminxRadius]);

    H.rotate(-Math.PI/5, [0,0,1])
    H.rotate(-116.57 * Math.PI/180, [1,0,0])
    H.translate([0,0,megaminxRadius]);

    I.rotate(3 * Math.PI/5, [0,0,1])
    I.rotate(-116.57 * Math.PI/180, [1,0,0])
    I.translate([0,0,megaminxRadius]);

    J.rotate(5 * Math.PI/5, [0,0,1])
    J.rotate(-116.57 * Math.PI/180, [1,0,0])
    J.translate([0,0,megaminxRadius]);

    K.rotate(7 * Math.PI/5, [0,0,1])
    K.rotate(-116.57 * Math.PI/180, [1,0,0])
    K.translate([0,0,megaminxRadius]);

    this.stickers = [
      D, G, H, I, J, K, U, B, A, C, E, F
    ];
    this.group = new Group(this.stickers);
  }

}