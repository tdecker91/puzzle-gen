import { HtmlSvgRenderer } from './../../rendering/htmlSvgRenderer';
import { Group } from "../../geometry/group";
import { RubiksCube } from "../../puzzles/rubiksCube/rubiksCube";
import { Camera } from "../../rendering/camera";
import { Scene } from "../../rendering/scene";
import { createSquare1 } from '../../visualizer/puzzleCreator';
import { Matrix4 } from '../../math/matrix';

let renderer: HtmlSvgRenderer;
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
  renderer = new HtmlSvgRenderer(
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

  let originalMat: Matrix4 = new Matrix4();

  let frameOut: HTMLSpanElement = document.getElementById("frame-out");
  let start = new Date().getTime();

  renderer.svgElement.addEventListener('mousedown', e => {
    mouseDown = true;
    start = new Date().getTime();
    Matrix4.copy(originalMat, rotationGroup.matrix);
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

      let xRotation = Matrix4.fromXRotation(diffY / 128);
      let yRotation = Matrix4.fromYRotation(diffX / 128);

      // Matrix to accumulate x and y rotations from mouse movements
      let acc: Matrix4 = new Matrix4();

      acc.multiply(xRotation);
      acc.multiply(yRotation);

      Matrix4.multiply(rotationGroup.matrix, acc, originalMat);
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

function mat4String(m: Matrix4) {
  return `${round(m.values[0])}\t\t${round(m.values[1])}\t\t${round(m.values[2])}\t\t${round(m.values[3])}\n` +
    `${round(m.values[4])}\t\t${round(m.values[5])}\t\t${round(m.values[6])}\t\t${round(m.values[7])}\n` +
    `${round(m.values[8])}\t\t${round(m.values[9])}\t\t${round(m.values[10])}\t\t${round(m.values[11])}\n` +
    `${round(m.values[12])}\t\t${round(m.values[13])}\t\t${round(m.values[14])}\t\t${round(m.values[15])}\n`;
}

export function reset() {

  rotationGroup.matrix = new Matrix4();
  valuesElement.innerHTML = mat4String(rotationGroup.matrix);
  renderer.render(scene, camera);

}