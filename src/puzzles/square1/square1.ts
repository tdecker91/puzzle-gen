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
import { IColor } from "./../../geometry/color";
import { Group } from "../../geometry/group";
import { Vector3 } from "../../math/vector";

const INNER_FACE_COLOR = { value: "#333", stroke: "#333" };

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
    const points: Vector3[] = [
      // Top
      Vector3.fromValues(0, 0, this.halfSide),
      Vector3.fromValues(this.halfSide, this.halfEdgePiece, this.halfSide),
      Vector3.fromValues(this.halfSide, this.halfSide, this.halfSide),
      Vector3.fromValues(this.halfEdgePiece, this.halfSide, this.halfSide),

      // Bottom
      Vector3.fromValues(0, 0, this.halfSide - this.layerWidth),
      Vector3.fromValues(
        this.halfSide,
        this.halfEdgePiece,
        this.halfSide - this.layerWidth
      ),
      Vector3.fromValues(
        this.halfSide,
        this.halfSide,
        this.halfSide - this.layerWidth
      ),
      Vector3.fromValues(
        this.halfEdgePiece,
        this.halfSide,
        this.halfSide - this.layerWidth
      ),
    ];

    const faces: IFace[] = [
      new Face([0, 1, 2, 3], points, top),
      // TODO: the faces commented out here are the underside of the pieces so
      // they show gray when the cube is scrambled. But they are overlapping sometimes
      // with outward sticker faces. removing them for now, but it'd be nice to
      // fix this.
      new Face([4, 5, 6, 7], points, INNER_FACE_COLOR),
      new Face([0, 1, 5, 4], points, INNER_FACE_COLOR),
      new Face([2, 3, 7, 6], points, side1),
      new Face([1, 2, 6, 5], points, side2),
      new Face([0, 3, 7, 4], points, INNER_FACE_COLOR),
    ];

    const innerCentroid = Vector3.fromValues(
      this.halfSide / 2,
      this.halfSide / 2,
      this.halfSide / 2
    );
    faces[1].centroid = innerCentroid;
    faces[2].centroid = innerCentroid;
    faces[5].centroid = innerCentroid;

    return new Geometry(points, faces);
  }

  square1Edge(top: IColor, side: IColor): Geometry {
    const points: Vector3[] = [
      // Top
      Vector3.fromValues(0, 0, this.halfSide).rotateZ(
        Vector3.fromValues(0, 0, 0),
        DEG_30_RADIANS
      ),
      Vector3.fromValues(
        this.halfEdgePiece,
        this.halfSide,
        this.halfSide
      ).rotateZ(Vector3.fromValues(0, 0, 0), DEG_30_RADIANS),
      Vector3.fromValues(
        -this.halfEdgePiece,
        this.halfSide,
        this.halfSide
      ).rotateZ(Vector3.fromValues(0, 0, 0), DEG_30_RADIANS),

      // Bottom
      Vector3.fromValues(0, 0, this.halfSide - this.layerWidth).rotateZ(
        Vector3.fromValues(0, 0, 0),
        DEG_30_RADIANS
      ),
      Vector3.fromValues(
        this.halfEdgePiece,
        this.halfSide,
        this.halfSide - this.layerWidth
      ).rotateZ(Vector3.fromValues(0, 0, 0), DEG_30_RADIANS),
      Vector3.fromValues(
        -this.halfEdgePiece,
        this.halfSide,
        this.halfSide - this.layerWidth
      ).rotateZ(Vector3.fromValues(0, 0, 0), DEG_30_RADIANS),
    ];

    const faces: IFace[] = [
      new Face([0, 1, 2], points, top),
      new Face([3, 4, 5], points, INNER_FACE_COLOR),
      new Face([1, 2, 5, 4], points, side),
      new Face([0, 1, 4, 3], points, INNER_FACE_COLOR),
      new Face([0, 2, 5, 3], points, INNER_FACE_COLOR),
    ];

    const innerFaceCentroid = Vector3.fromValues(
      0,
      this.halfSide / 2,
      this.halfSide / 2
    ).rotateZ(Vector3.fromValues(0, 0, 0), DEG_30_RADIANS);

    // Override centroid to avoid drawing over outside stickers
    faces[1].centroid = innerFaceCentroid;
    faces[3].centroid = innerFaceCentroid;
    faces[4].centroid = innerFaceCentroid;

    return new Geometry(points, faces);
  }

  square1Middle(front: IColor, side: IColor, back: IColor): Geometry {
    const vertices: Vector3[] = [
      Vector3.fromValues(-this.halfSide, -this.halfSide, this.halfMiddleWidth),
      Vector3.fromValues(-this.halfSide, this.halfSide, this.halfMiddleWidth),
      Vector3.fromValues(
        this.halfEdgePiece,
        this.halfSide,
        this.halfMiddleWidth
      ),
      Vector3.fromValues(
        -this.halfEdgePiece,
        -this.halfSide,
        this.halfMiddleWidth
      ),

      Vector3.fromValues(-this.halfSide, -this.halfSide, -this.halfMiddleWidth),
      Vector3.fromValues(-this.halfSide, this.halfSide, -this.halfMiddleWidth),
      Vector3.fromValues(
        this.halfEdgePiece,
        this.halfSide,
        -this.halfMiddleWidth
      ),
      Vector3.fromValues(
        -this.halfEdgePiece,
        -this.halfSide,
        -this.halfMiddleWidth
      ),
    ];

    const faces: IFace[] = [
      new Face([0, 1, 2, 3], vertices, { value: "#333" }),
      new Face([4, 5, 6, 7], vertices, { value: "#333" }),
      new Face([0, 1, 5, 4], vertices, side),
      new Face([1, 2, 6, 5], vertices, back),
      // new Face([2, 3, 7, 6], vertices, { value: "#333" }),
      new Face([0, 3, 7, 4], vertices, front),
    ];

    const innerFaceCentroid = Vector3.fromValues(-this.halfSide / 2, 0, 0);

    // Override centroid to avoid drawing over outside stickers
    faces[0].centroid = innerFaceCentroid;
    faces[1].centroid = innerFaceCentroid;
    faces[2].centroid = Vector3.fromValues(
      -(this.halfSide + this.halfSide * 0.45),
      0,
      0
    );

    return new Geometry(vertices, faces);
  }

  buildSquare1(
    top: Sqaure1Piece[],
    bottom: Sqaure1Piece[],
    middleRotated: boolean
  ): Object3D[] {
    const topLayer = new Group(this.makeLayer(top));
    const bottomLayer = new Group(this.makeLayer(bottom));

    bottomLayer.rotate(Math.PI, 1, 0, 0);
    bottomLayer.rotate(DEG_30_RADIANS, 0, 0, 1);

    const pieces: Object3D[] = [topLayer, bottomLayer];

    const m1 = this.square1Middle(FRONT_COLOR, LEFT_COLOR, BACK_COLOR);
    const m2 = this.square1Middle(BACK_COLOR, RIGHT_COLOR, FRONT_COLOR);
    m2.rotate(Math.PI, 0, 0, 1);

    if (middleRotated) {
      m2.rotate(
        Math.PI,
        ROTATION_VECTOR.x,
        ROTATION_VECTOR.y,
        ROTATION_VECTOR.z
      );
    }

    pieces.push(m1);
    pieces.push(m2);

    this.faces = {
      top: topLayer,
      bottom: bottomLayer,
    };

    return pieces;
  }
}
