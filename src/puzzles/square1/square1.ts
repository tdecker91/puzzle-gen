import { ROTATION_VECTOR } from './constants';
import { PIECE_TYPE } from './enum';
import { Sqaure1Piece } from './interface';
import { ATAN_15_DEG, DEG_60_RADIANS, DEG_30_RADIANS } from './../../math/constants';
import { Geometry } from './../../geometry/geometry';
import { IFace, Face } from './../../geometry/face';
import { vec3 } from 'gl-matrix';
import { IColor } from './../../geometry/color';
import { Group } from '../../geometry/group';
import { Object3D } from '../../geometry/object3d';
import { degreesToRadians } from '../../math/utils';

const topColor: IColor = { value: '#FF0' };
const bottomColor: IColor = { value: '#FFF' };
const frontColor: IColor = { value: '#F00' };
const leftColor: IColor = { value: '#0F0' };
const rightColor: IColor = { value: '#00F' };
const backColor: IColor = { value: '#FFA500' };

export class Square1 {
  pieces: Object3D[];
  group: Group;

  constructor(sideLength: number) {
    this.pieces = solvedSquare1(sideLength);
    this.group = new Group(this.pieces);
  }
}

function square1Corner(sideLength: number, top: IColor, side1: IColor, side2: IColor): Geometry {

  const halfSide = sideLength / 2;
  const halfEdgePiece = halfSide * Math.atan(degreesToRadians(15));
  const layerWidth = halfSide - halfEdgePiece;

  const points: vec3[] = [
    // Top
    [0, 0, halfSide],
    [halfSide, halfEdgePiece, halfSide],
    [halfSide, halfSide, halfSide],
    [halfEdgePiece, halfSide, halfSide],

    // Bottom
    [0, 0, halfSide - layerWidth],
    [halfSide, halfEdgePiece, halfSide - layerWidth],
    [halfSide, halfSide, halfSide - layerWidth],
    [halfEdgePiece, halfSide, halfSide - layerWidth],
  ];

  const faces: IFace[] = [
    new Face([0, 1, 2, 3], points, top),
    new Face([4, 5, 6, 7], points, { value: '#333' }),
    new Face([0, 1, 5, 4], points, { value: '#333' }),
    new Face([2, 3, 7, 6], points, side1),
    new Face([1, 2, 6, 5], points, side2),
    new Face([0, 3, 7, 4], points, { value: '#333' }),
  ]

  return new Geometry(points, faces);
}

function square1Edge(sideLength: number, top: IColor, side: IColor): Geometry {
  const halfSide = sideLength / 2;
  const halfEdgePiece = halfSide * ATAN_15_DEG;
  const layerWidth = halfSide - halfEdgePiece;

  const points: vec3[] = [
    // Top
    vec3.rotateZ(vec3.create(),[0, 0, halfSide], [0,0,0], DEG_30_RADIANS),
    vec3.rotateZ(vec3.create(),[halfEdgePiece, halfSide, halfSide], [0,0,0], DEG_30_RADIANS),
    vec3.rotateZ(vec3.create(),[-halfEdgePiece, halfSide, halfSide], [0,0,0], DEG_30_RADIANS),

    // Bottom
    vec3.rotateZ(vec3.create(),[0, 0, halfSide - layerWidth], [0,0,0], DEG_30_RADIANS),
    vec3.rotateZ(vec3.create(),[halfEdgePiece, halfSide, halfSide - layerWidth], [0,0,0], DEG_30_RADIANS),
    vec3.rotateZ(vec3.create(),[-halfEdgePiece, halfSide, halfSide - layerWidth], [0,0,0], DEG_30_RADIANS),
  ];

  const faces: IFace[] = [
    new Face([0, 1, 2], points, top),
    new Face([3, 4, 5], points, { value: '#333' }),
    new Face([1, 2, 5, 4], points, side),
    new Face([0, 1, 4, 3], points, { value: '#333' }),
    new Face([0, 2, 5, 3], points, { value: '#333' }),
  ];

  return new Geometry(points, faces);
}

