import { vec2 } from "gl-matrix";

export function polarToCartesian(radius: number, theta: number): vec2 {
  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);

  return [x, y];
}

export function lineSegmentLength(p1: vec2, p2: vec2): number {
  return Math.sqrt(Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[0] - p1[0], 2));
}