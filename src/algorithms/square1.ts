import { Square1Move } from "./../simulator/square1/square1Simulator";
import { Square1Turns } from "../simulator/square1/square1Simulator";
import { Turn } from "./algorithm";

const square1TurnRegex = /((\()?(-?\d)\s*,\s*(-?\d)(\))?)|(\/)/g;

export function parseSquare1Algorithm(algorithm: string): Square1Move[] {
  let turns: Square1Move[] = [];
  let match: RegExpExecArray | null;

  while ((match = square1TurnRegex.exec(algorithm))) {
    if (match[0] === "/") {
      turns.push({ slice: true });
    } else {
      turns.push({
        top: parseInt(match[3]),
        bottom: parseInt(match[4]),
      });
    }
  }

  return turns;
}
