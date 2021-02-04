import { mat4 } from 'gl-matrix';
import { CustomSVGRenderer } from './../../rendering/customSvgRenderer';
import { Group } from "../../geometry/group";
import { RubiksCube } from "../../puzzles/rubiksCube/rubiksCube";
import { Camera } from "../../rendering/camera";
import { Scene } from "../../rendering/scene";

let renderer: CustomSVGRenderer;
let camera: Camera;
let scene: Scene;
let rotationGroup: Group;

let mouseDown: boolean;
let x: number;
let y: number;

let valuesElement: HTMLPreElement = document.getElementById("cameraValues") as HTMLPreElement;

function renderDemo() {
  camera = new Camera();
  scene = new Scene();
  rotationGroup = new Group();
  renderer = new CustomSVGRenderer(
    500,
    500,
    -.9,
    -.9,
    1.8,
    1.8
  )
  renderer.strokeWidth = ".02";

  document.getElementById("puzzle").appendChild(renderer.domElement);

  rotationGroup.addObject(new RubiksCube(3).group);
  scene.add(rotationGroup);
  valuesElement.innerHTML = mat4String(rotationGroup.matrix);

  renderer.render(scene, camera);
}

/**
 * throttle wrapper function to throttle mousemove events
 * 
 * @param callback function to throttle
 * @param interval time in milliseconds callback should be called
 */
function throttle(callback, interval) {
  let enableCall = true;

  return function(...args) {
    if (!enableCall) return;

    enableCall = false;
    callback.apply(this, args);
    setTimeout(() => enableCall = true, interval);
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  renderDemo();

  let originalMat: mat4 = mat4.create();

  let frameOut: HTMLSpanElement = document.getElementById("frame-out");
  let start = new Date().getTime();

  renderer.svgElement.addEventListener('mousedown', e => {
    mouseDown = true;
    start = new Date().getTime();
    mat4.copy(originalMat, rotationGroup.matrix);
    x = e.x;
    y = e.y;
  });

  /**
   * Not a great implementation, as rotation becomes unintuitive
   * should look into camera rotating or quaternions
   */
  renderer.svgElement.addEventListener('mousemove', throttle(e => {
    if (mouseDown) {
      start = new Date().getTime();
      const [diffX, diffY] = [e.x - x, e.y - y];

      let xRotation = mat4.fromXRotation(mat4.create(), diffY/128);
      let yRotation = mat4.fromYRotation(mat4.create(), diffX/128);

      // Matrix to accumulate x and y rotations from mouse movements
      let acc: mat4 = mat4.create();

      mat4.multiply(acc, acc, xRotation);
      mat4.multiply(acc, acc, yRotation);

      rotationGroup.matrix = mat4.multiply(rotationGroup.matrix, acc, originalMat);

      valuesElement.innerHTML = mat4String(rotationGroup.matrix);
      renderer.render(scene, camera);

      const time = new Date().getTime() - start;
      frameOut.innerHTML = `${time} ms`;

    }
  }, 40));

  renderer.svgElement.addEventListener('mouseup', e => {
    mouseDown = false;
  });
});

function round(n: number): string {
  return n.toFixed(3);
}

function mat4String(m: mat4) {
  return `${round(m[0])}\t\t${round(m[1])}\t\t${round(m[2])}\t\t${round(m[3])}\n` +
  `${round(m[4])}\t\t${round(m[5])}\t\t${round(m[6])}\t\t${round(m[7])}\n` +
  `${round(m[8])}\t\t${round(m[9])}\t\t${round(m[10])}\t\t${round(m[11])}\n` +
  `${round(m[12])}\t\t${round(m[13])}\t\t${round(m[14])}\t\t${round(m[15])}\n`;
}

export function reset() {
  rotationGroup.matrix = mat4.create();
  valuesElement.innerHTML = mat4String(rotationGroup.matrix);
  renderer.render(scene, camera);

}