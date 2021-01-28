import { SVGVisualizerOptions } from './../../visualizer/svg';
import { VisualizerType } from './../../visualizer/enum';
import { Visualizer } from './../../visualizer/visualizer';
import { Square1Net } from './../../puzzles/square1/square1Net';
import { SkewbNet } from './../../puzzles/skewbNet';
import { PyraminxNet } from './../../puzzles/pyraminxNet';
import { MegaminxNet } from './../../puzzles/megaminxNet';
import { RubiksCubeNet } from './../../puzzles/rubiksCube/rubiksCubeNet';
import { Square1 } from './../../puzzles/square1/square1';
import { Skewb } from './../../puzzles/skewb';
import { Pyraminx } from './../../puzzles/pyraminx';
import { Megaminx } from './../../puzzles/megaminx';
import { RubiksCube } from './../../puzzles/rubiksCube/rubiksCube';
import { CustomSVGRenderer } from './../../rendering/customSvgRenderer';
import { Camera } from './../../rendering/camera';
import { Scene } from '../../rendering/scene';
import { Group } from '../../geometry/group';
import { scrambledCube, scrambledMegaminx, scrambledPyraminx, scrambledSkewb, scrambledSquare1 } from './scrambled';
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
  const [cube, cubeNet] = scrambledCube();
  const [megaminx, megaminxNet] = scrambledMegaminx();
  const [pyraminx, pyraminxNet] = scrambledPyraminx();
  const [skewb, skewbNet] = scrambledSkewb();
  const [square1, square1Net] = scrambledSquare1();

  renderGroup('cube-scrambled', cube.group);
  renderGroup('megaminx-scrambled', megaminx.group);
  renderGroup('pyraminx-scrambled', pyraminx.group);
  renderGroup('skewb-scrambled', skewb.group);
  renderGroup('square1-scrambled', square1.group);
  renderGroup('cube-net-scrambled', cubeNet.group);
  renderGroup('megaminx-net-scrambled', megaminxNet.group);
  renderGroup('pyraminx-net-scrambled', pyraminxNet.group);
  renderGroup('skewb-net-scrambled', skewbNet.group);
  renderGroup('square1-net-scrambled', square1Net.group);
  console.timeEnd('Scrambled Renders');
});
