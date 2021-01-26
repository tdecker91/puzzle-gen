import { Square1Net } from './../../puzzles/square1/square1Net';
import { SkewbNet } from './../../puzzles/skewbNet';
import { MegaminxNet } from './../../puzzles/megaminxNet';
import { RubiksCubeNet } from './../../puzzles/rubiksCube/rubiksCubeNet';
import { Square1Simualtor, Square1Move } from './../../simulator/square1/square1Simulator';
import { Square1 } from './../../puzzles/square1/square1';
import { SkewbSimulator } from './../../simulator/skewb/skewbSimulator';
import { PyraminxSimulator } from './../../simulator/pyraminx/pyraminxSimulator';
import { Pyraminx } from './../../puzzles/pyraminx';
import { MegaminxSimulator } from './../../simulator/megaminx/megaminxSimulator';
import { Megaminx } from './../../puzzles/megaminx';
import { RED, BLUE, WHITE, ORANGE, GREEN, PINK, LIGHT_YELLOW, GREY, LIGHT_GREEN, PURPLE, DARK_BLUE } from './../../puzzles/colors';
import { RubiksCubeSimulator } from './../../simulator/rubiksCube/rubiksCubeSimulator';
import { RubiksCube } from './../../puzzles/rubiksCube/rubiksCube';
import { YELLOW } from '../../puzzles/colors';
import { Skewb } from '../../puzzles/skewb';
import { PyraminxNet } from '../../puzzles/pyraminxNet';

export function scrambledCube(): [RubiksCube, RubiksCubeNet] {
  let cubeSim = new RubiksCubeSimulator(3);
  const scramble = [
    "F'", "D", "U", "F", "F", "L", "L",
    "D", "D", "B", "F", "L'", "U'", "F",
    "F", "R", "R", "F'", "D'", "B", "F'",
    "D", "D", "U", "R", "R", "F", "F", "U",
    "U", "B", "R'", "B", "B"
  ];

  scramble.forEach(move => {
    switch (move) {
      case "U": cubeSim.U(); break;
      case "R": cubeSim.R(); break;
      case "F": cubeSim.F(); break;
      case "D": cubeSim.D(); break;
      case "L": cubeSim.L(); break;
      case "B": cubeSim.B(); break;
      case "U'": cubeSim.U(true); break;
      case "R'": cubeSim.R(true); break;
      case "F'": cubeSim.F(true); break;
      case "D'": cubeSim.D(true); break;
      case "L'": cubeSim.L(true); break;
      case "B'": cubeSim.B(true); break;
    }
  });

  let cubeFaceColors = {
    U: YELLOW,
    R: RED,
    F: BLUE,
    D: WHITE,
    L: ORANGE,
    B: GREEN,
  }

  let cube = new RubiksCube(3);
  let cubeNet = new RubiksCubeNet(3);

  const {U, R, F, D, L, B} = cubeSim.getValues();
  const colors = [...U, ...R, ...F, ...D, ...L, ...B].map(face => cubeFaceColors[face]);
  cube.setColors(colors);
  cubeNet.setColors(colors);

  return [cube, cubeNet];
}

export function scrambledMegaminx(): [Megaminx, MegaminxNet] {
  let megaSim = new MegaminxSimulator();
  const scramble = [
    'R++','D++','R++','D--','R--','D++','R--','D++','R--','D++','U',
    'D++','R--','D++','R++','D++','R--','D--','R--','D--','R--','U',
    'R--','D--','R++','D++','R++','D--','R--','D--','R++','D--','U\'',
    'R--','D++','R--','D--','R++','D--','R++','D++','R--','D++','U\''
  ];

  scramble.forEach(move => {
    switch (move) {
      case "R++": megaSim.Rxx(); break;
      case "R--": megaSim.Rxx(true); break;
      case "D++": megaSim.Dxx(); break;
      case "D--": megaSim.Dxx(true); break;
      case "U": megaSim.U(); break;
      case "U'": megaSim.U(true); break;
    }
  });

  let megaminxFaceColors = {
    U: WHITE,
    F: RED,
    R: BLUE,
    dr: PINK,
    dl: LIGHT_YELLOW,
    L: GREEN,
    d: GREY,
    br: LIGHT_GREEN,
    BR: YELLOW,
    BL: PURPLE,
    bl: DARK_BLUE,
    b: ORANGE
  }
  let {U, R, F, dr, dl, L, d, br, BR, BL, b, bl} = megaSim.getValues();
  const colors = [...U, ...R, ...F, ...dr, ...dl, ...L, ...d, ...br, ...BR, ...BL, ...bl, ...b].map(face => megaminxFaceColors[face]);

  let megaminx = new Megaminx(2);
  let megaminxNet = new MegaminxNet(2);

  megaminx.setColors(colors);
  megaminxNet.setColors(colors);

  return [megaminx, megaminxNet];
}

