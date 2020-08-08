import * as SVG from 'svg.js'
import { Geometry } from './geometry/geometry';
import { Plane } from './geometry/plane';
import { vec3, mat4 } from 'gl-matrix';
import { Camera } from './rendering/camera';
import * as THREE from 'three';
import { Scene } from './rendering/scene';
import { SVGRenderer } from './rendering/svgRenderer';
import { IFace, Face4 } from './geometry/face';


let svg;
let plane: Geometry;
let another: Geometry;
let green: Geometry;
let camera: Camera = new Camera();
let test;
let renderer;
let scene;

let width: number = 500;
let height: number = 500;
let minx: number = -2;
let miny: number = -2;
let svgwidth: number = 4;
let svgheight: number = 4;

let rotationRad: number = 0;
let planewidth: number = 1;

let redVerticies: vec3[] = [
  vec3.clone([-1/2,1/2,1/2]),
  vec3.clone([1/2,1/2,1/2]),
  vec3.clone([1/2,-1/2,1/2]),
  vec3.clone([-1/2,-1/2,1/2]),
];
let greenVerticies: vec3[] = [
  vec3.clone([-1/2,1/2,1/2]),
  vec3.clone([-1/2,1/2,-1/2]),
  vec3.clone([1/2,1/2,-1/2]),
  vec3.clone([1/2,1/2,1/2]),
];
let blueVerticies: vec3[] = [
  vec3.fromValues(-1/2,1/2,1/2),
  vec3.fromValues(-1/2,-1/2,1/2),
  vec3.fromValues(-1/2,-1/2,-1/2),
  vec3.fromValues(-1/2,1/2,-1/2),
];
let faces: IFace[] = [
  new Face4(0, 1, 2, 3)
];

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
  // if (test) {
  //   test.remove();
  //   svg.remove();
  // }
  // svg = SVG('idsomething');
  // svg.width(width);
  // svg.height(height);
  // svg.viewbox(minx, miny, svgwidth, svgheight);

  // let rectsvg = svg.rect(25,25);
  // rectsvg.x(-12.5)
  // rectsvg.y(-12.5)

  // another = new Plane(planewidth, planewidth, {value: 'blue'});
  // green = new Plane(planewidth, planewidth, {value: 'green'});
  // plane = new Plane(planewidth, planewidth, { value: 'red' });

  plane = new Geometry(redVerticies, faces, {value: 'red'});
  green = new Geometry(greenVerticies, faces, {value: 'green'});
  another = new Geometry(blueVerticies, faces, {value: 'blue'});

  // plane.translate(vec3.fromValues(0,0,-20));
  // green.rotate(Math.PI/2, [0,1,0]);
  // green.translate([-planewidth/2,0,0]);
  // another.rotate(Math.PI/2, [1,0,0]);
  // another.translate([0,planewidth/2,0]);

  // plane.rotate(-Math.PI/4, vec3.fromValues(1,0,0));
  // plane.rotate(-Math.PI/4, vec3.fromValues(0,1,0));
  // green.rotate(Math.PI/2, vec3.fromValues(1,0,0))
  // green.translate(vec3.fromValues(0,planewidth/2,0));
  // green.rotate(-Math.PI/4, vec3.fromValues(1,0,0));
  // green.rotate(-Math.PI/4, vec3.fromValues(0,1,0));
  // another.rotate(Math.PI/2, vec3.fromValues(0,0,1));
  // another.translate(vec3.fromValues(-planewidth/2, 0, 0));
  // another.rotate(-Math.PI/4, vec3.fromValues(1,0,0));
  // another.rotate(-Math.PI/4, vec3.fromValues(0,1,0));
  scene = new Scene();
  renderer = new SVGRenderer(width, height, minx, miny, svgwidth, svgheight);

  scene.add(green);
  scene.add(another);
  scene.add(plane);

  document.getElementById('idsomething').appendChild(renderer.domElement);
  renderer.render(scene, camera);

  // let rotation: mat4 = mat4.create()
  // mat4.rotate(rotation, rotation, Math.PI/4, [0,0,1]);
  // mat4.rotate(rotation, rotation, Math.PI / 4, [1, 0, 0]);
  // let modelView = mat4.mul(mat4.create(), camera.matrix, rotation);

  // let points: vec3[] = [];
  // // console.log(plane.vertices);
  // plane.vertices.forEach(vertex => {
  //   let test = vec3.transformMat4(vec3.create(), vertex, modelView);
  //   // console.log(test);
  //   points.push(test);
  // })

  // test = svg.polygon([
  //   [points[0][0], points[0][1]],
  //   [points[1][0], points[1][1]],
  //   [points[2][0], points[2][1]],
  //   [points[3][0], points[3][1]],
  // ]);

  // test.fill('green');
  // test.stroke('black');

  setInputs();
}

document.addEventListener("DOMContentLoaded", function (event) {
  dothething();
  threejs();
});

export function svgStep() {
  // plane.translate([0,0,-.5]);
  plane.rotate(Math.PI/16, [1,0,0]);
  green.rotate(Math.PI/16, [1,0,0]);
  another.rotate(Math.PI/16, [1,0,0]);
  // green.rotate(Math.PI/8, [1,0,0]);
  // another.translate([0,planewidth/2,0]);
  renderer.render(scene, camera);
}

function threejs() {
  var scene = new THREE.Scene();
  // var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  var camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  // camera.translateZ(-15);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.getElementById('threejs').appendChild(renderer.domElement);

  // var geometry = new THREE.PlaneGeometry(planewidth, planewidth);
  // var material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
  // var plane = new THREE.Mesh(geometry, material);
  // var geometry2 = new THREE.PlaneGeometry(planewidth, planewidth);
  // var material2 = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
  // var plane2 = new THREE.Mesh(geometry2, material2);

  var origin = new THREE.Object3D();

  var redGeo = new THREE.PlaneGeometry(planewidth, planewidth);
  var redMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, side: THREE.DoubleSide });
  // redGeo.translate(planewidth/2, 0, 0);
  var redMesh = new THREE.Mesh(redGeo, redMaterial);
  redMesh.translateZ(planewidth/2);

  var greenGeo = new THREE.PlaneGeometry(planewidth, planewidth);
  greenGeo.rotateX(Math.PI/2);
  var greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00, side: THREE.DoubleSide });
  var greenMesh = new THREE.Mesh(greenGeo, greenMaterial);
  greenMesh.translateY(planewidth/2);
  // greenGeo.translate(planewidth/2, 0, 0);

  var blueGeo = new THREE.PlaneGeometry(planewidth, planewidth);
  blueGeo.rotateY(Math.PI/2);
  var blueMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF, side: THREE.DoubleSide})
  var blueMesh = new THREE.Mesh(blueGeo, blueMaterial);
  blueMesh.translateX(-planewidth/2);

  origin.add(redMesh);
  origin.add(greenMesh);
  origin.add(blueMesh);

  scene.add(origin);

  camera.position.z = 5;
  console.log(camera.projectionMatrix);

  var animate = function () {
    requestAnimationFrame(animate);

    origin.rotateX(Math.PI/124);

    // plane.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
}