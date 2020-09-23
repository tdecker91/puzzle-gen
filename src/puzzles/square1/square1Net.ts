import { Sqaure1Piece } from './interface';
import { PIECE_TYPE } from './enum';
import { ATAN_15_DEG, DEG_60_RADIANS, DEG_30_RADIANS } from './../../math/constants';
import { IFace, Face } from './../../geometry/face';
import { vec3 } from 'gl-matrix';
import { degreesToRadians } from '../../math/utils';
import { IColor } from './../../geometry/color';
import { Geometry } from './../../geometry/geometry';
import { Group } from './../../geometry/group';
import { Object3D } from './../../geometry/object3d';

const topColor: IColor = { value: '#FF0' };
const bottomColor: IColor = { value: '#FFF' };
const frontColor: IColor = { value: '#F00' };
const leftColor: IColor = { value: '#0F0' };
const rightColor: IColor = { value: '#00F' };
const backColor: IColor = { value: '#FFA500' };

export class Square1Net {
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

  const layerWidth = sideLength * .2;
  const outerHalfSide = (sideLength + layerWidth) / 2;
  const outerHalfEdgePiece = outerHalfSide * Math.atan(degreesToRadians(15));

  const points: vec3[] = [
    // Top
    [0, 0, 0],
    [halfSide, halfEdgePiece, 0],
    [halfSide, halfSide, 0],
    [halfEdgePiece, halfSide, 0],

    // Sides
    [outerHalfSide, outerHalfEdgePiece, 0],
    [outerHalfSide, outerHalfSide, 0],
    [outerHalfEdgePiece, outerHalfSide, 0],
  ];

  const faces: IFace[] = [
    new Face([0, 1, 2, 3], points, top),
    new Face([2, 3, 6, 5], points, side1),
    new Face([1, 2, 5, 4], points, side2)
  ]

  return new Geometry(points, faces);
}

function square1Edge(sideLength: number, top: IColor, side: IColor): Geometry {
  const halfSide = sideLength / 2;
  const halfEdgePiece = halfSide * ATAN_15_DEG;

  const layerWidth = sideLength * .2;
  const outerHalfSide = (sideLength + layerWidth) / 2;
  const outerHalfEdgePiece = outerHalfSide * Math.atan(degreesToRadians(15));

  const points: vec3[] = [
    // Top
    vec3.rotateZ(vec3.create(),[0, 0, 0], [0,0,0], DEG_30_RADIANS),
    vec3.rotateZ(vec3.create(),[halfEdgePiece, halfSide, 0], [0,0,0], DEG_30_RADIANS),
    vec3.rotateZ(vec3.create(),[-halfEdgePiece, halfSide, 0], [0,0,0], DEG_30_RADIANS),

    // Side
    vec3.rotateZ(vec3.create(),[outerHalfEdgePiece, outerHalfSide, 0], [0,0,0], DEG_30_RADIANS),
    vec3.rotateZ(vec3.create(),[-outerHalfEdgePiece, outerHalfSide, 0], [0,0,0], DEG_30_RADIANS)
  ];

  const faces: IFace[] = [
    new Face([0, 1, 2], points, top),
    new Face([1, 2, 4, 3], points, side)
  ];

  return new Geometry(points, faces);
}

function makeLayer(sideLength: number, pieces: Sqaure1Piece[]): Geometry[] {
  let geometry: Geometry[] = [];
  let angle = Math.PI;

  pieces.forEach((piece) => {
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
  const halfSide = sideLength / 2;
  const halfEdgePiece = halfSide * ATAN_15_DEG;
  const layerHeight = halfSide - halfEdgePiece;

  const middleHeight = sideLength - (2 * layerHeight);
  const halfMiddleHeight = middleHeight / 2;

  const layerWidth = sideLength * .2;
  const outerHalfSide = (sideLength + layerWidth) / 2;

  let pieces = [];
  const topLayer = new Group(makeLayer(sideLength,
    [
      { type: PIECE_TYPE.CORNER, colors: [topColor, frontColor, leftColor] },
      { type: PIECE_TYPE.EDGE, colors: [topColor, leftColor] },
      { type: PIECE_TYPE.CORNER, colors: [topColor, leftColor, backColor] },
      { type: PIECE_TYPE.EDGE, colors: [topColor, backColor] },
      { type: PIECE_TYPE.CORNER, colors: [topColor, backColor, rightColor] },
      { type: PIECE_TYPE.EDGE, colors: [topColor, rightColor] },
      { type: PIECE_TYPE.CORNER, colors: [topColor, rightColor, frontColor] },
      { type: PIECE_TYPE.EDGE, colors: [topColor, frontColor] },
    ]));

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

  topLayer.translate([0, outerHalfSide + halfMiddleHeight, 0]);
  bottomLayer.translate([0, -(outerHalfSide + halfMiddleHeight), 0]);
  bottomLayer.rotate(DEG_30_RADIANS, [0,0,1])

  pieces = [topLayer, bottomLayer];

  const m = sqaure1Middle(sideLength, frontColor, rightColor, backColor, false);

  pieces.push(m);

  return pieces;
}

function sqaure1Middle(sideLength: number, front: IColor, side: IColor, back: IColor, rotated?: boolean): Geometry {
  const halfSide = sideLength / 2;
  const halfEdgePiece = halfSide * ATAN_15_DEG;
  const layerHeight = halfSide - halfEdgePiece;

  const middleHeight = sideLength - (2 * layerHeight);
  const halfMiddleHeight = middleHeight / 2;

  const layerWidth = sideLength * .2;
  const outerHalfSide = (sideLength + layerWidth) / 2;
  const outerHalfEdgePiece = outerHalfSide * Math.atan(degreesToRadians(15));

  const cornerLength = outerHalfSide - outerHalfEdgePiece;

  const vertices: vec3[] = [
    [-outerHalfSide, halfMiddleHeight, -.01],
    [-outerHalfEdgePiece, halfMiddleHeight, -.01],
    [outerHalfSide, halfMiddleHeight, -.01],

    [-outerHalfSide, -halfMiddleHeight, -.01],
    [-outerHalfEdgePiece, -halfMiddleHeight, -.01],
    [outerHalfSide, -halfMiddleHeight, -.01],

    // Points for when middle is rotated
    [2 * outerHalfEdgePiece, halfMiddleHeight, -.01],
    [2 * outerHalfEdgePiece, -halfMiddleHeight, -.01],
    [2 * cornerLength, halfMiddleHeight, -.01],
    [2 * cornerLength, -halfMiddleHeight, -.01],
  ];

  // Left
  const faces: IFace[] = [
    new Face([0, 1, 4, 3], vertices, front),
  ];

  // Right
  if (!rotated) {
    faces.push(new Face([1, 2, 5, 4], vertices, front));
  } else {
    faces.push(new Face([1, 6, 7, 4], vertices, back));
    faces.push(new Face([6, 8, 9, 7], vertices, side));
  }

  return new Geometry(vertices, faces);
}