function sqaure1Middle(sideLength: number, front: IColor, side: IColor, back: IColor): Geometry {
  const halfSide = sideLength / 2;
  const halfEdgePiece = halfSide * ATAN_15_DEG;
  const layerWidth = halfSide - halfEdgePiece;
  const middleWidth = sideLength - (2 * layerWidth);
  const halfMiddleWidth = middleWidth / 2;

  const vertices: vec3[] = [
    [-halfSide, -halfSide, halfMiddleWidth],
    [-halfSide, halfSide, halfMiddleWidth],
    [halfEdgePiece, halfSide, halfMiddleWidth],
    [-halfEdgePiece, -halfSide, halfMiddleWidth],

    [-halfSide, -halfSide, -halfMiddleWidth],
    [-halfSide, halfSide, -halfMiddleWidth],
    [halfEdgePiece, halfSide, -halfMiddleWidth],
    [-halfEdgePiece, -halfSide, -halfMiddleWidth],
  ];

  const faces: IFace[] = [
    new Face([0, 1, 2, 3], vertices, { value: '#333' }),
    new Face([4, 5, 6, 7], vertices, { value: '#333' }),
    new Face([0, 1, 5, 4], vertices, side),
    new Face([1, 2, 6, 5], vertices, back),
    new Face([2, 3, 7, 6], vertices, { value: '#333' }),
    new Face([0, 3, 7, 4], vertices, front),
  ];

  return new Geometry(vertices, faces);
}

function makeLayer(sideLength: number, pieces: Sqaure1Piece[]): Geometry[] {
  let geometry: Geometry[] = [];
  let angle = Math.PI;

  pieces.forEach((piece, index) => {
    switch (piece.type) {
      case PIECE_TYPE.CORNER:
        const corner = square1Corner(
          sideLength,
          piece.colors[0],
          piece.colors[1],
          piece.colors[2]);
        corner.rotate(angle, [0, 0, 1]);
        geometry.push(corner);
        angle -= DEG_60_RADIANS;
        break;
      case PIECE_TYPE.EDGE:
        const edge = square1Edge(
          sideLength,
          piece.colors[0],
          piece.colors[1]);
        edge.rotate(angle - DEG_60_RADIANS, [0, 0, 1]);
        geometry.push(edge);
        angle -= DEG_30_RADIANS;
        break;
    }
  });

  return geometry;
}

function solvedSquare1(sideLength): Geometry[] {
  let pieces = [];
  const topLayer = makeLayer(sideLength,
    [
      { type: PIECE_TYPE.CORNER, colors: [topColor, frontColor, leftColor] },
      { type: PIECE_TYPE.EDGE, colors: [topColor, leftColor] },
      { type: PIECE_TYPE.CORNER, colors: [topColor, leftColor, backColor] },
      { type: PIECE_TYPE.EDGE, colors: [topColor, backColor] },
      { type: PIECE_TYPE.CORNER, colors: [topColor, backColor, rightColor] },
      { type: PIECE_TYPE.EDGE, colors: [topColor, rightColor] },
      { type: PIECE_TYPE.CORNER, colors: [topColor, rightColor, frontColor] },
      { type: PIECE_TYPE.EDGE, colors: [topColor, frontColor] },
    ]);

  const bottomLayer = new Group(makeLayer(sideLength,
    [
      { type: PIECE_TYPE.EDGE, colors: [bottomColor, backColor] },
      { type: PIECE_TYPE.CORNER, colors: [bottomColor, backColor, leftColor] },
      { type: PIECE_TYPE.EDGE, colors: [bottomColor, leftColor] },
      { type: PIECE_TYPE.CORNER, colors: [bottomColor, leftColor, frontColor] },
      { type: PIECE_TYPE.EDGE, colors: [bottomColor, frontColor] },
      { type: PIECE_TYPE.CORNER, colors: [bottomColor, frontColor, rightColor] },
      { type: PIECE_TYPE.EDGE, colors: [bottomColor, rightColor] },
      { type: PIECE_TYPE.CORNER, colors: [bottomColor, rightColor, backColor] },
    ]));

  bottomLayer.rotate(Math.PI, [1, 0, 0]);
  bottomLayer.rotate(DEG_30_RADIANS, [0, 0, 1]);

  pieces = [...topLayer, bottomLayer];

  const m1 = sqaure1Middle(sideLength, frontColor, leftColor, backColor);
  const m2 = sqaure1Middle(sideLength, backColor, rightColor, frontColor);
  m2.rotate(Math.PI, [0, 0, 1]);

  pieces.push(m1);
  pieces.push(m2);

  return pieces;
}

