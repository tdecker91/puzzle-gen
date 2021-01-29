import { Square1Net } from './../../puzzles/square1/square1Net';
import { Square1Simualtor } from './../../simulator/square1/square1Simulator';
import { Square1 } from './../../puzzles/square1/square1';

export function scrambledSquare1(): [Square1, Square1Net] {
  let square1Sim = new Square1Simualtor();

  /**
   * -2,3 / 3,-1 / 3,-3 / 6,6 / 6,0 / -2,-1 / -4,-2 / 0,-3 / 0,-4 / -4,5 / -5,-2 / 2,-5 / 6,-4 / -3,6 / -2,2 / 3,-5 /
   */
  let scramble = [
      "-2,3",
      "3,-1",
      "3,-3",
      "6,6",
      "6,0",
      "-2,-1",
      "-4,-2",
      "0,-3",
      "0,-4",
      "-4,5",
      "-5,-2",
      "2,-5",
      "6,-4",
      "-3,6",
      "-2,2",
      "3,-5",
  ];

  const alg = scramble.map(move => {
    const [top, bottom] = move.split(",");

    return {
      top: parseInt(top),
      bottom: parseInt(bottom)
    }
  });

  square1Sim.algorithm(alg);

  return [
    new Square1(1.25, square1Sim.topLayer, square1Sim.bottomLayer, square1Sim.middleRotated),
    new Square1Net(.7, square1Sim.topLayer, square1Sim.bottomLayer, square1Sim.middleRotated)
  ];
}