import { SkewbSimulator } from "./../../../src/simulator/skewb/skewbSimulator";

const center = (face): string => face[0];
const topLeft = (face): string => face[1];
const topRight = (face): string => face[2];
const bottomLeft = (face): string => face[3];
const bottomRight = (face): string => face[4];

const skewbFaces = {
  TOP: "top",
  FRONT: "front",
  RIGHT: "right",
  BOTTOM: "bottom",
  BACK: "back",
  LEFT: "left",
};

describe("Moves", () => {
  it("can make an R turn", () => {
    const skewbSim = new SkewbSimulator();

    skewbSim.doTurn("R");

    const { top, front, right, bottom, back, left } = skewbSim.getValues();

    expect(center(right)).toBe(skewbFaces.BOTTOM);
    expect(topRight(right)).toBe(skewbFaces.BOTTOM);
    expect(bottomLeft(right)).toBe(skewbFaces.BOTTOM);
    expect(bottomRight(right)).toBe(skewbFaces.BOTTOM);

    expect(center(bottom)).toBe(skewbFaces.BACK);
    expect(topRight(bottom)).toBe(skewbFaces.BACK);
    expect(bottomLeft(bottom)).toBe(skewbFaces.BACK);
    expect(bottomLeft(bottom)).toBe(skewbFaces.BACK);

    expect(center(back)).toBe(skewbFaces.RIGHT);
    expect(topLeft(back)).toBe(skewbFaces.RIGHT);
    expect(bottomRight(back)).toBe(skewbFaces.RIGHT);
    expect(bottomLeft(back)).toBe(skewbFaces.RIGHT);

    expect(topRight(top)).toBe(skewbFaces.FRONT);
    expect(bottomLeft(left)).toBe(skewbFaces.TOP);
    expect(bottomRight(front)).toBe(skewbFaces.LEFT);

    skewbSim.doTurn("R", true);

    // Reverses Correctly
    expect(skewbSim.isSolved()).toBeTruthy();
  });

  it("can make an L turn", () => {
    const skewbSim = new SkewbSimulator();

    skewbSim.doTurn("L");

    const { top, front, right, bottom, back, left } = skewbSim.getValues();

    expect(center(front)).toBe(skewbFaces.LEFT);
    expect(topLeft(front)).toBe(skewbFaces.LEFT);
    expect(bottomLeft(front)).toBe(skewbFaces.LEFT);
    expect(bottomRight(front)).toBe(skewbFaces.LEFT);

    expect(center(bottom)).toBe(skewbFaces.FRONT);
    expect(topLeft(bottom)).toBe(skewbFaces.FRONT);
    expect(bottomLeft(bottom)).toBe(skewbFaces.FRONT);
    expect(bottomLeft(bottom)).toBe(skewbFaces.FRONT);

    expect(center(left)).toBe(skewbFaces.BOTTOM);
    expect(topRight(left)).toBe(skewbFaces.BOTTOM);
    expect(bottomRight(left)).toBe(skewbFaces.BOTTOM);
    expect(bottomLeft(left)).toBe(skewbFaces.BOTTOM);

    expect(bottomLeft(top)).toBe(skewbFaces.BACK);
    expect(bottomLeft(right)).toBe(skewbFaces.TOP);
    expect(bottomRight(back)).toBe(skewbFaces.RIGHT);

    skewbSim.doTurn("L", true);

    // Reverses Correctly
    expect(skewbSim.isSolved()).toBeTruthy();
  });

  it("can do a U turn", () => {
    const skewbSim = new SkewbSimulator();

    skewbSim.doTurn("U");

    const { top, front, right, bottom, back, left } = skewbSim.getValues();

    expect(center(top)).toBe(skewbFaces.BACK);
    expect(topLeft(top)).toBe(skewbFaces.BACK);
    expect(bottomLeft(top)).toBe(skewbFaces.BACK);
    expect(topRight(top)).toBe(skewbFaces.BACK);

    expect(center(back)).toBe(skewbFaces.LEFT);
    expect(topLeft(back)).toBe(skewbFaces.LEFT);
    expect(topRight(back)).toBe(skewbFaces.LEFT);
    expect(bottomRight(back)).toBe(skewbFaces.LEFT);

    expect(center(left)).toBe(skewbFaces.TOP);
    expect(topRight(left)).toBe(skewbFaces.TOP);
    expect(topLeft(left)).toBe(skewbFaces.TOP);
    expect(bottomLeft(left)).toBe(skewbFaces.TOP);

    expect(topLeft(front)).toBe(skewbFaces.RIGHT);
    expect(bottomLeft(bottom)).toBe(skewbFaces.FRONT);
    expect(topRight(right)).toBe(skewbFaces.BOTTOM);

    skewbSim.doTurn("U", true);

    // Reverses Correctly
    expect(skewbSim.isSolved()).toBeTruthy();
  });

  it("can do a B turn", () => {
    const skewbSim = new SkewbSimulator();

    skewbSim.doTurn("B");

    const { top, front, right, bottom, back, left } = skewbSim.getValues();

    expect(center(back)).toBe(skewbFaces.BOTTOM);
    expect(topRight(back)).toBe(skewbFaces.BOTTOM);
    expect(bottomLeft(back)).toBe(skewbFaces.BOTTOM);
    expect(bottomRight(back)).toBe(skewbFaces.BOTTOM);

    expect(center(bottom)).toBe(skewbFaces.LEFT);
    expect(topLeft(bottom)).toBe(skewbFaces.LEFT);
    expect(bottomLeft(bottom)).toBe(skewbFaces.LEFT);
    expect(bottomLeft(bottom)).toBe(skewbFaces.LEFT);

    expect(center(left)).toBe(skewbFaces.BACK);
    expect(topLeft(left)).toBe(skewbFaces.BACK);
    expect(bottomRight(left)).toBe(skewbFaces.BACK);
    expect(bottomLeft(left)).toBe(skewbFaces.BACK);

    expect(topLeft(top)).toBe(skewbFaces.RIGHT);
    expect(bottomRight(right)).toBe(skewbFaces.FRONT);
    expect(bottomLeft(front)).toBe(skewbFaces.TOP);

    skewbSim.doTurn("B", true);

    // Reverses Correctly
    expect(skewbSim.isSolved()).toBeTruthy();
  });

  it("can fully scramble", () => {
    const skewbSim = new SkewbSimulator();

    skewbSim.doTurn("U", false);
    skewbSim.doTurn("B", true);
    skewbSim.doTurn("U", true);
    skewbSim.doTurn("L", true);
    skewbSim.doTurn("U", false);
    skewbSim.doTurn("R", false);
    skewbSim.doTurn("U", false);
    skewbSim.doTurn("B", true);
    skewbSim.doTurn("L", false);
    skewbSim.doTurn("B", true);
    skewbSim.doTurn("L", false);

    const expected = {
      top: ["right", "top", "top", "front", "top"],
      front: ["left", "right", "front", "bottom", "top"],
      right: ["top", "right", "left", "back", "back"],
      bottom: ["front", "left", "right", "bottom", "right"],
      back: ["bottom", "front", "back", "bottom", "back"],
      left: ["back", "left", "bottom", "left", "front"],
    };

    expect(skewbSim.getValues()).toEqual(expected);

    skewbSim.doTurn("L", true);
    skewbSim.doTurn("B", false);
    skewbSim.doTurn("L", true);
    skewbSim.doTurn("B", false);
    skewbSim.doTurn("U", true);
    skewbSim.doTurn("R", true);
    skewbSim.doTurn("U", true);
    skewbSim.doTurn("L", false);
    skewbSim.doTurn("U", false);
    skewbSim.doTurn("B", false);
    skewbSim.doTurn("U", true);

    expect(skewbSim.isSolved()).toBeTruthy();
  });
});
