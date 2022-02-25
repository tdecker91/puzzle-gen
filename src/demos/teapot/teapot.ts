import { faces, vertices } from './data';
import { Geometry } from '../../geometry/geometry';
import { mat4, vec3 } from 'gl-matrix';
import { Face } from '../../geometry/face';
import { Camera } from '../../rendering/camera';
import { Scene } from '../../rendering/scene';
import { Group } from '../../geometry/group';
import { HtmlCanvasRenderer } from '../../rendering/htmlCanvasRenderer';

let camera: Camera = new Camera();
let g: Group = new Group();
let renderer: HtmlCanvasRenderer;
let scene;

let mouseDown: boolean;
let x: number;
let y: number;

let width: number = 500;
let height: number = 500;

const teapot = createTeapot();
mat4.translate(camera.matrix, camera.matrix, [0, -1.5, -10]);
scene = new Scene();
renderer = new HtmlCanvasRenderer(width, height, .25);

g.addObject(teapot);
scene.add(g);

export function renderDemo() {
  teapot.matrix = mat4.rotate(teapot.matrix, teapot.matrix, Math.PI / 16, [1, 1, 0]);
  renderer.render(scene, camera);
}

function createTeapot(): Geometry {
  const v = vertices.map(vertex => {
    const [_, x, y, z] = vertex.split(" ");
    return vec3.fromValues(parseFloat(x), parseFloat(y), parseFloat(z));
  })

  let outline = { value: "#DDD", stroke: "#FFF" };

  const f = faces.map(face => {
    const [_, a, b, c] = face.split(" ");
    return new Face([parseInt(a) - 1, parseInt(b) - 1, parseInt(c) - 1], v, outline);
  });


  return new Geometry(v, f);
}

function throttle(callback, interval) {
  let enableCall = true;

  return function (...args) {
    if (!enableCall) return;

    enableCall = false;
    callback.apply(this, args);
    setTimeout(() => enableCall = true, interval);
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById('teapot').appendChild(renderer.domElement);
  renderDemo();

  let originalMat: mat4 = mat4.create();
  let start = new Date().getTime();

  renderer.domElement.addEventListener('mousedown', e => {
    mouseDown = true;
    start = new Date().getTime();
    mat4.copy(originalMat, g.matrix);
    x = e.x;
    y = e.y;
  });

  /**
   * Not a great implementation, as rotation becomes unintuitive
   * should look into camera rotating or quaternions
   */
  renderer.domElement.addEventListener('mousemove', throttle(e => {
    if (mouseDown) {
      start = new Date().getTime();
      const [diffX, diffY] = [e.x - x, e.y - y];

      let xRotation = mat4.fromXRotation(mat4.create(), diffY / 128);
      let yRotation = mat4.fromYRotation(mat4.create(), diffX / 128);

      // Matrix to accumulate x and y rotations from mouse movements
      let acc: mat4 = mat4.create();

      mat4.multiply(acc, acc, xRotation);
      mat4.multiply(acc, acc, yRotation);

      g.matrix = mat4.multiply(g.matrix, acc, originalMat);
      renderer.render(scene, camera);
    }
  }, 10));

  renderer.domElement.addEventListener('mouseup', e => {
    mouseDown = false;
  });
});