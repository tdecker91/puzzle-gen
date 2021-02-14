import { SVGVisualizerOptions } from './../../visualizer/svg';
import { VisualizerType } from './../../visualizer/enum';
import { PNG, PNGVisualizerOptions } from '../../visualizer/png';

function renderDefault() {
  const options: SVGVisualizerOptions = {
    width: 250,
    height: 250,
    puzzle: {
      scale: 1,
      translation: { x: 0, y: 0, z: 0 }
    }
  }
  PNG("#cube", VisualizerType.CUBE, options);
  PNG("#megaminx", VisualizerType.MEGAMINX, options);
  PNG("#pyraminx", VisualizerType.PYRAMINX, options);
  PNG("#skewb", VisualizerType.SKEWB, options);
  PNG("#square1", VisualizerType.SQUARE1, options);
  PNG("#cube-net", VisualizerType.CUBE_NET, options);
  PNG("#megaminx-net", VisualizerType.MEGAMINX_NET, options);
  PNG("#pyraminx-net", VisualizerType.PYRAMINX_NET, options);
  PNG("#skewb-net", VisualizerType.SKEWB_NET, options);
  PNG("#square1-net", VisualizerType.SQUARE1_NET, options);
  PNG("#cube-top", VisualizerType.CUBE_TOP, options);
  PNG("#mega-top", VisualizerType.MEGAMINX_TOP, options);
}

function renderScrambled() {
  const options: SVGVisualizerOptions = {
    width: 250,
    height: 250,
  };

  const cubeAlg = "F' D U F F L L D D B F L' U' F F R R F' D' B F' D D U R R F F U U B R' B B"
  const megaminxAlg = [
    'R++', 'D++','R++','D--','R--','D++','R--','D++', 'R--','D++','U',
    'D++','R--','D++','R++','D++','R--','D--','R--','D--','R--','U',
    'R--','D--','R++','D++','R++','D--','R--','D--','R++','D--','U\'',
    'R--','D++','R--','D--','R++','D--','R++','D++','R--','D++','U\''
  ].join(' ');

  const pyraminxAlg = [
    "B", "U", "R", "L", "R'", "U'", "B'", "L", "B'", "u'", "l'", "r"
  ].join(' ');

  const skewbAlg = [
    "L", "R'","B'","U","L",
    "B","U","R'","L","U",
    "R'","B","L","R'","U",
    "L","U","L'","U'","L'",
    "U'","B'","R","U'","R"
  ].join(' ');

  const square1Alg = "(-2,3)/(3,-1)/(3,-3)/(6,6)/(6,0)/(-2,-1)/(-4,-2)/(0,-3)/(0,-4)/(-4,5)/(-5,-2)/(2,-5)/(6,-4)/(-3,6)/(-2,2)/(3,-5)/";

  PNG("#cube-scrambled", VisualizerType.CUBE, {...options, puzzle: { alg: cubeAlg }});
  PNG("#cube-net-scrambled", VisualizerType.CUBE_NET, {...options, puzzle: { alg: cubeAlg }});
  PNG("#cube-top-scrambled", VisualizerType.CUBE_TOP, {...options, puzzle: { alg: cubeAlg }});
  PNG("#megaminx-scrambled", VisualizerType.MEGAMINX, {...options, puzzle: { alg: megaminxAlg }});
  PNG("#megaminx-net-scrambled", VisualizerType.MEGAMINX_NET, {...options, puzzle: { alg: megaminxAlg }});
  PNG("#pyraminx-scrambled", VisualizerType.PYRAMINX, {...options, puzzle: { alg: pyraminxAlg }});
  PNG("#pyraminx-net-scrambled", VisualizerType.PYRAMINX_NET, {...options, puzzle: { alg: pyraminxAlg }});
  PNG("#skewb-scrambled", VisualizerType.SKEWB, {...options, puzzle: { alg: skewbAlg }});
  PNG("#skewb-net-scrambled", VisualizerType.SKEWB_NET, {...options, puzzle: { alg: skewbAlg }});
  PNG("#square1-scrambled", VisualizerType.SQUARE1, {...options, puzzle: { alg: square1Alg }});
  PNG("#square1-net-scrambled", VisualizerType.SQUARE1_NET, {...options, puzzle: { alg: square1Alg }});
  PNG("#mega-top-scrambled", VisualizerType.MEGAMINX_TOP, {...options, puzzle: { alg: megaminxAlg }});
}

document.addEventListener('DOMContentLoaded', function (event) {
  console.time('Default Renders');
  renderDefault();
  console.timeEnd('Default Renders');

  console.time('Scrambled Renders');
  renderScrambled();
  console.timeEnd('Scrambled Renders');
});
