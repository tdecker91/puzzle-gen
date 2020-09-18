import { MegaminxNet } from './puzzles/megaminxNet';
import { PyraminxNet } from './puzzles/pyraminxNet';
import { Pyraminx } from './puzzles/pyraminx';
import { Megaminx } from './puzzles/megaminx';
import { mat4 } from 'gl-matrix';
import { Camera } from './rendering/camera';
import { Scene } from './rendering/scene';
import { RubiksCube } from './puzzles/rubiksCube';
import { CustomSVGRenderer } from './rendering/customSvgRenderer';
import { Skewb } from './puzzles/skewb';
import { RubiksCubeNet } from './puzzles/rubiksCubeNet';
import { SkewbNet } from './puzzles/skewbNet';


let camera: Camera = new Camera();
let rubiksCube: RubiksCube;
let cubeNet: RubiksCubeNet;
let skewb: Skewb;
let skewbNet: SkewbNet;
let megaminx: Megaminx;
let pyraminx: Pyraminx;
let pyraminxNet: PyraminxNet;
let megaminxNet: MegaminxNet;

let renderer;
let scene;

let width: number = 500;
let height: number = 500;
let minx: number = -2;
let miny: number = -2;
let svgwidth: number = 4;
let svgheight: number = 4;
let planewidth: number = 1;

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

}

export function renderDemo() {

  scene = new Scene();
  renderer = new CustomSVGRenderer(width, height, minx, miny, svgwidth, svgheight);

  // rubiksCube = new RubiksCube(3);
  // skewbNet = new SkewbNet();
  // cubeNet = new RubiksCubeNet(3);
  // skewb = new Skewb();
  megaminx = new Megaminx();

  // pyraminx = new Pyraminx(3);
  // pyraminxNet = new PyraminxNet(3);

  megaminxNet = new MegaminxNet(1.1, 2);

  // scene.add(skewbNet.group);
  // scene.add(skewb.group);
  // scene.add(cubeNet.group);
  // scene.add(rubiksCube.group);
  scene.add(megaminxNet.group);
  scene.add(megaminx.group);
  // scene.add(pyraminx.group);

  document.getElementById('idsomething').appendChild(renderer.domElement);
  renderer.render(scene, camera);

  setInputs();
}

document.addEventListener("DOMContentLoaded", function (event) {
  renderDemo();
});

export function svgStep() {
  // skewb.group.rotate(Math.PI/32, [1,1,0]);
  // rubiksCube.group.rotate(Math.PI/32, [1,1,0]);
  // cubeNet.group.rotate(Math.PI/32, [1,1,0]);
  // mat4.translate(camera.matrix, camera.matrix, [0,0,-.5]);
  megaminx.group.rotate(Math.PI/32, [1,1,0]);
  // pyraminx.group.rotate(Math.PI/32, [1,1,0]);
  // megaminxNet.group.rotate(Math.PI/32, [1,1,0]);

  renderer.render(scene, camera);
}