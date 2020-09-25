import { Group } from './../geometry/group';
import { Object3D } from './../geometry/object3d';
import { DividedPentagon } from './../geometry/dividedPentagon';
import { pentagonInRadius } from '../math/utils';
import { mat3, mat4 } from 'gl-matrix';

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

  constructor(layers: number) {
    const sideLength = .75;
    const layerWidth = getLayerWidth(length, layers);
    // Top
    const U = new DividedPentagon({value: 'white'}, layers, sideLength, layerWidth);
    const B = new DividedPentagon({value: 'red'}, layers, sideLength, layerWidth);
    const C = new DividedPentagon({value: 'green'}, layers, sideLength, layerWidth);
    const E = new DividedPentagon({value: 'purple'}, layers, sideLength, layerWidth);
    const F = new DividedPentagon({value: 'yellow'}, layers, sideLength, layerWidth);
    const A = new DividedPentagon({value: '#0000FF'}, layers, sideLength, layerWidth);
    
    // Bottom
    const D = new DividedPentagon({value: 'grey'}, layers, sideLength, layerWidth);
    const K = new DividedPentagon({value: 'darkblue'}, layers, sideLength, layerWidth);
    const H = new DividedPentagon({value: '#FDFD96'}, layers, sideLength, layerWidth);
    const G = new DividedPentagon({value: 'hotpink'}, layers, sideLength, layerWidth);
    const I = new DividedPentagon({value: 'limegreen'}, layers, sideLength, layerWidth);
    const J = new DividedPentagon({value: 'orange'}, layers, sideLength, layerWidth);

    const ind = 2 * pentagonInRadius(sideLength);

    B.translate([0,ind,0]);
    B.rotate(DEG_36_RADIANS, [0,0,1]);

    C.rotate(-DEG_72_RADIANS, [0,0,1]);
    C.translate([0,ind,0]);
    C.rotate(DEG_36_RADIANS, [0,0,1]);

    E.rotate(-2 * DEG_72_RADIANS, [0,0,1]);
    E.translate([0,ind,0]);
    E.rotate(DEG_36_RADIANS, [0,0,1]);

    F.rotate(2 * DEG_72_RADIANS, [0,0,1]);
    F.translate([0,ind,0]);
    F.rotate(DEG_36_RADIANS, [0,0,1]);

    A.rotate(DEG_72_RADIANS, [0,0,1]);
    A.translate([0,ind,0]);
    A.rotate(DEG_36_RADIANS, [0,0,1]);

    // Bottom
    D.rotate(Math.PI, [0,0,1]);

    K.rotate(3 * DEG_36_RADIANS, [0,0,1]);
    K.translate([0,ind,0]);
    K.rotate(DEG_36_RADIANS, [0,0,1]);

    H.rotate(DEG_36_RADIANS, [0,0,1]);
    H.translate([0,ind,0]);
    H.rotate(DEG_36_RADIANS, [0,0,1]);

    G.rotate(-DEG_36_RADIANS, [0,0,1]);
    G.translate([0,ind,0]);
    G.rotate(DEG_36_RADIANS, [0,0,1]);

    I.rotate(-3 * DEG_36_RADIANS, [0,0,1]);
    I.translate([0,ind,0]);
    I.rotate(DEG_36_RADIANS, [0,0,1]);

    J.rotate(5 * DEG_36_RADIANS, [0,0,1]);
    J.translate([0,ind,0]);
    J.rotate(DEG_36_RADIANS, [0,0,1]);

    const top = new Group([U, B, C, E, F, A])
    const bottom = new Group([D, K, G, H, I, J])

    bottom.rotate(-DEG_72_RADIANS, [0,0,1])
    bottom.translate([0,2*ind,0]);
    bottom.rotate(2 * DEG_72_RADIANS, [0,0,1])
    bottom.translate([0,-ind,0]);
    
    this.group = new Group([top, bottom]);
    this.group.scale([.33,.33,.33]);
    this.group.translate([-1.75*sideLength,0,0]);
  }
}