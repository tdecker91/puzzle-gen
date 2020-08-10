import { Geometry } from './geometry/geometry';
import { vec3, mat4 } from 'gl-matrix';
import { Camera } from './rendering/camera';
// import * as THREE from 'three';
import { Scene } from './rendering/scene';
// import { SVGRenderer } from './rendering/svgRenderer';
import { Face4 } from './geometry/face';
import { Cube } from './geometry/cube';
import { RubiksCube } from './puzzles/rubiksCube';
import { CustomSVGRenderer } from './rendering/customSvgRenderer';


let red: Geometry;
let blue: Geometry;
let green: Geometry;
let purple: Geometry;
let orange: Geometry;
let yellow: Geometry;
let camera: Camera = new Camera();
let cube: Cube;
let rubiksCube: RubiksCube;

let renderer;
let scene;

let width: number = 500;
let height: number = 500;
let minx: number = -2;
let miny: number = -2;
let svgwidth: number = 4;
let svgheight: number = 4;

let planewidth: number = 1;

let redVerticies: vec3[] = [
  vec3.clone([-1/2,1/2,1/2]),
  vec3.clone([1/2,1/2,1/2]),
  vec3.clone([1/2,-1/2,1/2]),
  vec3.clone([-1/2,-1/2,1/2]),
];
let orangeVerticies: vec3[] = [
  vec3.clone([-1/2,1/2,-1/2]),
  vec3.clone([1/2,1/2,-1/2]),
  vec3.clone([1/2,-1/2,-1/2]),
  vec3.clone([-1/2,-1/2,-1/2]),
];
let greenVerticies: vec3[] = [
  vec3.clone([-1/2,1/2,1/2]),
  vec3.clone([-1/2,1/2,-1/2]),
  vec3.clone([1/2,1/2,-1/2]),
  vec3.clone([1/2,1/2,1/2]),
];
let yellowVerticies: vec3[] = [
  vec3.clone([-1/2,-1/2,1/2]),
  vec3.clone([-1/2,-1/2,-1/2]),
  vec3.clone([1/2,-1/2,-1/2]),
  vec3.clone([1/2,-1/2,1/2]),
];
let blueVerticies: vec3[] = [
  vec3.fromValues(-1/2,1/2,1/2),
  vec3.fromValues(-1/2,-1/2,1/2),
  vec3.fromValues(-1/2,-1/2,-1/2),
  vec3.fromValues(-1/2,1/2,-1/2),
];
let whiteVerticies: vec3[] = [
  vec3.fromValues(1/2,1/2,1/2),
  vec3.fromValues(1/2,-1/2,1/2),
  vec3.fromValues(1/2,-1/2,-1/2),
  vec3.fromValues(1/2,1/2,-1/2),
];

let faces = function(color: string): Face4[] {
  return [
    new Face4(0,1,2,3,null,{value: color})
  ]
}

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

export function dothething() {
  red = new Geometry(redVerticies, faces('#FF0000'));
  green = new Geometry(greenVerticies, faces('#00FF00'));
  blue = new Geometry(blueVerticies, faces('#0000FF'));
  purple = new Geometry(whiteVerticies, faces('#FF00FF'));
  orange = new Geometry(orangeVerticies, faces('#FFA500'));
  yellow = new Geometry(yellowVerticies, faces('#FFFF00'));

  scene = new Scene();
  // renderer = new SVGRenderer(width, height, minx, miny, svgwidth, svgheight);
  renderer = new CustomSVGRenderer(width, height, minx, miny, svgwidth, svgheight);

  const start = new Date().getTime();
  rubiksCube = new RubiksCube(3);
  const end = new Date().getTime();
  console.log(end - start);

  // rubiksCube.stickers.forEach(sticker => {
  //   scene.add(sticker);
  // })

  scene.add(rubiksCube.group);

  // scene.add(green);
  // scene.add(blue);
  // scene.add(red);
  // scene.add(purple);
  // scene.add(orange);
  // scene.add(yellow);

  document.getElementById('idsomething').appendChild(renderer.domElement);
  renderer.render(scene, camera);

  setInputs();
}

document.addEventListener("DOMContentLoaded", function (event) {
  dothething();
  // threejs();
});

export function svgStep() {
  // red.rotate(Math.PI/16, [1,1,0]);
  // green.rotate(Math.PI/16, [1,1,0]);
  // blue.rotate(Math.PI/16, [1,1,0]);
  // purple.rotate(Math.PI/16, [1,1,0]);
  // orange.rotate(Math.PI/16, [1,1,0]);
  // yellow.rotate(Math.PI/16, [1,1,0]);
  // cube.rotate(Math.PI/16, [1,1,0]);
  const start = new Date().getTime();
  rubiksCube.group.rotate(Math.PI/32, [1,1,0]);

  renderer.render(scene, camera);
  const end = new Date().getTime();
  console.log(end-start);
}

// function threejs() {
//   var scene = new THREE.Scene();
//   var camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

//   var renderer = new THREE.WebGLRenderer();
//   renderer.setSize(width, height);
//   document.getElementById('threejs').appendChild(renderer.domElement);

//   var origin = new THREE.Object3D();

//   var redGeo = new THREE.PlaneGeometry(planewidth, planewidth);
//   var redMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, side: THREE.DoubleSide });
//   // redGeo.translate(planewidth/2, 0, 0);
//   var redMesh = new THREE.Mesh(redGeo, redMaterial);
//   redMesh.translateZ(planewidth/2);

//   var greenGeo = new THREE.PlaneGeometry(planewidth, planewidth);
//   greenGeo.rotateX(Math.PI/2);
//   var greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00, side: THREE.DoubleSide });
//   var greenMesh = new THREE.Mesh(greenGeo, greenMaterial);
//   greenMesh.translateY(planewidth/2);
//   // greenGeo.translate(planewidth/2, 0, 0);

//   var blueGeo = new THREE.PlaneGeometry(planewidth, planewidth);
//   blueGeo.rotateY(Math.PI/2);
//   var blueMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF, side: THREE.DoubleSide})
//   var blueMesh = new THREE.Mesh(blueGeo, blueMaterial);
//   blueMesh.translateX(-planewidth/2);

//   origin.add(redMesh);
//   origin.add(greenMesh);
//   origin.add(blueMesh);

//   scene.add(origin);

//   camera.position.z = 5;
//   console.log(camera.projectionMatrix);

//   var animate = function () {
//     requestAnimationFrame(animate);

//     origin.rotateX(Math.PI/124);

//     // plane.rotation.y += 0.01;

//     renderer.render(scene, camera);
//   };

//   animate();
// }