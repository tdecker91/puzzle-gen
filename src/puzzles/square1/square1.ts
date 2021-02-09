import { Object3D } from "./../../geometry/object3d";
import {
  ROTATION_VECTOR,
  FRONT_COLOR,
  LEFT_COLOR,
  BACK_COLOR,
  RIGHT_COLOR,
  SOLVED_TOP_PIECES,
  SOLVED_BOTTOM_PIECES,
} from "./constants";
import { Sqaure1Piece, Square1Builder } from "./interface";
import { DEG_30_RADIANS } from "./../../math/constants";
import { Geometry } from "./../../geometry/geometry";
import { IFace, Face } from "./../../geometry/face";
import { vec3 } from "gl-matrix";
import { IColor } from "./../../geometry/color";
import { Group } from "../../geometry/group";

export class Square1 extends Square1Builder {
  constructor(
    topLayer: Sqaure1Piece[] = SOLVED_TOP_PIECES,
    bottomLayer: Sqaure1Piece[] = SOLVED_BOTTOM_PIECES,
    middleRotated: boolean = false,
    sideLength: number = 1.25
  ) {
    super(topLayer, bottomLayer, middleRotated, sideLength);
  }

  square1Corner(top: IColor, side1: IColor, side2: IColor): Geometry {
    const points: vec3[] = [
      // Top
      [0, 0, this.halfSide],
      [this.halfSide, this.halfEdgePiece, this.halfSide],
      [this.halfSide, this.halfSide, this.halfSide],
      [this.halfEdgePiece, this.halfSide, this.halfSide],

      // Bottom
      [0, 0, this.halfSide - this.layerWidth],
      [this.halfSide, this.halfEdgePiece, this.halfSide - this.layerWidth],
      [this.halfSide, this.halfSide, this.halfSide - this.layerWidth],
      [this.halfEdgePiece, this.halfSide, this.halfSide - this.layerWidth],
    ];

    const faces: IFace[] = [
      new Face([0, 1, 2, 3], points, top),
      // TODO: the faces commented out here are the underside of the pieces so
      // they show gray when the cube is scrambled. But they are overlapping sometimes
      // with outward sticker faces. removing them for now, but it'd be nice to
      // fix this.
      // new Face([4, 5, 6, 7], points, { value: '#333' }),
      // new Face([0, 1, 5, 4], points, { value: '#333' }),
      new Face([2, 3, 7, 6], points, side1),
      new Face([1, 2, 6, 5], points, side2),
      // new Face([0, 3, 7, 4], points, { value: '#333' }),
    ];

    return new Geometry(points, faces);
  }

  square1Edge(top: IColor, side: IColor): Geometry {
    const points: vec3[] = [
      // Top
      vec3.rotateZ(
        vec3.create(),
        [0, 0, this.halfSide],
        [0, 0, 0],
        DEG_30_RADIANS
      ),
      vec3.rotateZ(
        vec3.create(),
        [this.halfEdgePiece, this.halfSide, this.halfSide],
        [0, 0, 0],
        DEG_30_RADIANS
      ),
      vec3.rotateZ(
        vec3.create(),
        [-this.halfEdgePiece, this.halfSide, this.halfSide],
        [0, 0, 0],
        DEG_30_RADIANS
      ),

      // Bottom
      vec3.rotateZ(
        vec3.create(),
        [0, 0, this.halfSide - this.layerWidth],
        [0, 0, 0],
        DEG_30_RADIANS
      ),
      vec3.rotateZ(
        vec3.create(),
        [this.halfEdgePiece, this.halfSide, this.halfSide - this.layerWidth],
        [0, 0, 0],
        DEG_30_RADIANS
      ),
      vec3.rotateZ(
        vec3.create(),
        [-this.halfEdgePiece, this.halfSide, this.halfSide - this.layerWidth],
        [0, 0, 0],
        DEG_30_RADIANS
      ),
    ];

    const faces: IFace[] = [
      new Face([0, 1, 2], points, top),
      // new Face([3, 4, 5], points, { value: '#333' }),
      new Face([1, 2, 5, 4], points, side),
      // new Face([0, 1, 4, 3], points, { value: '#333' }),
      // new Face([0, 2, 5, 3], points, { value: '#333' }),
    ];

    return new Geometry(points, faces);
  }

  square1Middle(front: IColor, side: IColor, back: IColor): Geometry {
    const vertices: vec3[] = [
      [-this.halfSide, -this.halfSide, this.halfMiddleWidth],
      [-this.halfSide, this.halfSide, this.halfMiddleWidth],
      [this.halfEdgePiece, this.halfSide, this.halfMiddleWidth],
      [-this.halfEdgePiece, -this.halfSide, this.halfMiddleWidth],

      [-this.halfSide, -this.halfSide, -this.halfMiddleWidth],
      [-this.halfSide, this.halfSide, -this.halfMiddleWidth],
      [this.halfEdgePiece, this.halfSide, -this.halfMiddleWidth],
      [-this.halfEdgePiece, -this.halfSide, -this.halfMiddleWidth],
    ];

    const faces: IFace[] = [
      new Face([0, 1, 2, 3], vertices, { value: "#333" }),
      new Face([4, 5, 6, 7], vertices, { value: "#333" }),
      new Face([0, 1, 5, 4], vertices, side),
      new Face([1, 2, 6, 5], vertices, back),
      new Face([2, 3, 7, 6], vertices, { value: "#333" }),
      new Face([0, 3, 7, 4], vertices, front),
    ];

    return new Geometry(vertices, faces);
  }

  buildSquare1(
    top: Sqaure1Piece[],
    bottom: Sqaure1Piece[],
    middleRotated: boolean
  ): Object3D[] {
    const topLayer = new Group(this.makeLayer(top));
    const bottomLayer = new Group(this.makeLayer(bottom));

    // Prevent overlapping faces
    topLayer.translate([0, 0, 0.005]);
    bottomLayer.translate([0, 0, -0.005]);

    bottomLayer.rotate(Math.PI, [1, 0, 0]);
    bottomLayer.rotate(DEG_30_RADIANS, [0, 0, 1]);

    const pieces: Object3D[] = [topLayer, bottomLayer];

    const m1 = this.square1Middle(FRONT_COLOR, LEFT_COLOR, BACK_COLOR);
    const m2 = this.square1Middle(BACK_COLOR, RIGHT_COLOR, FRONT_COLOR);
    m2.rotate(Math.PI, [0, 0, 1]);

    if (middleRotated) {
      m2.rotate(Math.PI, ROTATION_VECTOR);
    }

    pieces.push(m1);
    pieces.push(m2);

    this.faces = {
      top: topLayer,
      bottom: bottomLayer
    }

    return pieces;
  }
}
