import { MegaminxSimulator } from "./../../../src/simulator/megaminx/megaminxSimulator";

describe("Moves", () => {
  it("does U turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("R");

    megaSim.doTurn("U");
    megaSim.doTurn("U");
    megaSim.doTurn("U");
    megaSim.doTurn("U");
    megaSim.doTurn("U");

    megaSim.doTurn("U", true);
    megaSim.doTurn("U", true);
    megaSim.doTurn("U", true);
    megaSim.doTurn("U", true);
    megaSim.doTurn("U", true);

    megaSim.doTurn("R", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does F turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("U");

    megaSim.doTurn("F");
    megaSim.doTurn("F");
    megaSim.doTurn("F");
    megaSim.doTurn("F");
    megaSim.doTurn("F");

    megaSim.doTurn("F", true);
    megaSim.doTurn("F", true);
    megaSim.doTurn("F", true);
    megaSim.doTurn("F", true);
    megaSim.doTurn("F", true);

    megaSim.doTurn("U", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does R turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("U");

    megaSim.doTurn("R");
    megaSim.doTurn("R");
    megaSim.doTurn("R");
    megaSim.doTurn("R");
    megaSim.doTurn("R");

    megaSim.doTurn("R", true);
    megaSim.doTurn("R", true);
    megaSim.doTurn("R", true);
    megaSim.doTurn("R", true);
    megaSim.doTurn("R", true);

    megaSim.doTurn("U", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does L turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("U");

    megaSim.doTurn("L");
    megaSim.doTurn("L");
    megaSim.doTurn("L");
    megaSim.doTurn("L");
    megaSim.doTurn("L");

    megaSim.doTurn("L", true);
    megaSim.doTurn("L", true);
    megaSim.doTurn("L", true);
    megaSim.doTurn("L", true);
    megaSim.doTurn("L", true);

    megaSim.doTurn("U", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does BL turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("U");

    megaSim.doTurn("BL");
    megaSim.doTurn("BL");
    megaSim.doTurn("BL");
    megaSim.doTurn("BL");
    megaSim.doTurn("BL");

    megaSim.doTurn("BL", true);
    megaSim.doTurn("BL", true);
    megaSim.doTurn("BL", true);
    megaSim.doTurn("BL", true);
    megaSim.doTurn("BL", true);

    megaSim.doTurn("U", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does BR turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("U");

    megaSim.doTurn("BR");
    megaSim.doTurn("BR");
    megaSim.doTurn("BR");
    megaSim.doTurn("BR");
    megaSim.doTurn("BR");

    megaSim.doTurn("BR", true);
    megaSim.doTurn("BR", true);
    megaSim.doTurn("BR", true);
    megaSim.doTurn("BR", true);
    megaSim.doTurn("BR", true);

    megaSim.doTurn("U", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does d turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("dr");

    megaSim.doTurn("d");
    megaSim.doTurn("d");
    megaSim.doTurn("d");
    megaSim.doTurn("d");
    megaSim.doTurn("d");

    megaSim.doTurn("d", true);
    megaSim.doTurn("d", true);
    megaSim.doTurn("d", true);
    megaSim.doTurn("d", true);
    megaSim.doTurn("d", true);

    megaSim.doTurn("dr", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does dr turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("d");

    megaSim.doTurn("dr");
    megaSim.doTurn("dr");
    megaSim.doTurn("dr");
    megaSim.doTurn("dr");
    megaSim.doTurn("dr");

    megaSim.doTurn("dr", true);
    megaSim.doTurn("dr", true);
    megaSim.doTurn("dr", true);
    megaSim.doTurn("dr", true);
    megaSim.doTurn("dr", true);

    megaSim.doTurn("d", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does dl turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("d");

    megaSim.doTurn("dl");
    megaSim.doTurn("dl");
    megaSim.doTurn("dl");
    megaSim.doTurn("dl");
    megaSim.doTurn("dl");

    megaSim.doTurn("dl", true);
    megaSim.doTurn("dl", true);
    megaSim.doTurn("dl", true);
    megaSim.doTurn("dl", true);
    megaSim.doTurn("dl", true);

    megaSim.doTurn("d", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does b turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("d");

    megaSim.doTurn("b");
    megaSim.doTurn("b");
    megaSim.doTurn("b");
    megaSim.doTurn("b");
    megaSim.doTurn("b");

    megaSim.doTurn("b", true);
    megaSim.doTurn("b", true);
    megaSim.doTurn("b", true);
    megaSim.doTurn("b", true);
    megaSim.doTurn("b", true);

    megaSim.doTurn("d", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does bl turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("d");

    megaSim.doTurn("bl");
    megaSim.doTurn("bl");
    megaSim.doTurn("bl");
    megaSim.doTurn("bl");
    megaSim.doTurn("bl");

    megaSim.doTurn("bl", true);
    megaSim.doTurn("bl", true);
    megaSim.doTurn("bl", true);
    megaSim.doTurn("bl", true);
    megaSim.doTurn("bl", true);

    megaSim.doTurn("d", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does br turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("d");

    megaSim.doTurn("br");
    megaSim.doTurn("br");
    megaSim.doTurn("br");
    megaSim.doTurn("br");
    megaSim.doTurn("br");

    megaSim.doTurn("br", true);
    megaSim.doTurn("br", true);
    megaSim.doTurn("br", true);
    megaSim.doTurn("br", true);
    megaSim.doTurn("br", true);

    megaSim.doTurn("d", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does D++ turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("R");
    megaSim.doTurn("bl");

    megaSim.doTurn("D++");
    megaSim.doTurn("D++");
    megaSim.doTurn("D++");
    megaSim.doTurn("D++");
    megaSim.doTurn("D++");

    megaSim.doTurn("D++", true);
    megaSim.doTurn("D++", true);
    megaSim.doTurn("D++", true);
    megaSim.doTurn("D++", true);
    megaSim.doTurn("D++", true);

    megaSim.doTurn("bl", true);
    megaSim.doTurn("R", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("does R++ turn", () => {
    let megaSim = new MegaminxSimulator();
    megaSim.doTurn("R");
    megaSim.doTurn("bl");

    megaSim.doTurn("R++");
    megaSim.doTurn("R++");
    megaSim.doTurn("R++");
    megaSim.doTurn("R++");
    megaSim.doTurn("R++");

    megaSim.doTurn("R++", true);
    megaSim.doTurn("R++", true);
    megaSim.doTurn("R++", true);
    megaSim.doTurn("R++", true);
    megaSim.doTurn("R++", true);

    megaSim.doTurn("bl", true);
    megaSim.doTurn("R", true);

    expect(megaSim.isSolved()).toBeTruthy();
  });

  it("can fully scramble", () => {
    let megaSim = new MegaminxSimulator();

    megaSim.doTurn("U");
    megaSim.doTurn("R");
    megaSim.doTurn("F");
    megaSim.doTurn("dr");
    megaSim.doTurn("dl");
    megaSim.doTurn("L");
    megaSim.doTurn("U");

    megaSim.doTurn("d");
    megaSim.doTurn("br");
    megaSim.doTurn("BR");
    megaSim.doTurn("BL");
    megaSim.doTurn("bl");
    megaSim.doTurn("b");
    megaSim.doTurn("d");

    megaSim.doTurn("d", true);
    megaSim.doTurn("b", true);
    megaSim.doTurn("bl", true);
    megaSim.doTurn("BL", true);
    megaSim.doTurn("BR", true);
    megaSim.doTurn("br", true);
    megaSim.doTurn("d", true);
    megaSim.doTurn("U", true);
    megaSim.doTurn("L", true);
    megaSim.doTurn("dl", true);
    megaSim.doTurn("dr", true);
    megaSim.doTurn("F", true);
    megaSim.doTurn("R", true);
    megaSim.doTurn("U", true);

    // Test that executing a bunch of moves and then
    // executing the inverse will result in a solved state
    expect(megaSim.isSolved()).toBeTruthy();
  });
});


describe("Reset", () => {
  it("resets to solved state", () => {
    const megaSim = new MegaminxSimulator();
    megaSim.alg([
      "D-- R-- D++ R-- D-- R++ D++ R-- D-- R-- U",
      "R-- D++ R++ D++ R++ D-- R-- D-- R-- D-- U",
      "R-- D++ R-- D++ R++ D++ R-- D-- R-- D++ U'",
      "D-- R-- D++ R-- D++ R++ D++ R-- D-- R-- U'",
      "D-- R-- D++ R++ D++ R++ D++ R++ D++ R++ U",
      "R-- D++ R++ D-- R-- D-- R-- D++ R++ D++ U'",
      "D++ R++ D-- R++ D++ R++ D-- R++ D++ R-- U'"
    ].join(' '));

    expect(megaSim.isSolved()).toBeFalsy();
    megaSim.reset();
    
    expect(megaSim.isSolved()).toBeTruthy();
  });
});
