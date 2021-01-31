import { SOLVED_BOTTOM_PIECES, SOLVED_TOP_PIECES } from "./constants";
import { Object3D } from "./../../geometry/object3d";
import { Group } from "./../../geometry/group";
import { Geometry } from "./../../geometry/geometry";
import {
  ATAN_15_DEG,
  DEG_30_RADIANS,
  DEG_60_RADIANS,
} from "./../../math/constants";
import { PIECE_TYPE } from "./enum";
import { IColor } from "./../../geometry/color";

export interface Sqaure1Piece {
  type: PIECE_TYPE;
  colors: IColor[];
}

export abstract class Square1Builder {
  public pieces: Object3D[];
  public group: Group;

  // Numbers used to calculate geometry
  protected sideLength: number;
  protected halfSide: number;
  protected halfEdgePiece: number;
  protected layerWidth: number;
  protected middleWidth: number;
  protected halfMiddleWidth: number;

  // Used for the 2D square 1
  protected borderLayerWidth: number;
  protected outerHalfSide: number;
  protected outerHalfEdgePiece: number;

  constructor(
    topLayer: Sqaure1Piece[] = SOLVED_TOP_PIECES,
    bottomLayer: Sqaure1Piece[] = SOLVED_BOTTOM_PIECES,
    middleRotated: boolean = false,
    sideLength: number = 0.7
  ) {
    this.sideLength = sideLength;
    this.halfSide = this.sideLength / 2;
    this.halfEdgePiece = this.halfSide * ATAN_15_DEG;
    this.layerWidth = this.halfSide - this.halfEdgePiece;
    this.middleWidth = this.sideLength - 2 * this.layerWidth;
    this.halfMiddleWidth = this.middleWidth / 2;
    this.borderLayerWidth = this.sideLength * 0.2;
    this.outerHalfSide = (sideLength + this.borderLayerWidth) / 2;
    this.outerHalfEdgePiece = this.outerHalfSide * ATAN_15_DEG;

    this.pieces = this.buildSquare1(topLayer, bottomLayer, middleRotated);
    this.group = new Group(this.pieces);
  }

  abstract square1Corner(top: IColor, side1: IColor, side2: IColor): Geometry;
  abstract square1Edge(top: IColor, side: IColor): Geometry;
  abstract buildSquare1(
    topLayer: Sqaure1Piece[],
    bottomLayer: Sqaure1Piece[],
    middleRotated: boolean
  ): Object3D[];

  protected makeLayer(pieces: Sqaure1Piece[]) {
    let geometry: Geometry[] = [];
    let angle = Math.PI;

    pieces.forEach((piece, index) => {
      switch (piece.type) {
        case PIECE_TYPE.CORNER:
          const corner = this.square1Corner(
            piece.colors[0],
            piece.colors[1],
            piece.colors[2]
          );
          corner.rotate(angle, [0, 0, 1]);
          geometry.push(corner);
          angle -= DEG_60_RADIANS;
          break;
        case PIECE_TYPE.EDGE:
          const edge = this.square1Edge(piece.colors[0], piece.colors[1]);
          edge.rotate(angle - DEG_60_RADIANS, [0, 0, 1]);
          geometry.push(edge);
          angle -= DEG_30_RADIANS;
          break;
      }
    });

    return geometry;
  }

  /**
   * Not implemented. Just here for {@link Visualizer}'s sake
   */
  setColors(colors: { [face: string]: IColor[] }) {}
}
