import { PIECE_TYPE } from './enum';
import { IColor } from './../../geometry/color';

export interface Sqaure1Piece {
  type: PIECE_TYPE,
  colors: IColor[]
}