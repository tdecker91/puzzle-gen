import { YELLOW, BLACK } from "./../puzzles/colors";
import { IColor } from "./../../dist/lib/geometry/color.d";
import { Arrow } from "./../geometry/arrow";
import { IFace, Face } from "./../geometry/face";
import { Camera } from "./camera";
import { Scene } from "./scene";
import { mat4, vec3 } from "gl-matrix";
import { Geometry } from "../geometry/geometry";
import { Object3D } from "../geometry/object3d";
import { Group } from "../geometry/group";
import {
  createSVGElement,
  clearSVG,
  createPolygonElement,
  updatePolygonElement,
  createArrowLineElement,
  createMarkers,
} from "../svg/svg";
import { Renderer } from "./renderer";
import { applyTransformations } from "./utils";

/**
 * A renderer that renders a scene viewed by a camera to an svg element.
 */
export class CustomSVGRenderer implements Renderer {
  domElement: HTMLElement;
  svgElement: SVGSVGElement;
  strokeWidth: string = "0.035";
  arrowStrokeWidth: string = "0.03";
  arrowColor: IColor;

  protected polygons = [];
  protected lines: SVGLineElement[] = [];
  protected uidToPolygon: { [uid: number]: SVGPolygonElement } = {};
  protected uidToLine: { [uid: number]: SVGLineElement } = {};

  /**
   * Creates an SVG renderer. This will create it's own html `<svg>` element. it's
   * the user's job to add this element to the page.
   *
   * @example
   * ```
   * const renderer = new CustomSVGRenderer(width, height, minx, miny, svgWidth, svgHeight)
   * document.getElementById('my-element').appendChild(renderer.domElement);
   * ```
   *
   * @param width svg element width in pixels
   * @param height svg element height in pixels
   * @param minx min x for the svg element viewbox
   * @param miny min x for the svg element viewbox
   * @param svgWidth svg viewbox width
   * @param svgHeight svg viewbox height
   */
  constructor(
    width: number,
    height: number,
    minx: number,
    miny: number,
    svgWidth: number,
    svgHeight: number,
    arrowColor?: IColor
  ) {
    this.arrowColor = arrowColor || BLACK;
    this.domElement = document.createElement("div");
    this.domElement.className = "svg-renderer";
    this.svgElement = createSVGElement(
      width,
      height,
      minx,
      miny,
      svgWidth,
      svgHeight
    );

    const markers = createMarkers(this.arrowColor);
    this.svgElement.appendChild(markers);

    this.domElement.appendChild(this.svgElement);
  }

  render(scene: Scene, camera: Camera) {
    this.polygons = [];
    this.lines = [];

    // this.sortObjects(scene.objects, camera, []);

    scene.objects.forEach((object) => {
      this.renderObject3D(object, camera, []);
    });

    this.renderPolygons();
    this.renderLines();
  }

  protected renderPolygons() {
    this.polygons.sort((a, b) => {
      return a.centroid[2] - b.centroid[2];
    });

    this.polygons.forEach((p) => this.svgElement.appendChild(p.polygon));
  }

  protected renderLines() {
    this.lines.forEach((line) => {
      this.svgElement.appendChild(line);
    });
  }

  protected addPolygon(
    points,
    face: IFace,
    object: Geometry,
    transformations: mat4[]
  ) {
    if (!this.uidToPolygon[face.uid]) {
      // Create new polygon for a face that hasn't been rendered
      this.uidToPolygon[face.uid] = createPolygonElement(
        points,
        face.color || object.color,
        this.strokeWidth
      );
    } else {
      // Just update existing polygon element
      const polygon = this.uidToPolygon[face.uid];
      updatePolygonElement(
        polygon,
        points,
        face.color || object.color,
        this.strokeWidth
      );
    }

    this.polygons.push({
      polygon: this.uidToPolygon[face.uid],
      centroid: applyTransformations(face.centroid, [
        object.matrix,
        ...transformations,
      ]),
    });
  }

  private renderObject3D(
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

  private renderGeometry(
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

  private renderArrow(object: Arrow, camera: Camera, transformations: mat4[]) {
    let objectToScreen = [object.matrix, ...transformations, camera.matrix];
    let p1Screen = applyTransformations(object.p1, objectToScreen);
    let p2Screen = applyTransformations(object.p2, objectToScreen);
    let arrow: SVGLineElement;

    if (!this.uidToLine[object.uid]) {
      arrow = createArrowLineElement(
        p1Screen,
        p2Screen,
        this.arrowColor,
        this.arrowStrokeWidth
      );
      this.uidToLine[object.uid] = arrow;
    } else {
      arrow = this.uidToLine[object.uid];
      arrow.setAttributeNS(null, "x1", p1Screen[0].toString());
      arrow.setAttributeNS(null, "y1", (-p1Screen[1]).toString());
      arrow.setAttributeNS(null, "x2", p2Screen[0].toString());
      arrow.setAttributeNS(null, "y2", (-p2Screen[1]).toString());
    }

    this.lines.push(arrow);
  }

  private sortFaces(faces: Face[], object: Object3D, transformations: mat4[]) {
    faces.sort((a, b) => {
      let aToWorld = [object.matrix, ...transformations];
      let bToWorld = [object.matrix, ...transformations];

      let aCentroid: vec3 = applyTransformations(a.centroid, aToWorld);
      let bCentroid: vec3 = applyTransformations(b.centroid, bToWorld);

      // TODO actually use camera, currently only sorting by Z
      return aCentroid[2] - bCentroid[2];
    });
  }

  private sortObjects(
    objects: Object3D[],
    camera: Camera,
    transformations: mat4[]
  ) {
    objects.sort((a, b) => {
      let aToWorld = [a.matrix, ...transformations];
      let bToWorld = [b.matrix, ...transformations];

      let aCentroid: vec3 = applyTransformations(a.centroid, aToWorld);
      let bCentroid: vec3 = applyTransformations(b.centroid, bToWorld);

      // TODO actually use camera, currently only sorting by Z
      return aCentroid[2] - bCentroid[2];
    });
  }
}
