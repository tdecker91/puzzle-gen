import { RubiksCubeSimulator } from './../../../src/simulator/rubiksCube/rubiksCubeSimulator';
describe('Scramble', () => {
  it('scrambles 3x3 correctly', () => {
    const cubeSim = new RubiksCubeSimulator(3);

    cubeSim.U();
    cubeSim.L(true);
    cubeSim.U(true);
    cubeSim.B();
    cubeSim.F();
    cubeSim.F();
    cubeSim.D();
    cubeSim.B();
    cubeSim.B();
    cubeSim.L();
    cubeSim.L();
    cubeSim.F();
    cubeSim.R();
    cubeSim.R();

    expect(cubeSim.getValues()).toEqual(
      { 
        U: [ 'L', 'D', 'L', 'F', 'U', 'F', 'F', 'D', 'R' ],
        R: [ 'U', 'L', 'B', 'U', 'R', 'D', 'U', 'R', 'R' ],
        F: [ 'U', 'B', 'B', 'L', 'F', 'B', 'D', 'D', 'L' ],
        D: [ 'L', 'L', 'F', 'U', 'D', 'U', 'D', 'R', 'D' ],
        L: [ 'B', 'U', 'R', 'R', 'L', 'B', 'R', 'L', 'F' ],
        B: [ 'D', 'R', 'U', 'F', 'B', 'F', 'B', 'B', 'F' ] 
      }
    )

    // Reversing correctly solves the cube
    cubeSim.R(true);
    cubeSim.R(true);
    cubeSim.F(true);
    cubeSim.L(true);
    cubeSim.L(true);
    cubeSim.B(true);
    cubeSim.B(true);
    cubeSim.D(true);
    cubeSim.F(true);
    cubeSim.F(true);
    cubeSim.B(true);
    cubeSim.U(false);
    cubeSim.L(false);
    cubeSim.U(true);

    expect(cubeSim.isSolved()).toBeTruthy();

  });
});

