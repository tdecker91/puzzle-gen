import { vec2 } from "gl-matrix";

export function polarToCartesian(radius: number, theta: number): vec2 {
  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);

  return [x, y];
}

export function lineSegmentLength(p1: vec2, p2: vec2): number {
  return Math.sqrt(Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[0] - p1[0], 2));
}

/**
 * Calculates the radius of a circle inscribing a regular
 * pentagon given the side length
 */
export function pentagonInRadius(length: number): number {
  return length / (2 * Math.tan(Math.PI/5));
}

/**
 * Calculates the radius of a circle circumscribing a 
 * regular pentagon given the side length
 */
export function pentagonOutRadius(length: number): number {
  return length / (2 * Math.sin(Math.PI/5));
}

/**
 * Calculates the radius of the sphere that inscribes a
 * regular dodecahedron given the side length
 */
export function dodecahedronInRadius(length: number): number {
  return (length/2) * Math.sqrt((5/2) + ((11/10) * Math.sqrt(5)));
}