import { faces, vertices } from './data';
import { Geometry } from '../../geometry/geometry';
import { Face } from '../../geometry/face';
import { Camera } from '../../rendering/camera';
import { Scene } from '../../rendering/scene';
import { Group } from '../../geometry/group';
import { HtmlCanvasRenderer } from '../../rendering/htmlCanvasRenderer';
import { Vector3 } from '../../math/vector';
import { Matrix4 } from '../../math/matrix';

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
camera.matrix.translate(0, -1.5, -10)
scene = new Scene();
renderer = new HtmlCanvasRenderer(width, height, .25);

g.addObject(teapot);
scene.add(g);

export function renderDemo() {
  teapot.matrix.rotate(Math.PI / 16, 1, 1, 0);
  renderer.render(scene, camera);
}

function createTeapot(): Geometry {
  const v = vertices.map(vertex => {
    const [_, x, y, z] = vertex.split(" ");
    return Vector3.fromValues(parseFloat(x), parseFloat(y), parseFloat(z));
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

  let originalMat: Matrix4 = new Matrix4();
  let start = new Date().getTime();

  renderer.domElement.addEventListener('mousedown', e => {
    mouseDown = true;
    start = new Date().getTime();
    Matrix4.copy(originalMat, g.matrix);
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

      let xRotation = Matrix4.fromXRotation(diffY / 128);
      let yRotation = Matrix4.fromYRotation(diffX / 128);

      // Matrix to accumulate x and y rotations from mouse movements
      let acc: Matrix4 = new Matrix4();

      acc.multiply(xRotation);
      acc.multiply(yRotation);

      Matrix4.multiply(g.matrix, acc, originalMat);
      renderer.render(scene, camera);
    }
  }, 10));

  renderer.domElement.addEventListener('mouseup', e => {
    mouseDown = false;
  });
});