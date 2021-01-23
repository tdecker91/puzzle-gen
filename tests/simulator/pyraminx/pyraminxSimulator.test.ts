import { PyraminxSimulator } from './../../../src/simulator/pyraminx/pyraminxSimulator';

describe('Scramble', () => {
  // Scramble generated here
  // https://www.worldcubeassociation.org/regulations/history/files/scrambles/scramble_pyraminx.htm?col=gryb&len=25&num=5
  // used as oracle to test my simulator

  it('scrambles correctly', () => {
    const pyraminxSim = new PyraminxSimulator();
    pyraminxSim.doTurn('l', true);
    pyraminxSim.doTurn('r', true);
    pyraminxSim.doTurn('R', true);
    pyraminxSim.doTurn('U', true);
    pyraminxSim.doTurn('L', true);
    pyraminxSim.doTurn('B');
    pyraminxSim.doTurn('R', true);
    pyraminxSim.doTurn('B');
    pyraminxSim.doTurn('R', true);
    pyraminxSim.doTurn('U', true);
    pyraminxSim.doTurn('B', true);
    pyraminxSim.doTurn('U', true);
    pyraminxSim.doTurn('L');
    pyraminxSim.doTurn('R', true);
    pyraminxSim.doTurn('B', true);
    pyraminxSim.doTurn('L');
    pyraminxSim.doTurn('R', true);
    pyraminxSim.doTurn('B', true);
    pyraminxSim.doTurn('U', true);
    pyraminxSim.doTurn('L', true);
    pyraminxSim.doTurn('B', true);
    pyraminxSim.doTurn('U', false);
    pyraminxSim.doTurn('R');
    pyraminxSim.doTurn('U', false);
    pyraminxSim.doTurn('B');

    expect(pyraminxSim.getValues()).toEqual({
      top: ['back', 'back', 'back', 'top', 'left', 'top', 'left', 'top', 'left'],
      left: ['back', 'left', 'left', 'right', 'back', 'left', 'right', 'back', 'right'],
      right: ['left', 'back', 'top', 'top', 'top', 'right', 'top', 'back', 'top'],
      back: ['right', 'right', 'right', 'left', 'right', 'left', 'back', 'right', 'top']
    });

    // Reverse solves it
    pyraminxSim.doTurn('B', true);
    pyraminxSim.doTurn('U', true);
    pyraminxSim.doTurn('R', true);
    pyraminxSim.doTurn('U', true);
    pyraminxSim.doTurn('B', false);
    pyraminxSim.doTurn('L', false);
    pyraminxSim.doTurn('U', false);
    pyraminxSim.doTurn('B', false);
    pyraminxSim.doTurn('R', false);
    pyraminxSim.doTurn('L', true);
    pyraminxSim.doTurn('B', false);
    pyraminxSim.doTurn('R', false);
    pyraminxSim.doTurn('L', true);
    pyraminxSim.doTurn('U', false);
    pyraminxSim.doTurn('B', false);
    pyraminxSim.doTurn('U', false);
    pyraminxSim.doTurn('R', false);
    pyraminxSim.doTurn('B', true);
    pyraminxSim.doTurn('R', false);
    pyraminxSim.doTurn('B', true);
    pyraminxSim.doTurn('L', false);
    pyraminxSim.doTurn('U', false);
    pyraminxSim.doTurn('R', false);
    pyraminxSim.doTurn('r', false);
    pyraminxSim.doTurn('l', false);

    expect(pyraminxSim.isSolved()).toBeTruthy();

  });

})