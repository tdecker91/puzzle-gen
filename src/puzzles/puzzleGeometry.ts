import { Geometry } from "./../geometry/geometry";
import { Object3D } from "./../geometry/object3d";
import { IColor } from "../geometry/color";
import { Group } from "../geometry/group";

/**
 * Represents puzzle geometry
 */
export interface PuzzleGeometry {
  /**
   * Group that contains the 3D objects for the puzzle
   */
  group: Group;

  faces: { [face: string]: Group | Geometry };

  setColors: (colors: { [face: string]: IColor[] }) => void;
}
