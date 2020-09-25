import { Plane } from './../geometry/plane';
import { Group } from './../geometry/group';
import { Object3D } from './../geometry/object3d';
import { DividedPentagon } from '../geometry/dividedPentagon';
import { dodecahedronInRadius, pentagonInRadius } from '../math/utils';

const OPTIMAL_LAYER_WIDTH = {
  2: .3,
  3: .17,
  4: .121
}

function getLayerWidth(length: number, layers: number): number {
  return OPTIMAL_LAYER_WIDTH[layers] || (length / (layers * 1.9));
}

export class Megaminx {
  stickers: Object3D[];
  group: Group;

  constructor(layers: number = 2) {
    const length = .75;
    const megaminxRadius = dodecahedronInRadius(length);
    const layerWidth = getLayerWidth(length, layers);

    // Top
    const U = new DividedPentagon({value: 'white'}, layers, length, layerWidth);
    const B = new DividedPentagon({value: 'red'}, layers, length, layerWidth);
    const C = new DividedPentagon({value: 'green'}, layers, length, layerWidth);
    const E = new DividedPentagon({value: 'purple'}, layers, length, layerWidth);
    const F = new DividedPentagon({value: 'yellow'}, layers, length, layerWidth);
    const A = new DividedPentagon({value: '#0000FF'}, layers, length, layerWidth);
    
    // Bottom
    const D = new DividedPentagon({value: 'grey'}, layers, length, layerWidth);
    const K = new DividedPentagon({value: 'darkblue'}, layers, length, layerWidth);
    const H = new DividedPentagon({value: 'lightyellow'}, layers, length, layerWidth);
    const G = new DividedPentagon({value: 'hotpink'}, layers, length, layerWidth);
    const I = new DividedPentagon({value: 'limegreen'}, layers, length, layerWidth);
    const J = new DividedPentagon({value: 'orange'}, layers, length, layerWidth);

    U.translate([0,0,megaminxRadius])
    D.rotate(Math.PI, [0,0,1])
    D.translate([0,0,-megaminxRadius])

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