describe('Slice Moves', () => {
  it('performs an M move', () => {
    let cubeSim = new RubiksCubeSimulator(2);
    cubeSim.M();
    expect(cubeSim.isSolved()).toBeTruthy();

    cubeSim = new RubiksCubeSimulator(3);

    cubeSim.M();

    expect(cubeSim.getValues()).toEqual(
      { U: [ 'U', 'B', 'U', 'U', 'B', 'U', 'U', 'B', 'U' ],
        R: [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
        F: [ 'F', 'U', 'F', 'F', 'U', 'F', 'F', 'U', 'F' ],
        D: [ 'D', 'F', 'D', 'D', 'F', 'D', 'D', 'F', 'D' ],
        L: [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L' ],
        B: [ 'B', 'D', 'B', 'B', 'D', 'B', 'B', 'D', 'B' ] }
    );

    cubeSim.M(true);
    expect(cubeSim.isSolved()).toBeTruthy();

    // Check large even cubes
    cubeSim = new RubiksCubeSimulator(6);

    cubeSim.M();

    expect(cubeSim.getValues()).toEqual(
      { U:
        [ 'U', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'U' ],
       R:
        [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
       F:
        [ 'F', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'F' ],
       D:
        [ 'D', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'D' ],
       L:
        [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L' ],
       B:
        [ 'B', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'B' ] }
    );

    // Check large odd cubes
    cubeSim = new RubiksCubeSimulator(7);

    cubeSim.M();

    expect(cubeSim.getValues()).toEqual(
      { U:
        [ 'U', 'B', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'U' ],
       R:
        [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
       F:
        [ 'F', 'U', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'U', 'F', 'F', 'U', 'U', 'U', 'U', 'U', 'F' ],
       D:
        [ 'D', 'F', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'F', 'D', 'D', 'F', 'F', 'F', 'F', 'F', 'D' ],
       L:
        [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L' ],
       B:
        [ 'B', 'D', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'D', 'B', 'B', 'D', 'D', 'D', 'D', 'D', 'B' ] }
    );
  });

  it('performs an S move', () => {
    let cubeSim = new RubiksCubeSimulator(2);
    cubeSim.S();
    expect(cubeSim.isSolved()).toBeTruthy();

    cubeSim = new RubiksCubeSimulator(3);

    cubeSim.S();

    expect(cubeSim.getValues()).toEqual(
      { U: [ 'U', 'U', 'U', 'L', 'L', 'L', 'U', 'U', 'U' ],
        R: [ 'R', 'U', 'R', 'R', 'U', 'R', 'R', 'U', 'R' ],
        F: [ 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F' ],
        D: [ 'D', 'D', 'D', 'R', 'R', 'R', 'D', 'D', 'D' ],
        L: [ 'L', 'D', 'L', 'L', 'D', 'L', 'L', 'D', 'L' ],
        B: [ 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B' ] }
    );

    cubeSim = new RubiksCubeSimulator(6);
    cubeSim.S();

    expect(cubeSim.getValues()).toEqual(
      { U:
        [ 'U', 'U', 'U', 'U', 'U', 'U', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'U', 'U', 'U', 'U', 'U', 'U' ],
       R:
        [ 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'R' ],
       F:
        [ 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F' ],
       D:
        [ 'D', 'D', 'D', 'D', 'D', 'D', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'D', 'D', 'D', 'D', 'D', 'D' ],
       L:
        [ 'L', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'L' ],
       B:
        [ 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B' ] }
    );

    cubeSim = new RubiksCubeSimulator(7);
    cubeSim.S();

    expect(cubeSim.getValues()).toEqual(
      { U:
        [ 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'U', 'U', 'U', 'U', 'U', 'U', 'U' ],
       R:
        [ 'R', 'U', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'U', 'R' ],
       F:
        [ 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F' ],
       D:
        [ 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'D', 'D', 'D', 'D', 'D', 'D', 'D' ],
       L:
        [ 'L', 'D', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'L' ],
       B:
        [ 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B' ] }
    );
  });

  it('performs an E move', () => {
    let cubeSim = new RubiksCubeSimulator(2);
    cubeSim.E();
    expect(cubeSim.isSolved()).toBeTruthy();

    cubeSim = new RubiksCubeSimulator(3);

    cubeSim.E();

    expect(cubeSim.getValues()).toEqual(
      { U: [ 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U' ],
        R: [ 'R', 'R', 'R', 'F', 'F', 'F', 'R', 'R', 'R' ],
        F: [ 'F', 'F', 'F', 'L', 'L', 'L', 'F', 'F', 'F' ],
        D: [ 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D' ],
        L: [ 'L', 'L', 'L', 'B', 'B', 'B', 'L', 'L', 'L' ],
        B: [ 'B', 'B', 'B', 'R', 'R', 'R', 'B', 'B', 'B' ] }
    );

    cubeSim = new RubiksCubeSimulator(6);
    cubeSim.E();

    expect(cubeSim.getValues()).toEqual(
      { U:
        [ 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U' ],
       R:
        [ 'R', 'R', 'R', 'R', 'R', 'R', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'R', 'R', 'R', 'R', 'R', 'R' ],
       F:
        [ 'F', 'F', 'F', 'F', 'F', 'F', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'F', 'F', 'F', 'F', 'F', 'F' ],
       D:
        [ 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D' ],
       L:
        [ 'L', 'L', 'L', 'L', 'L', 'L', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'L', 'L', 'L', 'L', 'L', 'L' ],
       B:
        [ 'B', 'B', 'B', 'B', 'B', 'B', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'B', 'B', 'B', 'B', 'B', 'B' ] }
    );

    cubeSim = new RubiksCubeSimulator(7);
    cubeSim.E();

    expect(cubeSim.getValues()).toEqual(
      { U:
        [ 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U' ],
       R:
        [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
       F:
        [ 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'F', 'F', 'F', 'F', 'F', 'F', 'F' ],
       D:
        [ 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D' ],
       L:
        [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'L', 'L', 'L', 'L', 'L', 'L', 'L' ],
       B:
        [ 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'B', 'B', 'B', 'B', 'B', 'B', 'B' ] }
    );
  })
});

describe('Rotation moves', () => {
  it('performs an X rotation', () => {
    let cubeSim = new RubiksCubeSimulator(3);
    cubeSim.X();

    expect(cubeSim.getValues()).toEqual({
        U: [ 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F' ],
        R: [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
        F: [ 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D' ],
        D: [ 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B' ],
        L: [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L' ],
        B: [ 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U' ] 
    });

    cubeSim.X(true);
    cubeSim.D();
    cubeSim.X();

    expect(cubeSim.getValues()).toEqual({
      U: [ 'F', 'F', 'F', 'F', 'F', 'F', 'L', 'L', 'L' ],
      R: [ 'F', 'R', 'R', 'F', 'R', 'R', 'F', 'R', 'R' ],
      F: [ 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D' ],
      D: [ 'R', 'R', 'R', 'B', 'B', 'B', 'B', 'B', 'B' ],
      L: [ 'L', 'L', 'B', 'L', 'L', 'B', 'L', 'L', 'B' ],
      B: [ 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U' ] 
    });
  });

  it('performs a Y rotation', () => {
    let cubeSim = new RubiksCubeSimulator(3);
    cubeSim.Y();

    expect(cubeSim.getValues()).toEqual({
        U: [ 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U' ],
        R: [ 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B' ],
        F: [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
        D: [ 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D' ],
        L: [ 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F' ],
        B: [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L' ] 
    });

    cubeSim.Y(true);
    cubeSim.R();
    cubeSim.Y();

    expect(cubeSim.getValues()).toEqual({
      U: [ 'U', 'U', 'U', 'U', 'U', 'U', 'F', 'F', 'F' ],
      R: [ 'U', 'B', 'B', 'U', 'B', 'B', 'U', 'B', 'B' ],
      F: [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      D: [ 'B', 'B', 'B', 'D', 'D', 'D', 'D', 'D', 'D' ],
      L: [ 'F', 'F', 'D', 'F', 'F', 'D', 'F', 'F', 'D' ],
      B: [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L' ] 
    });
  });

  it('performs a Z rotation', () => {
    let cubeSim = new RubiksCubeSimulator(3);

    cubeSim.R();
    cubeSim.D();
    cubeSim.Z();

    expect(cubeSim.getValues()).toEqual({
      U: [ 'U', 'L', 'L', 'B', 'L', 'L', 'B', 'L', 'L' ],
      R: [ 'U', 'U', 'U', 'U', 'U', 'U', 'F', 'F', 'F' ],
      F: [ 'L', 'F', 'F', 'L', 'F', 'F', 'L', 'D', 'D' ],
      D: [ 'F', 'R', 'R', 'F', 'R', 'R', 'D', 'R', 'R' ],
      L: [ 'B', 'D', 'D', 'B', 'D', 'D', 'B', 'D', 'D' ],
      B: [ 'B', 'B', 'R', 'B', 'B', 'R', 'U', 'U', 'R' ] 
    });
  });
});