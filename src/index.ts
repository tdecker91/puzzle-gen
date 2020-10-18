import { Square1Simualtor } from './simulator/square1/square1Simulator';
import { WHITE, BLUE, RED, PINK, LIGHT_GREEN, LIGHT_YELLOW, GREEN, GREY, PURPLE, DARK_BLUE, ORANGE, YELLOW } from './puzzles/colors';
import { MegaminxSimulator } from './simulator/megaminx/megaminxSimulator';
import { Group } from './geometry/group';
import { RubiksCubeTopLayer } from './puzzles/rubiksCube/rubiksCubeTop';
import { RubiksCubeNet } from './puzzles/rubiksCube/rubiksCubeNet';
import { Square1Net } from './puzzles/square1/square1Net';
import { MegaminxNet } from './puzzles/megaminxNet';
import { PyraminxNet } from './puzzles/pyraminxNet';
import { Pyraminx } from './puzzles/pyraminx';
import { Megaminx } from './puzzles/megaminx';
import { mat4 } from 'gl-matrix';
import { Camera } from './rendering/camera';
import { Scene } from './rendering/scene';
import { RubiksCube } from './puzzles/rubiksCube/rubiksCube';
import { CustomSVGRenderer } from './rendering/customSvgRenderer';
import { Skewb } from './puzzles/skewb';
import { SkewbNet } from './puzzles/skewbNet';
import { Square1 } from './puzzles/square1/square1';


let camera: Camera = new Camera();
let g: Group;
let rubiksCube: RubiksCube;
let cubeNet: RubiksCubeNet;
let cubeTop: RubiksCubeTopLayer;
let skewb: Skewb;
let skewbNet: SkewbNet;
let megaminx: Megaminx;
let pyraminx: Pyraminx;
let pyraminxNet: PyraminxNet;
let megaminxNet: MegaminxNet;
let square1: Square1;
let square1Net: Square1Net;

let renderer: CustomSVGRenderer;
let scene;

let megaSim = new MegaminxSimulator();
megaSim.doTurn('R');
megaSim.doTurn('R-0');
console.log(megaSim.getValues());

let width: number = 500;
let height: number = 500;
let minx: number = -.9;
let miny: number = -.9;
let svgwidth: number = 1.8;
let svgheight: number = 1.8;
let planewidth: number = 1;
let strokeWidth: number = .02;

function setInputs() {
  if (camera && camera.matrix) {
    camera.matrix.forEach((value, index) => {
      (<any>document.getElementById(`c${index + 1}`)).value = value;
    });
  }

  (<any>document.getElementById(`width`)).value = width;
  (<any>document.getElementById(`height`)).value = height;
  (<any>document.getElementById(`minx`)).value = minx;
  (<any>document.getElementById(`miny`)).value = miny;
  (<any>document.getElementById(`svgw`)).value = svgwidth;
  (<any>document.getElementById(`svgh`)).value = svgheight;
  (<any>document.getElementById(`pw`)).value = planewidth;
  (<any>document.getElementById(`sw`)).value = strokeWidth;

}

export function getInputs() {

  let m1 = parseFloat((<any>document.getElementById(`c1`)).value);
  let m2 = parseFloat((<any>document.getElementById(`c2`)).value);
  let m3 = parseFloat((<any>document.getElementById(`c3`)).value);
  let m4 = parseFloat((<any>document.getElementById(`c4`)).value);
  let m5 = parseFloat((<any>document.getElementById(`c5`)).value);
  let m6 = parseFloat((<any>document.getElementById(`c6`)).value);
  let m7 = parseFloat((<any>document.getElementById(`c7`)).value);
  let m8 = parseFloat((<any>document.getElementById(`c8`)).value);
  let m9 = parseFloat((<any>document.getElementById(`c9`)).value);
  let m10 = parseFloat((<any>document.getElementById(`c10`)).value);
  let m11 = parseFloat((<any>document.getElementById(`c11`)).value);
  let m12 = parseFloat((<any>document.getElementById(`c12`)).value);
  let m13 = parseFloat((<any>document.getElementById(`c13`)).value);
  let m14 = parseFloat((<any>document.getElementById(`c14`)).value);
  let m15 = parseFloat((<any>document.getElementById(`c15`)).value);
  let m16 = parseFloat((<any>document.getElementById(`c16`)).value);

  camera.matrix = mat4.fromValues(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16)

  width = parseFloat((<any>document.getElementById(`width`)).value);
  height = parseFloat((<any>document.getElementById(`height`)).value);
  minx = parseFloat((<any>document.getElementById(`minx`)).value);
  miny = parseFloat((<any>document.getElementById(`miny`)).value);
  svgwidth = parseFloat((<any>document.getElementById(`svgw`)).value);
  svgheight = parseFloat((<any>document.getElementById(`svgh`)).value);
  planewidth = parseFloat((<any>document.getElementById(`pw`)).value);
  strokeWidth = parseFloat((<any>document.getElementById(`sw`)).value);

}

export function renderDemo() {

  scene = new Scene();
  renderer = new CustomSVGRenderer(width, height, minx, miny, svgwidth, svgheight);
  renderer.strokeWidth = "" + strokeWidth;

  // rubiksCube = new RubiksCube(3);
  // scene.add(rubiksCube.group);

  // cubeTop = new RubiksCubeTopLayer(3);
  // scene.add(cubeTop.group);

  // cubeNet = new RubiksCubeNet(3);
  // scene.add(cubeNet.group);
  
  // skewbNet = new SkewbNet();
  // scene.add(skewbNet.group);

  // skewb = new Skewb();
  // scene.add(skewb.group);

  // pyraminx = new Pyraminx(3);
  // scene.add(pyraminx.group);

  // pyraminxNet = new PyraminxNet(3);
  // scene.add(pyraminxNet.group);

  megaminx = new Megaminx(2);
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
  let {U, R, F, dr, dl, L, d, br, BR, BL, b} = megaSim.getValues();
  megaminx.setColors([...U, ...R, ...F, ...dr, ...dl, ...L, ...d, ...br, ...BR, ...BL, ...b].map(face => megaminxFaceColors[face]));
  scene.add(megaminx.group);

  // megaminxNet = new MegaminxNet(2);
  // scene.add(megaminxNet.group);

  // square1 = new Square1();
  // scene.add(square1.group);

  // square1Net = new Square1Net();
  // scene.add(square1Net.group);

  scene.add(g);
  document.getElementById('idsomething').appendChild(renderer.domElement);
  renderer.render(scene, camera);

  setInputs();
}

document.addEventListener("DOMContentLoaded", function (event) {
  renderDemo();
});

export function svgStep() {
  // mat4.translate(camera.matrix, camera.matrix, [0,0,-.5]);
  [
    skewb,
    skewbNet,
    rubiksCube,
    cubeNet,
    megaminx,
    megaminxNet,
    pyraminx,
    pyraminxNet,
    square1,
    square1Net,
    cubeTop
  ].forEach(puzzle => {
    if (puzzle && puzzle.group) {

      puzzle.group.rotate(Math.PI/32, [1,1,0]);
    } 
  });

  // g.rotate(Math.PI/32, [1,1,0]);

  renderer.strokeWidth = '' + strokeWidth;
  renderer.render(scene, camera);
}