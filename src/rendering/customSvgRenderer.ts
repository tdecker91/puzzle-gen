import { Camera } from './camera';
import { Scene } from './scene';
import { mat4, vec3 } from 'gl-matrix';
import { Geometry } from '../geometry/geometry';
import { Object3D } from '../geometry/object3d';
import { Group } from '../geometry/group';
import { createSVGElement, clearSVG, createPolygonElement } from '../svg/svg';

export class CustomSVGRenderer {

  domElement: HTMLElement;
  svgElement: SVGSVGElement;

  constructor(width: number, height: number, minx: number, miny: number, svgWidth: number, svgHeight: number) {
    this.domElement = document.createElement('div');
    this.domElement.className = 'svg-renderer';
    this.svgElement = createSVGElement(width, height, minx, miny, svgWidth, svgHeight);
    this.domElement.appendChild(this.svgElement);
  }

  render(scene: Scene, camera: Camera) {
    clearSVG(this.svgElement);

    this.sortObjects(scene.objects, camera, []);
    
    scene.objects.forEach(object => {
      this.renderObject3D(object, camera, []);
    });
  }

  private renderObject3D(object: Object3D, camera: Camera, transformations: mat4[]) {
    if (object instanceof Geometry) {
      this.renderGeometry(object, camera, transformations);
    } else if (object instanceof Group) {
      let group = <Group>object;
      this.sortObjects(group.objects, camera, [group.matrix, ...transformations]);
      group.objects.forEach(object => {
        this.renderObject3D(object, camera, [group.matrix, ...transformations]);
      })
    }
  } 

  private renderGeometry(object: Geometry, camera: Camera, transformations: mat4[]) {
    // TODO: Sort faces by distance to camera

    object.faces.forEach(face => {
      let points: vec3[] = [];
      face.verticies
        .map(index => object.vertices[index])
        .forEach(vertex => {
          let objectToScreen = [object.matrix, ...transformations, camera.matrix];
          let v: vec3 = this.applyTransformations(vertex, objectToScreen);
          
          // Need to flip y to look correct on svg viewbox
          let screenPoint = vec3.multiply(v, v, [1, -1, 1])
          points.push(screenPoint);
        });
      const polygon = createPolygonElement(points, face.color || object.color);
      this.svgElement.appendChild(polygon);
    });
  }

  private sortObjects(objects: Object3D[], camera: Camera, transformations: mat4[]) {
    objects.sort((a, b) => {
      let aToWorld = [a.matrix, ...transformations];
      let bToWorld = [b.matrix, ...transformations];

      let aCentroid: vec3 = this.applyTransformations(a.centroid, aToWorld);
      let bCentroid: vec3 = this.applyTransformations(b.centroid, bToWorld);

      // TODO actually use camera, currently only sorting by Z
      return aCentroid[2] - bCentroid[2]
    });
  }

  private applyTransformations(vertex: vec3, transforms: mat4[]): vec3 {
    return transforms.reduce((v, t) => {
      return vec3.transformMat4(v, v, t);
    }, vec3.clone(vertex))
  }

}