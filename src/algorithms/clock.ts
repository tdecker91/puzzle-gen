const clockTurnRegex = /([URDLAy]+)([0-9]+)([\+|\-]?)/g;

export enum ClockMoveType {
  DIAL, // turn a dial
  ROTATE, // rotate the puzzle by y2
}

export enum ClockCorner {
  ALL,
  UL,
  UR,
  DL,
  DR,
  U,
  R,
  D,
  L,
}

type ClockMove = {
  type: ClockMoveType;
  corner: ClockCorner;
  value: number;
  clockwise: boolean;
};

export function parseClockAlgorithm(algorithm: string): ClockMove[] {
  let moves: ClockMove[] = [];
  let match: RegExpExecArray | null;

  while ((match = clockTurnRegex.exec(algorithm))) {
    let rawCorner: string = match[1];
    let rawValue: string = match[2];
    let rawDirection: string = match[3];

    moves.push(parseMove(rawCorner, rawValue, rawDirection));
  }

  return moves;
}

function parseMove(
  rawCorner: string,
  rawValue: string,
  rawDirection: string
): ClockMove {
  let direction = parseDirection(rawDirection);
  return {
    type: parseType(rawCorner),
    corner: parseCorner(rawCorner),
    value: parseValue(rawValue, direction),
    clockwise: direction,
  };
}

function parseType(corner): ClockMoveType {
  switch (corner) {
    case "y":
      return ClockMoveType.ROTATE;
    case "ALL":
    case "UL":
    case "DL":
    case "UR":
    case "DR":
    case "U":
    case "R":
    case "D":
    case "L":
      return ClockMoveType.DIAL;
    default:
      throw new Error(`Invalid clock move (${corner})`);
  }
}

function parseCorner(corner): ClockCorner {
  switch (corner) {
    case "y":
      return null;
    case "UL":
      return ClockCorner.UL;
    case "DL":
      return ClockCorner.DL;
    case "UR":
      return ClockCorner.UR;
    case "DR":
      return ClockCorner.DR;
    case "U":
      return ClockCorner.U;
    case "R":
      return ClockCorner.R;
    case "D":
      return ClockCorner.D;
    case "L":
      return ClockCorner.L;
    case "ALL":
      return ClockCorner.ALL;
    default:
      throw new Error(`Invalid clock move (${corner})`);
  }
}

function parseValue(value, clockwise: boolean): number {
  if (clockwise) {
    return parseInt(value);
  } else {
    return -1 * parseInt(value);
  }
}

function parseDirection(direction): boolean {
  switch (direction) {
    case "-":
      return false;
    case "+":
      return true;
  }
}
