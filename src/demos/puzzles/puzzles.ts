import { SVGVisualizerOptions } from './../../visualizer/svg';
import { VisualizerType } from './../../visualizer/enum';
import { CustomSVGRenderer } from './../../rendering/customSvgRenderer';
import { Camera } from './../../rendering/camera';
import { Scene } from '../../rendering/scene';
import { Group } from '../../geometry/group';
import { scrambledSquare1 } from './scrambled';
import { SVG } from '../../visualizer/svg';

const width: number = 250;
const height: number = 250;
const minx: number = -.9;
const miny: number = -.9;
const svgwidth: number = 1.8;
const svgheight: number = 1.8;
const strokeWidth: number = .02;

function renderGroup(elementId: string, group: Group) {
  let camera: Camera = new Camera();
  let scene = new Scene();
  let renderer = new CustomSVGRenderer(width, height, minx, miny, svgwidth, svgheight);
  renderer.strokeWidth = "" + strokeWidth;

  scene.add(group);

  document.getElementById(elementId).appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

function renderDefault() {
  const options: SVGVisualizerOptions<any> = {
    width: 250,
    height: 250
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
}

document.addEventListener('DOMContentLoaded', function (event) {
  console.time('Default Renders');
  renderDefault();
  console.timeEnd('Default Renders');

  console.time('Scrambled Renders');
  const [square1, square1Net] = scrambledSquare1();

  const options: SVGVisualizerOptions<any> = {
    width: 250,
    height: 250
  }
  let alg: string = "F' D U F F L L D D B F L' U' F F R R F' D' B F' D D U R R F F U U B R' B B"
  SVG("#cube-scrambled", VisualizerType.CUBE, {...options, puzzle: { alg }});
  SVG("#cube-net-scrambled", VisualizerType.CUBE_NET, {...options, puzzle: { alg }});

  alg = [
    'R++','D++','R++','D--','R--','D++','R--','D++', 'R--','D++','U',
    'D++','R--','D++','R++','D++','R--','D--','R--','D--','R--','U',
    'R--','D--','R++','D++','R++','D--','R--','D--','R++','D--','U\'',
    'R--','D++','R--','D--','R++','D--','R++','D++','R--','D++','U\''
  ].join(' ');
  SVG("#megaminx-scrambled", VisualizerType.MEGAMINX, {...options, puzzle: { alg }});
  SVG("#megaminx-net-scrambled", VisualizerType.MEGAMINX_NET, {...options, puzzle: { alg }});

  alg = [
    "B", "U", "R", "L", "R'", "U'", "B'", "L", "B'", "u'", "l'", "r"
  ].join(' ');
  
  SVG("#pyraminx-scrambled", VisualizerType.PYRAMINX, {...options, puzzle: { alg }})
  SVG("#pyraminx-net-scrambled", VisualizerType.PYRAMINX_NET, {...options, puzzle: { alg }})
  
  alg = [
    "L", "R'","B'","U","L",
    "B","U","R'","L","U",
    "R'","B","L","R'","U",
    "L","U","L'","U'","L'",
    "U'","B'","R","U'","R"
  ].join(' ')
  SVG("#skewb-scrambled2", VisualizerType.SKEWB, {...options, puzzle: { alg }})
  SVG("#skewb-net-scrambled2", VisualizerType.SKEWB_NET, {...options, puzzle: { alg }})
  
  renderGroup('square1-scrambled', square1.group);
  renderGroup('square1-net-scrambled', square1Net.group);
  console.timeEnd('Scrambled Renders');
});
