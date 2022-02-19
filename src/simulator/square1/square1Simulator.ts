import { IColor } from "./../../geometry/color";
import { Simulator } from "./../simulator";
import {
  BACK_COLOR,
  BOTTOM_COLOR,
  DEFAULT_SQ1_SCHEME,
  FRONT_COLOR,
  LEFT_COLOR,
  RIGHT_COLOR,
  SOLVED_BOTTOM_PIECES,
  TOP_COLOR,
} from "./../../puzzles/square1/constants";
import { Sqaure1Piece } from "./../../puzzles/square1/interface";
import { PIECE_TYPE } from "../../puzzles/square1/enum";
import { SOLVED_TOP_PIECES } from "../../puzzles/square1/constants";
import { parseSquare1Algorithm } from "../../algorithms/square1";

export type Square1Move = Square1Turns | Square1Slice;

export type Square1Slice = {
  slice: boolean;
};
export interface Square1Turns {
  top: number;
  bottom: number;
}

const pieceValue = {
  [PIECE_TYPE.CORNER]: 2,
  [PIECE_TYPE.EDGE]: 1,
};

export class Square1Simualtor extends Simulator {
  public topLayer: Sqaure1Piece[];
  public bottomLayer: Sqaure1Piece[];
  public middleRotated: boolean;

  private scheme: { [face: string]: IColor };

  constructor(scheme: { [face: string]: IColor } = DEFAULT_SQ1_SCHEME) {
    super();
    this.scheme = scheme;
    this.topLayer = solvedTop(this.scheme);
    this.bottomLayer = solvedBottom(this.scheme);
    this.middleRotated = false;
  }

  public alg(alg: string) {
    parseSquare1Algorithm(alg).forEach((move) => {
      if ("slice" in move) {
        this.slice();
      } else {
        this.rotateTop(move.top);
        this.rotateBottom(move.bottom);
      }
    });
  }

  public case(alg: string) {
    parseSquare1Algorithm(alg)
      .reverse()
      .forEach((move) => {
        if ("slice" in move) {
          this.slice();
        } else {
          this.rotateTop(move.top * -1);
          this.rotateBottom(move.bottom * -1);
        }
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

function solvedTop(scheme): Sqaure1Piece[] {
  return [
    {
      type: PIECE_TYPE.CORNER,
      colors: [
        scheme.top || TOP_COLOR,
        scheme.front || FRONT_COLOR,
        scheme.left || LEFT_COLOR,
      ],
    },
    {
      type: PIECE_TYPE.EDGE,
      colors: [scheme.top || TOP_COLOR, scheme.left || LEFT_COLOR],
    },
    {
      type: PIECE_TYPE.CORNER,
      colors: [
        scheme.top || TOP_COLOR,
        scheme.left || LEFT_COLOR,
        scheme.back || BACK_COLOR,
      ],
    },
    {
      type: PIECE_TYPE.EDGE,
      colors: [scheme.top || TOP_COLOR, scheme.back || BACK_COLOR],
    },
    {
      type: PIECE_TYPE.CORNER,
      colors: [
        scheme.top || TOP_COLOR,
        scheme.back || BACK_COLOR,
        scheme.right || RIGHT_COLOR,
      ],
    },
    {
      type: PIECE_TYPE.EDGE,
      colors: [scheme.top || TOP_COLOR, scheme.right || RIGHT_COLOR],
    },
    {
      type: PIECE_TYPE.CORNER,
      colors: [
        scheme.top || TOP_COLOR,
        scheme.right || RIGHT_COLOR,
        scheme.front || FRONT_COLOR,
      ],
    },
    {
      type: PIECE_TYPE.EDGE,
      colors: [scheme.top || TOP_COLOR, scheme.front || FRONT_COLOR],
    },
  ];
}

function solvedBottom(scheme): Sqaure1Piece[] {
  return [
    {
      type: PIECE_TYPE.EDGE,
      colors: [scheme.bottom || BOTTOM_COLOR, scheme.back || BACK_COLOR],
    },
    {
      type: PIECE_TYPE.CORNER,
      colors: [
        scheme.bottom || BOTTOM_COLOR,
        scheme.back || BACK_COLOR,
        scheme.left || LEFT_COLOR,
      ],
    },
    {
      type: PIECE_TYPE.EDGE,
      colors: [scheme.bottom || BOTTOM_COLOR, scheme.left || LEFT_COLOR],
    },
    {
      type: PIECE_TYPE.CORNER,
      colors: [
        scheme.bottom || BOTTOM_COLOR,
        scheme.left || LEFT_COLOR,
        scheme.front || FRONT_COLOR,
      ],
    },
    {
      type: PIECE_TYPE.EDGE,
      colors: [scheme.bottom || BOTTOM_COLOR, scheme.front || FRONT_COLOR],
    },
    {
      type: PIECE_TYPE.CORNER,
      colors: [
        scheme.bottom || BOTTOM_COLOR,
        scheme.front || FRONT_COLOR,
        scheme.right || RIGHT_COLOR,
      ],
    },
    {
      type: PIECE_TYPE.EDGE,
      colors: [scheme.bottom || BOTTOM_COLOR, scheme.right || RIGHT_COLOR],
    },
    {
      type: PIECE_TYPE.CORNER,
      colors: [
        scheme.bottom || BOTTOM_COLOR,
        scheme.right || RIGHT_COLOR,
        scheme.back || BACK_COLOR,
      ],
    },
  ];
}
