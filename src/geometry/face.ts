import { calculateCentroid } from "../math/utils";
import { Vector3 } from "../math/vector";
import { IColor } from "./color";
import { generateUid } from "./uid";

export interface IFace {
  indices: number[];
  centroid: Vector3;
  color?: IColor;
  uid: number;
}

/**
 * Face that will render as a puzzle sticker
 */
export class Face implements IFace {
  indices: number[];
  color?: IColor;
  centroid: Vector3;
  uid: number;

  /**
   * @param indices indices of vertices that make up a face
   * @param vertices vertices of the geometry to calculate centroid from
   * @param color color of the sticker
   */
  constructor(indices: number[], vertices: Vector3[], color?: IColor) {
    this.indices = indices;
    this.color = color;
    this.uid = generateUid();

    if (vertices) {
      this.calculateCentroid(vertices);
    }
  }

  /**
   * recalculate the centroid of the face.
   */
  calculateCentroid(vertices: Vector3[]) {
    this.centroid = calculateCentroid(
      // Calculate centroid from vertices included in the face
      vertices.filter((v, i) => this.indices.includes(i))
    );
  }
}
