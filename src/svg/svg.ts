import { vec3 } from "gl-matrix";
import { IColor } from "../geometry/color";

export function createSVGElement(width: number, height: number, minx: number, miny: number, svgWidth: number, svgHeight: number): SVGSVGElement {
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttributeNS(null, 'width', width.toString());
  svgElement.setAttributeNS(null, 'height', height.toString());
  svgElement.setAttributeNS(null, 'viewBox', `${minx} ${miny} ${svgWidth} ${svgHeight}`);
  svgElement.setAttributeNS(null, 'id', 'sr-visualizer');
  return svgElement;
}

export function createPolygonElement(points: vec3[], color?: IColor): SVGPolygonElement {
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  const pointsAttribute = points.reduce((pointString, point) => {
    return `${pointString ? pointString + ' ' : ''}${point[0]}, ${point[1]}`
  }, '');
  polygon.setAttributeNS(null, 'points', pointsAttribute);
  polygon.setAttributeNS(null, 'fill', color.value);
  return polygon;
}

export function clearSVG(svg: SVGSVGElement) {
  while (svg.hasChildNodes()) {
    svg.removeChild(svg.lastChild);
  }
}