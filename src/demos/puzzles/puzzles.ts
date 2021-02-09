import { CubeOptions } from './../../../dist/lib/visualizer/interface.d';
import { SVGVisualizerOptions } from './../../visualizer/svg';
import { VisualizerType } from './../../visualizer/enum';
import { SVG } from '../../visualizer/svg';

function renderDefault() {
  const options: SVGVisualizerOptions<any> = {
    width: 250,
    height: 250,
    puzzle: {
      scale: 1,
      translation: { x: 0, y: 0, z: 0 }
    }
  }
  SVG("#cube", VisualizerType.CUBE, options);
  SVG("#megaminx", VisualizerType.MEGAMINX, options);
  SVG("#pyraminx", VisualizerType.PYRAMINX, options);
  SVG("#skewb", VisualizerType.SKEWB, options);
  SVG("#square1", VisualizerType.SQUARE1, options);
  SVG("#cube-net", VisualizerType.CUBE_NET, options);
  SVG("#megaminx-net", VisualizerType.MEGAMINX_NET, options);
  SVG("#pyraminx-net", VisualizerType.PYRAMINX_NET, options);
  SVG("#skewb-net", VisualizerType.SKEWB_NET, options);
  SVG("#square1-net", VisualizerType.SQUARE1_NET, options);
  SVG("#cube-top", VisualizerType.CUBE_TOP, options);
}

function renderScrambled() {
  const options: SVGVisualizerOptions<CubeOptions> = {
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

  SVG("#cube-scrambled", VisualizerType.CUBE, {...options, puzzle: { alg: cubeAlg }});
  SVG("#cube-net-scrambled", VisualizerType.CUBE_NET, {...options, puzzle: { alg: cubeAlg }});
  SVG("#cube-top-scrambled", VisualizerType.CUBE_TOP, {...options, puzzle: { alg: cubeAlg }});
  SVG("#megaminx-scrambled", VisualizerType.MEGAMINX, {...options, puzzle: { alg: megaminxAlg }});
  SVG("#megaminx-net-scrambled", VisualizerType.MEGAMINX_NET, {...options, puzzle: { alg: megaminxAlg }});
  SVG("#pyraminx-scrambled", VisualizerType.PYRAMINX, {...options, puzzle: { alg: pyraminxAlg }});
  SVG("#pyraminx-net-scrambled", VisualizerType.PYRAMINX_NET, {...options, puzzle: { alg: pyraminxAlg }});
  SVG("#skewb-scrambled", VisualizerType.SKEWB, {...options, puzzle: { alg: skewbAlg }});
  SVG("#skewb-net-scrambled", VisualizerType.SKEWB_NET, {...options, puzzle: { alg: skewbAlg }});
  SVG("#square1-scrambled", VisualizerType.SQUARE1, {...options, puzzle: { alg: square1Alg }});
  SVG("#square1-net-scrambled", VisualizerType.SQUARE1_NET, {...options, puzzle: { alg: square1Alg }});
}

document.addEventListener('DOMContentLoaded', function (event) {
  console.time('Default Renders');
  renderDefault();
  console.timeEnd('Default Renders');

  console.time('Scrambled Renders');
  renderScrambled();
  console.timeEnd('Scrambled Renders');
});
