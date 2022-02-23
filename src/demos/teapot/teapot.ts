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

let width: number = 500;
let height: number = 500;

export function renderDemo() {
  mat4.translate(camera.matrix, camera.matrix, [0, -1.5, -10]);
  scene = new Scene();
  renderer = new HtmlCanvasRenderer(width, height, 1);

  const teapot = createTeapot();
  g.addObject(teapot);
  scene.add(g);
  document.getElementById('teapot').appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

function createTeapot(): Geometry {
  const v = vertices.map(vertex => {
    const [_, x, y, z] = vertex.split(" ");
    return vec3.fromValues(parseFloat(x), parseFloat(y), parseFloat(z));
  })

  let outline = { value: "#00000000", stroke: "#FFF" };

  const f = faces.map(face => {
    const [_, a, b, c] = face.split(" ");
    return new Face([parseInt(a) - 1, parseInt(b) - 1, parseInt(c) - 1], v, outline);
  });


  return new Geometry(v, f);
}