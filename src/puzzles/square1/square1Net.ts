import { Sqaure1Piece, Square1Builder } from './interface';
import { DEG_30_RADIANS } from './../../math/constants';
import { IFace, Face } from './../../geometry/face';
import { vec3 } from 'gl-matrix';
import { IColor } from './../../geometry/color';
import { Geometry } from './../../geometry/geometry';
import { Group } from './../../geometry/group';
import { Object3D } from './../../geometry/object3d';
import { FRONT_COLOR, RIGHT_COLOR, BACK_COLOR } from './constants';

export class Square1Net extends Square1Builder {
  square1Corner(top: IColor, side1: IColor, side2: IColor): Geometry {
    const points: vec3[] = [
      // Top
      [0, 0, 0],
      [this.halfSide, this.halfEdgePiece, 0],
      [this.halfSide, this.halfSide, 0],
      [this.halfEdgePiece, this.halfSide, 0],

      // Sides
      [this.outerHalfSide, this.outerHalfEdgePiece, 0],
      [this.outerHalfSide, this.outerHalfSide, 0],
      [this.outerHalfEdgePiece, this.outerHalfSide, 0],
    ];

    const faces: IFace[] = [
      new Face([0, 1, 2, 3], points, top),
      new Face([2, 3, 6, 5], points, side1),
      new Face([1, 2, 5, 4], points, side2)
    ]

    return new Geometry(points, faces);
  }

  square1Edge(top: IColor, side: IColor): Geometry {
    const points: vec3[] = [
      // Top
      vec3.rotateZ(vec3.create(), [0, 0, 0], [0, 0, 0], DEG_30_RADIANS),
      vec3.rotateZ(vec3.create(), [this.halfEdgePiece, this.halfSide, 0], [0, 0, 0], DEG_30_RADIANS),
      vec3.rotateZ(vec3.create(), [-this.halfEdgePiece, this.halfSide, 0], [0, 0, 0], DEG_30_RADIANS),

      // Side
      vec3.rotateZ(vec3.create(), [this.outerHalfEdgePiece, this.outerHalfSide, 0], [0, 0, 0], DEG_30_RADIANS),
      vec3.rotateZ(vec3.create(), [-this.outerHalfEdgePiece, this.outerHalfSide, 0], [0, 0, 0], DEG_30_RADIANS)
    ];

    const faces: IFace[] = [
      new Face([0, 1, 2], points, top),
      new Face([1, 2, 4, 3], points, side)
    ];

    return new Geometry(points, faces);
  }

  square1Middle(front: IColor, right: IColor, back: IColor, rotated: boolean): Geometry {
    const layerHeight = this.halfSide - this.halfEdgePiece;
    const middleHeight = this.sideLength - (2 * layerHeight);
    const halfMiddleHeight = middleHeight / 2;
    const cornerLength = this.outerHalfSide - this.outerHalfEdgePiece;

    const vertices: vec3[] = [
      [-this.outerHalfSide, halfMiddleHeight, -.01],
      [-this.outerHalfEdgePiece, halfMiddleHeight, -.01],
      [this.outerHalfSide, halfMiddleHeight, -.01],

      [-this.outerHalfSide, -halfMiddleHeight, -.01],
      [-this.outerHalfEdgePiece, -halfMiddleHeight, -.01],
      [this.outerHalfSide, -halfMiddleHeight, -.01],

      // Points for when middle is rotated
      [2 * this.outerHalfEdgePiece, halfMiddleHeight, -.01],
      [2 * this.outerHalfEdgePiece, -halfMiddleHeight, -.01],
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
      faces.push(new Face([6, 8, 9, 7], vertices, right));
    }

    return new Geometry(vertices, faces);
  }

  buildSquare1(top: Sqaure1Piece[], bottom: Sqaure1Piece[], middleRotated: boolean): Object3D[] {
    const layerHeight = this.halfSide - this.halfEdgePiece;
    const middleHeight = this.sideLength - (2 * layerHeight);
    const halfMiddleHeight = middleHeight / 2;

    let pieces = [];

    const topLayer = new Group(this.makeLayer(top));
    const bottomLayer = new Group(this.makeLayer(bottom));

    topLayer.translate([0, this.outerHalfSide + halfMiddleHeight, 0]);
    bottomLayer.translate([0, -(this.outerHalfSide + halfMiddleHeight), 0]);
    bottomLayer.rotate(DEG_30_RADIANS, [0, 0, 1])

    pieces = [topLayer, bottomLayer];

    const m = this.square1Middle(FRONT_COLOR, RIGHT_COLOR, BACK_COLOR, middleRotated);

    pieces.push(m);

    return pieces;
  }

}