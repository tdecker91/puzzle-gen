import { BLACK } from "./../puzzles/colors";
import { vec3 } from "gl-matrix";
import { IColor } from "../geometry/color";
import { Polygon, PolygonRenderer } from "./polygonRenderer";
import {
  createSVGElement,
  createPolygonElement,
  updatePolygonElement,
  createArrowLineElement,
  createMarkers,
} from "../svg/svg";

/**
 * Renderer to draw puzzles using html svg elements
 */
export class HtmlSvgRenderer extends PolygonRenderer {
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
   * const renderer = new HtmlSvgRenderer(width, height, minx, miny, svgWidth, svgHeight)
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
    super();
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

  drawPolygon({ points, face, object }: Polygon) {
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

    this.svgElement.appendChild(this.uidToPolygon[face.uid]);
  }

  drawArrow(p1Screen: vec3, p2Screen: vec3, uid: string) {
    let arrow: SVGLineElement;

    if (!this.uidToLine[uid]) {
      arrow = createArrowLineElement(
        p1Screen,
        p2Screen,
        this.arrowColor,
        this.arrowStrokeWidth
      );
      this.uidToLine[uid] = arrow;
    } else {
      arrow = this.uidToLine[uid];
      arrow.setAttributeNS(null, "x1", p1Screen[0].toString());
      arrow.setAttributeNS(null, "y1", (-p1Screen[1]).toString());
      arrow.setAttributeNS(null, "x2", p2Screen[0].toString());
      arrow.setAttributeNS(null, "y2", (-p2Screen[1]).toString());
    }

    this.svgElement.appendChild(this.uidToLine[uid]);
  }

  onComplete() {}
}
