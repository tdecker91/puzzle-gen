import { IColor } from './../geometry/color';
import { Geometry } from './../geometry/geometry';
import { IFace, Face } from './../geometry/face';
import { vec3 } from 'gl-matrix';
import { degreesToRadians } from '../math/utils';
import { Group } from './../geometry/group';
import { Object3D } from './../geometry/object3d';

export class Square1 {
  pieces: Object3D[];
  group: Group;

  constructor(sideLength: number) {

    const topColor: IColor = { value: '#FF0' };
    const bottomColor: IColor = { value: '#FFF' };
    const frontColor: IColor = { value: '#F00' };
    const leftColor: IColor = { value: '#0F0' };
    const rightColor: IColor = { value: '#00F' };
    const backColor: IColor = { value: '#FFA500' };

    const colors = [rightColor, backColor, leftColor, frontColor]

    this.pieces = [];

    // Top
    for (let i = 0; i < 4; i++) {
      const corner = square1Corner(sideLength, topColor, colors[i], colors[(i+1)%4]);
      const edge = square1Edge(sideLength, topColor, colors[(i+1)%4]);

      corner.rotate(i * Math.PI/2, [0,0,1])
      edge.rotate(i * Math.PI/2, [0,0,1])

      this.pieces.push(corner);
      this.pieces.push(edge);
    }

    this.group = new Group(this.pieces);
  }

}

function square1Corner(sideLength: number, top: IColor, side1: IColor, side2: IColor): Geometry {
  
  const halfSide = sideLength/2;
  const halfEdgePiece = halfSide * Math.atan(degreesToRadians(15));
  const layerWidth = halfSide - halfEdgePiece;

  const points: vec3[] = [
    // Top
    [0,0,0],
    [halfSide, halfEdgePiece, 0],
    [halfSide, halfSide, 0],
    [halfEdgePiece, halfSide, 0],

    // Bottom
    [0,0,-layerWidth],
    [halfSide, halfEdgePiece, -layerWidth],
    [halfSide, halfSide, -layerWidth],
    [halfEdgePiece, halfSide, -layerWidth],
  ];

  const faces: IFace[] = [
    new Face([0, 1, 2, 3], points, top),
    new Face([4, 5, 6, 7], points, { value: '#111'}),
    new Face([0, 1, 5, 4], points, { value: '#111'}),
    new Face([1, 2, 6, 5], points, side1),
    new Face([2, 3, 7, 6], points, side2),
    new Face([0, 3, 7, 4], points, { value: '#111'}),
  ]

  return new Geometry(points, faces);
}

function square1Edge(sideLength: number, top: IColor, side: IColor): Geometry {
  const halfSide = sideLength/2;
  const halfEdgePiece = halfSide * Math.atan(degreesToRadians(15));
  const layerWidth = halfSide - halfEdgePiece;

  const points: vec3[] = [
    // Top
    [0,0,0],
    [halfEdgePiece, halfSide, 0],
    [-halfEdgePiece, halfSide, 0],

    // Bottom
    [0,0,-layerWidth],
    [halfEdgePiece, halfSide, -layerWidth],
    [-halfEdgePiece, halfSide, -layerWidth],
  ];

  const faces: IFace[] = [
    new Face([0, 1, 2], points, top),
    new Face([3, 4, 5], points, { value: '#111'}),
    new Face([1, 2, 5, 4], points, side),
    new Face([0, 1, 4, 3], points, { value: '#111'}),
    new Face([0, 2, 5, 3], points, { value: '#111'}),
  ];

  return new Geometry(points, faces);
}