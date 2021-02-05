import { vec3 } from "gl-matrix";
import { IColor } from "../geometry/color";
import { BLACK } from "../puzzles/colors";

export function createSVGElement(
  width: number,
  height: number,
  minx: number,
  miny: number,
  svgWidth: number,
  svgHeight: number
): SVGSVGElement {
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttributeNS(null, "width", width.toString());
  svgElement.setAttributeNS(null, "height", height.toString());
  svgElement.setAttributeNS(
    null,
    "viewBox",
    `${minx} ${miny} ${svgWidth} ${svgHeight}`
  );
  svgElement.setAttributeNS(null, "id", "sr-visualizer");

  return svgElement;
}

export function createPolygonElement(
  points: vec3[],
  color?: IColor,
  strokeWidth?: string
): SVGPolygonElement {
  const polygon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  updatePolygonElement(polygon, points, color, strokeWidth);
  return polygon;
}

export function createArrowLineElement(
  start: vec3,
  end: vec3,
  color?: IColor,
  strokeWidth?: string
): SVGLineElement {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  let strokeColor = color ? color.value : BLACK.value;

  line.setAttributeNS(null, "x1", start[0].toString());
  line.setAttributeNS(null, "y1", (-start[1]).toString());
  line.setAttributeNS(null, "x2", end[0].toString());
  line.setAttributeNS(null, "y2", (-end[1]).toString());
  line.setAttributeNS(null, "stroke", strokeColor);
  line.setAttributeNS(null, "marker-end", "url(#arrowhead)");

  if (strokeWidth) {
    line.setAttributeNS(null, "stroke-width", strokeWidth);
  }

  return line;
}

export function updatePolygonElement(
  polygon: SVGPolygonElement,
  points: vec3[],
  color?: IColor,
  strokeWidth?: string
) {
  const pointsAttribute = makePointsAttributeValue(points);
  const colorValue = color ? color.value : "black";
  const strokeValue = (color && color.stroke) || "#000000";
  polygon.setAttributeNS(null, "points", pointsAttribute);
  polygon.setAttributeNS(null, "fill", colorValue);
  if (strokeWidth) {
    polygon.setAttributeNS(null, "stroke", strokeValue);
    polygon.setAttributeNS(null, "stroke-width", strokeWidth);
  }
  polygon.setAttributeNS(null, "stroke-linejoin", "round");
}

export function clearSVG(svg: SVGSVGElement) {
  while (svg.hasChildNodes()) {
    svg.removeChild(svg.lastChild);
  }
}

export function createMarkers(color: IColor): SVGDefsElement {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const arrowHeadMarker = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "marker"
  );
  arrowHeadMarker.setAttributeNS(null, "id", "arrowhead");
  arrowHeadMarker.setAttributeNS(null, "markerWidth", "5");
  arrowHeadMarker.setAttributeNS(null, "markerHeight", "3.5");
  arrowHeadMarker.setAttributeNS(null, "refX", "0");
  arrowHeadMarker.setAttributeNS(null, "refY", "1.75");
  arrowHeadMarker.setAttributeNS(null, "orient", "auto");

  const arrowHeadPolygon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  arrowHeadPolygon.setAttributeNS(null, "points", "0 0, 5 1.75, 0 3.5");
  arrowHeadPolygon.setAttributeNS(null, "fill", color.value);

  defs.appendChild(arrowHeadMarker);
  arrowHeadMarker.appendChild(arrowHeadPolygon);

  return defs;
}

function makePointsAttributeValue(points: vec3[]): string {
  return points.reduce((pointString, point) => {
    return `${pointString ? pointString + " " : ""}${point[0]}, ${point[1]}`;
  }, "");
}
