import { MegaminxSimulator } from './../../simulator/megaminx/megaminxSimulator';
import { PINK, LIGHT_YELLOW, GREY, LIGHT_GREEN, PURPLE, DARK_BLUE } from './../../puzzles/colors';
import { PyraminxSimulator } from '../../simulator/pyraminx/pyraminxSimulator';
import { RED, BLUE, WHITE, ORANGE, GREEN } from '../../puzzles/colors';
import { HtmlSvgRenderer } from '../../rendering/htmlSvgRenderer';
import { Square1Net } from '../../puzzles/square1/square1Net';
import { Square1 } from '../../puzzles/square1/square1';
import { MegaminxNet } from '../../puzzles/megaminxNet';
import { PyraminxNet } from '../../puzzles/pyraminxNet';
import { Pyraminx } from '../../puzzles/pyraminx';
import { Megaminx } from '../../puzzles/megaminx';
import { SkewbNet } from '../../puzzles/skewbNet';
import { Skewb } from '../../puzzles/skewb';
import { RubiksCubeTopLayer } from '../../puzzles/rubiksCube/rubiksCubeTop';
import { RubiksCubeNet } from '../../puzzles/rubiksCube/rubiksCubeNet';
import { RubiksCube } from '../../puzzles/rubiksCube/rubiksCube';
import { Group } from '../../geometry/group';
import { Camera } from '../../rendering/camera';
import { Scene } from '../../rendering/scene';
import { YELLOW } from '../../puzzles/colors';
import { Matrix4 } from '../../math/matrix';

let camera: Camera = new Camera();
let g: Group = new Group();
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

let renderer: HtmlSvgRenderer;
let scene;

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
    camera.matrix.values.forEach((value, index) => {
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

  camera.matrix = Matrix4.fromValues(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16)

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
  renderer = new HtmlSvgRenderer(width, height, minx, miny, svgwidth, svgheight);
  renderer.strokeWidth = "" + strokeWidth;

  // let cubeSim = new RubiksCubeSimulator(3);
  // cubeSim.Z();

  let cubeFaceColors = {
    U: YELLOW,
    R: RED,
    F: BLUE,
    D: WHITE,
    L: ORANGE,
    B: GREEN,
  }

  // const {U, R, F, D, L, B} = cubeSim.getValues();
  rubiksCube = new RubiksCube(3);
  // rubiksCube.setColors([...U, ...R, ...F, ...D, ...L, ...B].map(face => cubeFaceColors[face]));
  // scene.add(rubiksCube.group);

  // cubeTop = new RubiksCubeTopLayer(3);
  // cubeTop.setColors([...U, ...R, ...F, ...D, ...L, ...B].map(face => cubeFaceColors[face]));
  // scene.add(cubeTop.group);

  // cubeNet = new RubiksCubeNet(3);
  // cubeNet.setColors([...U, ...R, ...F, ...D, ...L, ...B].map(face => cubeFaceColors[face]));
  // scene.add(cubeNet.group);
  
  // skewbNet = new SkewbNet();
  // scene.add(skewbNet.group);

  // skewb = new Skewb();
  // scene.add(skewb.group);

  let pyraminxSim = new PyraminxSimulator();
  
  let pyraminxFaceColors = {
    left: BLUE,
    top: YELLOW,
    right: GREEN,
    back: RED
  }

  let {top, left, right, back} = pyraminxSim.getValues();
  pyraminx = new Pyraminx(3);
  // pyraminx.setColors([...left, ...right, ...top, ...back].map(face => pyraminxFaceColors[face]));
  // scene.add(pyraminx.group);

  pyraminxNet = new PyraminxNet(3);
  // pyraminxNet.setColors([...left, ...right, ...top, ...back].map(face => pyraminxFaceColors[face]));
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
  const megaSim = new MegaminxSimulator();
  // megaSim.d();
  // megaSim.BR();
  // megaSim.Rxx();
  // megaSim.Dxx();
  // megaSim.Rxx();
  // let {U, R, F, dr, dl, L, d, br, BR, BL, b, bl} = megaSim.getValues();
  // megaminx.oldSetColors([...U, ...R, ...F, ...dr, ...dl, ...L, ...d, ...br, ...BR, ...BL, ...bl, ...b].map(face => megaminxFaceColors[face]));
  g.addObject(megaminx.group);

  // megaminxNet = new MegaminxNet(2);
  // scene.add(megaminxNet.group);

  // square1 = new Square1();
  // scene.add(square1.group);

  // square1Net = new Square1Net();
  // scene.add(square1Net.group);

  scene.add(g);
  document.getElementById('idsomething').appendChild(renderer.domElement);


  let down = false;
  let downX = 0;
  let downY = 0;

  let identity = new Matrix4();
  let accRot = new Matrix4();
  let xRot = new Matrix4();
  let yRot = new Matrix4();

  renderer.domElement.addEventListener('mousedown', e => {
    down = true;
    downX = e.x;
    downY = e.y;
  });

  function throttle(callback, interval) {
    let enableCall = true;
  
    return function(...args) {
      if (!enableCall) return;
  
      enableCall = false;
      callback.apply(this, args);
      setTimeout(() => enableCall = true, interval);
    }
  }

  const funz = throttle(e => {
    if (down) {
      const [diffX, diffY] = [e.x - downX, e.y - downY];
      [downX, downY] = [e.x, e.y];

      xRot = Matrix4.fromXRotation(diffY / 128);
      yRot = Matrix4.fromYRotation(diffX / 128);

      g.matrix.multiply(xRot);
      g.matrix.multiply(yRot);

      window.requestAnimationFrame(() => renderer.render(scene, camera));
    }
  }, 25)

  renderer.domElement.addEventListener('mousemove', funz);

  renderer.domElement.addEventListener('mouseup', e => {
    down = false;
  });

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

      puzzle.group.rotate(Math.PI / 32, 1, 1, 0);
    } 
  });

  // g.rotate(Math.PI/32, [1,1,0]);

  renderer.strokeWidth = '' + strokeWidth;
  renderer.render(scene, camera);
}