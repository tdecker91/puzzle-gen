import { vec3 } from "gl-matrix";
import { calculateCentroid } from "../math/utils";
import { IColor } from "./color";

export interface IFace {
  indices: number[];
  centroid: vec3;
  color?: IColor;
}

/**
 * Face that will render as a puzzle sticker
 */
export class Face implements IFace {
  indices: number[];
  color?: IColor;
  centroid: vec3;

  /**
   * @param indices indices of vertices that make up a face
   * @param vertices vertices of the geometry to calculate centroid from
   * @param color color of the sticker
   */
  constructor(indices: number[], vertices: vec3[], color?: IColor) {
    this.indices = indices;
    this.color = color;

    if (vertices) {
      this.centroid = calculateCentroid(
        // Calculate centroid from vertices included in the face
        vertices.filter((v, i) => indices.includes(i))
      );
    }
  }
}