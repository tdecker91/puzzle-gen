import { SOLVED_BOTTOM_PIECES } from "./../../puzzles/square1/constants";
import { Sqaure1Piece } from "./../../puzzles/square1/interface";
import { PIECE_TYPE } from "../../puzzles/square1/enum";
import { SOLVED_TOP_PIECES } from "../../puzzles/square1/constants";

export interface Square1Move {
  top: number;
  bottom: number;
}

const pieceValue = {
  [PIECE_TYPE.CORNER]: 2,
  [PIECE_TYPE.EDGE]: 1,
};

export class Square1Simualtor {
  public topLayer: Sqaure1Piece[];
  public bottomLayer: Sqaure1Piece[];
  public middleRotated: boolean;

  constructor() {
    this.topLayer = JSON.parse(JSON.stringify(SOLVED_TOP_PIECES));
    this.bottomLayer = JSON.parse(JSON.stringify(SOLVED_BOTTOM_PIECES));
    this.middleRotated = false;
  }

  public alg(moves: Square1Move[]) {
    moves.forEach((move) => {
      this.rotateTop(move.top);
      this.rotateBottom(move.bottom);
      this.slice();
    });
  }

  public slice() {
    let topNum = 0;
    let bottomNum = 0;

    for (let i = this.topLayer.length, value = 0; i > 0 && value < 6; i--) {
      value += pieceValue[this.topLayer[i - 1].type];
      topNum++;
    }

    for (let i = this.bottomLayer.length, value = 0; i > 0 && value < 6; i--) {
      value += pieceValue[this.bottomLayer[i - 1].type];
      bottomNum++;
    }

    const topSlice = this.topLayer.splice(
      this.topLayer.length - topNum,
      this.topLayer.length
    );
    const bottomSlice = this.bottomLayer.splice(
      this.bottomLayer.length - bottomNum,
      this.bottomLayer.length
    );

    this.topLayer = this.topLayer.concat(bottomSlice);
    this.bottomLayer = this.bottomLayer.concat(topSlice);

    this.middleRotated = !this.middleRotated;
  }

  public rotateTop(turns: number) {
    while (turns != 0) {
      if (turns < 0) {
        const piece = this.topLayer.shift();
        const value = pieceValue[piece.type];
        if (Math.abs(turns) < value) {
          throw "Invalid Square1 Move";
        }
        this.topLayer.push(piece);
        turns += value;
      } else {
        const piece = this.topLayer.pop();
        const value = pieceValue[piece.type];
        if (Math.abs(turns) < value) {
          throw "Invalid Square1 Move";
        }
        this.topLayer.unshift(piece);
        turns -= value;
      }
    }
  }

  public rotateBottom(turns: number) {
    while (turns != 0) {
      if (turns < 0) {
        const piece = this.bottomLayer.shift();
        const value = pieceValue[piece.type];
        if (Math.abs(turns) < value) {
          throw "Invalid Square1 Move";
        }
        this.bottomLayer.push(piece);
        turns += value;
      } else {
        const piece = this.bottomLayer.pop();
        const value = pieceValue[piece.type];
        if (Math.abs(turns) < value) {
          throw "Invalid Square1 Move";
        }
        this.bottomLayer.unshift(piece);
        turns -= value;
      }
    }
  }
}
