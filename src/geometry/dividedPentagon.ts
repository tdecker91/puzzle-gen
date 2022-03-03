import { IColor } from "./color";
import { IFace, Face } from "./../geometry/face";
import { Geometry } from "../geometry/geometry";
import {
  polarToCartesian,
  lineSegmentLength,
  pentagonInRadius,
  pentagonOutRadius,
} from "../math/utils";
import { Vector2, Vector3 } from "../math/vector";

export class DividedPentagon extends Geometry {
  /**
   *
   * @param color
   * @param layers number of layers
   * @param length length of entire edge of the outer pentagon
   */
  constructor(
    color: IColor,
    layers: number = 2,
    length: number = 1.6,
    layerWidth: number = 0.4 // TODO: calculate this somehow
  ) {
    const outRadius = pentagonOutRadius(length);

    const radiusDiff = layerWidthToRadiusDiff(layerWidth);
    const centerOutRadius = outRadius - radiusDiff * (layers - 1);

    const vertices = faceVerticies(
      layers,
      centerOutRadius,
      radiusDiff,
      layerWidth
    );

    super(vertices, makeFaces(layers, color, vertices));
  }
}

/**
 * Given the the distance between two parallel sides of the
 * dividen pentagon, calculate the difference in pentagon radius
 */
function layerWidthToRadiusDiff(width: number): number {
  const aSquared = width * width;
  const angleRadians = (71 * Math.PI) / 180;

  // Law of cosines
  const cSquared = 2 * aSquared - 2 * aSquared * Math.cos(angleRadians);
  const diff = 2 * Math.sqrt(Math.abs(aSquared - cSquared));

  return diff;
}

/**
 * creates mapping for indicies in one layer to another
 * so we can build the geometry for a megaminx face
 */
function downMapping(layer) {
  if (layer < 1) {
    return [];
  }

  let mapping = [];
  const layerPoints = 5 + (layer - 1) * 10;
  let previousPoints = 5 * (layer - 1) * (layer - 1);

  for (let i = 0; i < layerPoints; i++) {
    mapping.push(i + previousPoints);
    if (i % (layerPoints / 5) === 0) {
      mapping.push(i + previousPoints);
    }
  }

  mapping.push(mapping.shift());
  mapping.push(mapping.shift());

  return mapping;
}

function layerVertexNumbers(layer) {
  let previousPoints = 5 * layer * layer;
  let vertexNumbers = [];

  for (let i = 0, layerPoints = 5 + layer * 10; i < layerPoints; i++) {
    vertexNumbers.push(i + previousPoints);
  }

  return vertexNumbers;
}

function makeFaces(
  layers: number,
  color: IColor,
  vertices: Vector3[]
): IFace[] {
  let faces: IFace[] = [];

  const firstLayerFace = new Face([0, 1, 2, 3, 4], vertices, color);
  faces.push(firstLayerFace);

  let totalPoints = 5;
  let currentPoint = 5;
  for (let i = 1; i < layers; i++) {
    const layerPoints = 5 + i * 10;
    totalPoints += layerPoints;
    const downMap = downMapping(i);
    const prevLayer = layerVertexNumbers(i - 1);
    const currentLayer = layerVertexNumbers(i);

    while (currentPoint < totalPoints) {
      const currentLayerPoint =
        currentPoint - (prevLayer[prevLayer.length - 1] + 1);
      const f1isCorner = currentLayerPoint % (layerPoints / 5) === 0;

      if (f1isCorner) {
        currentPoint++;
        continue;
      }

      const f2isCorner = (currentLayerPoint + 1) % (layerPoints / 5) === 0;
      let f1 = currentPoint;
      let f2 = currentLayer[(currentLayerPoint + 1) % currentLayer.length];
      let f3 = f2isCorner ? f2 + 1 : downMap.shift();
      let f4 = f2isCorner
        ? downMap.shift()
        : prevLayer[
            (prevLayer.indexOf(f3) - 1 + prevLayer.length) % prevLayer.length
          ];
      currentPoint++;

      faces.push(new Face([f1, f2, f3, f4], vertices, color));
    }
  }

  return faces;
}

/**
 * Takes two points and extrapolates points along the line they make
 *
 * @param p1 point 1
 * @param p2 point 2
 * @param segments how many points to extrapolate from each direction p1 -> p2 and p2 -> p1
 */
function segmentPoints(
  p1: Vector2,
  p2: Vector2,
  segments: number,
  layerWidth: number
): Vector3[] {
  if (segments === 0) {
    return [
      Vector3.fromValues(p1.x, p1.y, 0),
      Vector3.fromValues(p2.x, p2.y, 0),
    ];
  }

  const length: number = lineSegmentLength(p1, p2);

  let points: Vector3[] = [];
  for (let i = segments; i > 0; i--) {
    // extrapolate from p1.v
    let a: Vector3 = Vector3.fromValues(
      p1.x + ((p2.x - p1.x) / length) * layerWidth * i,
      p1.y + ((p2.y - p1.y) / length) * layerWidth * i,
      0
    );
    points.unshift(a);

    // extrapolate from p2.v
    let b: Vector3 = Vector3.fromValues(
      p2.x + ((p1.x - p2.x) / length) * layerWidth * i,
      p2.y + ((p1.y - p2.y) / length) * layerWidth * i,
      0
    );
    points.push(b);
  }

  points.unshift(Vector3.fromValues(p1.x, p1.y, 0));
  points.push(Vector3.fromValues(p2.x, p2.y, 0));

  return points;
}

function layerVerticies(
  layer: number,
  radius: number,
  layerWidth: number
): Vector3[] {
  let verticies: Vector3[] = [];

  for (let i = 0; i < 5; i++) {
    const theta = (i * (2 * Math.PI)) / 5 - Math.PI / 10;
    const v = polarToCartesian(radius, theta);

    if (verticies.length > 0) {
      const lastPoint = verticies[verticies.length - 1];
      const points = segmentPoints(
        Vector2.fromValues(lastPoint.x, lastPoint.y),
        v,
        layer,
        layerWidth
      );
      points.shift(); // Remove the first, otherwise it's duplicated

      verticies = verticies.concat(points);
    } else {
      verticies.push(Vector3.fromValues(v.x, v.y, 0));
    }
  }

  // Insert segments for last and first
  const first = verticies[0];
  const last = verticies[verticies.length - 1];
  const points = segmentPoints(
    Vector2.fromValues(last.x, last.y),
    Vector2.fromValues(first.x, first.y),
    layer,
    layerWidth
  );
  points.pop();
  points.shift();
  verticies = verticies.concat(points);

  return verticies;
}

function faceVerticies(
  layers: number,
  radius: number,
  radiusDiff: number,
  layerWidth: number
): Vector3[] {
  let verticies: Vector3[] = [];

  for (let i = 0; i < layers; i++) {
    const r = radius + radiusDiff * i;
    verticies = [...verticies, ...layerVerticies(i, r, layerWidth)];
  }

  return verticies;
}
