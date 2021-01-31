import { WHITE, RED, BLUE, GREEN, ORANGE, YELLOW } from "./../colors";
import { IColor } from "./../../geometry/color";
import { PIECE_TYPE } from "./enum";
import { Sqaure1Piece } from "./interface";
import { vec3 } from "gl-matrix";

export const ROTATION_VECTOR: vec3 = [0.96875, -0.24803, 0];

export const TOP_COLOR: IColor = YELLOW;
export const BOTTOM_COLOR: IColor = WHITE;
export const FRONT_COLOR: IColor = RED;
export const LEFT_COLOR: IColor = BLUE;
export const RIGHT_COLOR: IColor = GREEN;
export const BACK_COLOR: IColor = ORANGE;

export const SOLVED_TOP_PIECES: Sqaure1Piece[] = [
  { type: PIECE_TYPE.CORNER, colors: [TOP_COLOR, FRONT_COLOR, LEFT_COLOR] },
  { type: PIECE_TYPE.EDGE, colors: [TOP_COLOR, LEFT_COLOR] },
  { type: PIECE_TYPE.CORNER, colors: [TOP_COLOR, LEFT_COLOR, BACK_COLOR] },
  { type: PIECE_TYPE.EDGE, colors: [TOP_COLOR, BACK_COLOR] },
  { type: PIECE_TYPE.CORNER, colors: [TOP_COLOR, BACK_COLOR, RIGHT_COLOR] },
  { type: PIECE_TYPE.EDGE, colors: [TOP_COLOR, RIGHT_COLOR] },
  { type: PIECE_TYPE.CORNER, colors: [TOP_COLOR, RIGHT_COLOR, FRONT_COLOR] },
  { type: PIECE_TYPE.EDGE, colors: [TOP_COLOR, FRONT_COLOR] },
];

export const SOLVED_BOTTOM_PIECES: Sqaure1Piece[] = [
  { type: PIECE_TYPE.EDGE, colors: [BOTTOM_COLOR, BACK_COLOR] },
  { type: PIECE_TYPE.CORNER, colors: [BOTTOM_COLOR, BACK_COLOR, LEFT_COLOR] },
  { type: PIECE_TYPE.EDGE, colors: [BOTTOM_COLOR, LEFT_COLOR] },
  { type: PIECE_TYPE.CORNER, colors: [BOTTOM_COLOR, LEFT_COLOR, FRONT_COLOR] },
  { type: PIECE_TYPE.EDGE, colors: [BOTTOM_COLOR, FRONT_COLOR] },
  { type: PIECE_TYPE.CORNER, colors: [BOTTOM_COLOR, FRONT_COLOR, RIGHT_COLOR] },
  { type: PIECE_TYPE.EDGE, colors: [BOTTOM_COLOR, RIGHT_COLOR] },
  { type: PIECE_TYPE.CORNER, colors: [BOTTOM_COLOR, RIGHT_COLOR, BACK_COLOR] },
];
