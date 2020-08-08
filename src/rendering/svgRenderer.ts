import * as SVG from 'svg.js';
import { Camera } from './camera';
import { Scene } from './scene';
import { mat4, vec3 } from 'gl-matrix';
import { Geometry } from '../geometry/geometry';
import { IColor } from '../geometry/color';

export class SVGRenderer {

  svgDoc: SVG.Doc;
  domElement: HTMLElement;

  constructor(width: number, height: number, minx: number, miny: number, svgWidth: number, svgHeight: number) {
    this.domElement = document.createElement('div');
    this.domElement.className = 'svg-renderer';
    this.svgDoc = SVG(this.domElement);
    this.svgDoc.width(width);
    this.svgDoc.height(height);
    this.svgDoc.viewbox(minx, miny, svgWidth, svgHeight);
  }

  render(scene: Scene, camera: Camera) {
    this.svgDoc.clear();

    let cameraPosition = mat4.getTranslation(vec3.create(), camera.matrix);
    
    // Sort objects by centroid furthest from camera
    scene.objects.sort((a, b) => {
      let aModelView = mat4.mul(mat4.create(), camera.matrix, a.matrix);
      let bModelView = mat4.mul(mat4.create(), camera.matrix, b.matrix);

      let aCentroid: vec3 = vec3.transformMat4(vec3.create(), a.centroid, aModelView)
      let bCentroid: vec3 = vec3.transformMat4(vec3.create(), b.centroid, bModelView)

      // TODO actually use camera, currently only sorting by Z
      return bCentroid[2] - aCentroid[2]
    })
    
    scene.objects.forEach(object => {
      this.renderObject(object, camera);
    });
  }

  private renderObject(object: Geometry, camera: Camera) {
    let modelView = mat4.mul(mat4.create(), camera.matrix, object.matrix);

    // TODO: Sort faces by distance to camera

    object.faces.forEach(face => {
      let points: vec3[] = [];
      face.verticies
        .map(index => object.vertices[index])
        .forEach(vertex => {
          let v: vec3 = vec3.transformMat4(vec3.create(), vertex, modelView)
          let screenPoint = vec3.multiply(v, v, [1, -1, 1])
          points.push(screenPoint);
        });
      this.drawPolygon(points, face.color || object.color);
    });
  }

  private drawPolygon(points: vec3[], color?: IColor) {
    this.svgDoc.polygon(points.map(point => [point[0], point[1]]))
      .fill(color ? color.value : 'black');
  }

}