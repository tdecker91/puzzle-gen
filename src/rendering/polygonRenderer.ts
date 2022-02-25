import { mat4, vec3 } from "gl-matrix";
import { Arrow } from "./../geometry/arrow";
import { Object3D } from "../geometry/object3d";
import { Geometry } from "../geometry/geometry";
import { Group } from "../geometry/group";
import { Camera } from "./camera";
import { Renderer } from "./renderer";
import { Scene } from "./scene";
import { applyTransformations } from "./utils";
import { Face, IFace } from "../geometry/face";

export interface Polygon {
  points: vec3[]; // Screen points for the polygon to render
  face: Face; // original geometry face the polygon comes from
  object: Geometry; // parent geometry
  centroid: vec3; // centroid of the face in 3d space
}

/**
 * Renderer class to take scene geometry and render it to 2d
 * polygon coordinates.
 *
 * 1. Takes a scene and camera
 * 2. converts the scene 3d geometry to 2d screen geometry based on the camera
 * 3. tries to render each face in order from furthest from camera to closest
 * 4. finally, draws the lines (arrows) over top of everything
 *
 * Implementers need just implement
 *   - drawPolygon - a method that draws polygons on some 2d graphics area
 *   - drawArrow - a method that draws an arrow
 *   - onBeforeRender - do any prep work necessary before rendering a frame
 *   - onComplete - handle any final logic
 */
export abstract class PolygonRenderer implements Renderer {
  protected polygons = [];
  protected arrows = [];

  abstract drawPolygon(polygon: Polygon);
  abstract drawArrow(p1: vec3, p2: vec3, uid: string);
  abstract onBeforeRender();
  abstract onComplete();

  render(scene: Scene, camera: Camera): void {
    this.polygons = [];

    scene.objects.forEach((object) => {
      this.renderObject3D(object, camera, []);
    });

    this.onBeforeRender();
    this.renderPolygons();
    this.renderArrows();
    this.onComplete();
  }

  protected renderPolygons() {
    this.polygons.sort((a, b) => {
      return a.centroid[2] - b.centroid[2];
    });

    this.polygons.forEach((p) => this.drawPolygon(p));
  }

  protected renderArrows() {
    this.arrows.forEach(({ p1, p2, uid }) => {
      this.drawArrow(p1, p2, uid);
    });
  }

  protected renderObject3D(
    object: Object3D,
    camera: Camera,
    transformations: mat4[]
  ) {
    if (object instanceof Geometry) {
      this.renderGeometry(object, camera, transformations);
    } else if (object instanceof Arrow) {
      this.renderArrow(object, camera, transformations);
    } else if (object instanceof Group) {
      let group = <Group>object;
      this.sortObjects(group.objects, camera, [
        group.matrix,
        ...transformations,
      ]);
      group.objects.forEach((object) => {
        this.renderObject3D(object, camera, [group.matrix, ...transformations]);
      });
    }
  }

  protected renderGeometry(
    object: Geometry,
    camera: Camera,
    transformations: mat4[]
  ) {
    // this.sortFaces(object.faces, object, transformations);

    object.faces.forEach((face) => {
      let points: vec3[] = [];
      face.indices
        .map((index) => object.vertices[index])
        .forEach((vertex) => {
          let objectToScreen = [
            object.matrix,
            ...transformations,
            camera.matrix,
          ];
          let v: vec3 = applyTransformations(vertex, objectToScreen);

          // Need to flip y to look correct on svg viewbox
          let screenPoint = vec3.multiply(v, v, [1, -1, 1]);
          points.push(screenPoint);
        });

      this.addPolygon(points, face, object, transformations);
    });
  }

  protected renderArrow(
    object: Arrow,
    camera: Camera,
    transformations: mat4[]
  ) {
    let objectToScreen = [object.matrix, ...transformations, camera.matrix];
    let p1Screen = applyTransformations(object.p1, objectToScreen);
    let p2Screen = applyTransformations(object.p2, objectToScreen);

    this.arrows.push({ p1: p1Screen, p2: p2Screen, uid: object.uid });
  }

  protected addPolygon(
    points,
    face: IFace,
    object: Geometry,
    transformations: mat4[]
  ) {
    this.polygons.push({
      points,
      face,
      object,
      centroid: applyTransformations(face.centroid, [
        object.matrix,
        ...transformations,
      ]),
    } as Polygon);
  }

  protected sortObjects(
    objects: Object3D[],
    camera: Camera,
    transformations: mat4[]
  ) {
    [...objects].sort((a, b) => {
      let aToWorld = [a.matrix, ...transformations];
      let bToWorld = [b.matrix, ...transformations];

      let aCentroid: vec3 = applyTransformations(a.centroid, aToWorld);
      let bCentroid: vec3 = applyTransformations(b.centroid, bToWorld);

      // TODO actually use camera, currently only sorting by Z
      return aCentroid[2] - bCentroid[2];
    });
  }
}
