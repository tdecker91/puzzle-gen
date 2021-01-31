import { YELLOW } from './../../puzzles/colors';
import { mat4 } from 'gl-matrix';
import { CustomSVGRenderer } from './../../rendering/customSvgRenderer';
import { Group } from "../../geometry/group";
import { RubiksCube } from "../../puzzles/rubiksCube/rubiksCube";
import { Camera } from "../../rendering/camera";
import { Scene } from "../../rendering/scene";
import { Megaminx } from '../../puzzles/megaminx';

let renderer: CustomSVGRenderer;
let camera: Camera;
let scene: Scene;
let rotationGroup: Group;
let rubiksCube: RubiksCube;

let mouseDown: boolean;
let x: number;
let y: number;

function renderDemo() {
  camera = new Camera();
  scene = new Scene();
  rotationGroup = new Group();
  rubiksCube = new RubiksCube(3);
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

  // rotationGroup.addObject(rubiksCube.group);
  rotationGroup.addObject(new Megaminx(2).group);
  scene.add(rotationGroup);

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

  renderer.domElement.addEventListener('mousedown', e => {
    mouseDown = true;
    mat4.copy(originalMat, rotationGroup.matrix);
    x = e.x;
    y = e.y;
  });

  /**
   * Not a great implementation, as rotation becomes unintuitive
   * should look into camera rotating or quaternions
   */
  renderer.domElement.addEventListener('mousemove', throttle(e => {
    if (mouseDown) {
      const [diffX, diffY] = [e.x - x, e.y - y];

      let xRotation = mat4.fromXRotation(mat4.create(), diffY/128);
      let yRotation = mat4.fromYRotation(mat4.create(), diffX/128);

      // Matrix to accumulate x and y rotations from mouse movements
      let acc: mat4 = mat4.create();

      mat4.multiply(acc, acc, xRotation);
      mat4.multiply(acc, acc, yRotation);

      rotationGroup.matrix = mat4.multiply(rotationGroup.matrix, originalMat, acc);

      renderer.render(scene, camera);
    }
  }, 25));

  renderer.domElement.addEventListener('mouseup', e => {
    mouseDown = false;
  });
});