export function scrambledPyraminx(): [Pyraminx, PyraminxNet] {
  let pyraminxSim = new PyraminxSimulator();

  let scramble = [
    "B", "U", "R", "L", "R'", "U'", "B'", "L", "B'", "u'", "l'", "r"
  ]

  let pyraminxFaceColors = {
    left: BLUE,
    top: YELLOW,
    right: GREEN,
    back: RED
  }

  scramble.forEach(move => {
    switch (move) {
      case "B": pyraminxSim.B(); break;
      case "U": pyraminxSim.U(); break;
      case "R": pyraminxSim.R(); break;
      case "L": pyraminxSim.L(); break;
      case "B'": pyraminxSim.B(true); break;
      case "U'": pyraminxSim.U(true); break;
      case "R'": pyraminxSim.R(true); break;
      case "L'": pyraminxSim.L(true); break;
      case "u": pyraminxSim.u(); break;
      case "r": pyraminxSim.r(); break;
      case "l": pyraminxSim.l(); break;
      case "b": pyraminxSim.b(); break;
      case "u'": pyraminxSim.u(true); break;
      case "r'": pyraminxSim.r(true); break;
      case "l'": pyraminxSim.l(true); break;
      case "b'": pyraminxSim.b(true); break;
    }
  });

  let {top, left, right, back} = pyraminxSim.getValues();
  const colors = [...left, ...right, ...top, ...back].map(face => pyraminxFaceColors[face]);

  let pyraminx = new Pyraminx(3);
  let pyraminxNet = new PyraminxNet(3);

  pyraminx.setColors(colors);
  pyraminxNet.setColors(colors);

  return [pyraminx, pyraminxNet];
}

export function scrambledSkewb(): [Skewb, SkewbNet] {
  let skewbSim = new SkewbSimulator();

  let scramble = [
    "L", "R'","B'","U","L",
    "B","U","R'","L","U",
    "R'","B","L","R'","U",
    "L","U","L'","U'","L'",
    "U'","B'","R","U'","R"
  ];

  scramble.forEach(move => {
    switch (move) {
      case "B": skewbSim.B(); break;
      case "U": skewbSim.U(); break;
      case "R": skewbSim.R(); break;
      case "L": skewbSim.L(); break;
      case "B'": skewbSim.B(true); break;
      case "U'": skewbSim.U(true); break;
      case "R'": skewbSim.R(true); break;
      case "L'": skewbSim.L(true); break;
    }
  });

  let skewbFaceColors = {
    top: YELLOW,
    right: RED,
    front: BLUE,
    bottom: WHITE,
    left: ORANGE,
    back: GREEN,
  }

  let {top, left, right, back, bottom, front} = skewbSim.getValues();

  const colors = [...top, ...right, ...front, ...bottom, ...left, ...back].map(face => skewbFaceColors[face]);

  let skewb = new Skewb();
  let skewbNet = new SkewbNet();

  skewb.setColors(colors);
  skewbNet.setColors(colors);

  return [skewb, skewbNet];
}

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

  square1Sim.alg(alg);

  return [
    new Square1(1.25, square1Sim.topLayer, square1Sim.bottomLayer, square1Sim.middleRotated),
    new Square1Net(.7, square1Sim.topLayer, square1Sim.bottomLayer, square1Sim.middleRotated)
  ];
}