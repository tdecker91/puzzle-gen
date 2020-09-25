import { Group } from "../geometry/group";
import { IColor } from "../geometry/color";
import { vec3 } from "gl-matrix";
import { Plane } from "../geometry/plane";
import { Geometry } from "../geometry/geometry";
import { Triangle } from "../geometry/triangle";

export class Skewb {

  stickers: Geometry[];
  group: Group;

  constructor() {
    const cubeWidth = 1.25;
    const centerWidth = Math.sqrt(Math.pow(cubeWidth/2, 2) * 2);
    const halfWidth = cubeWidth/2;

    const red = this.makeStickers({value: '#FF0000'}, centerWidth);
    const yellow = this.makeStickers({value: '#FFFF00'}, centerWidth, [1,0,0]);
    const blue = this.makeStickers({value: '#0000FF'}, centerWidth, [0,1,0]);
    const orange = this.makeStickers({value: '#FFA500'}, centerWidth);
    const green = this.makeStickers({value: '#00FF00'}, centerWidth, [0,1,0]);
    const white = this.makeStickers({value: '#FFFFFF'}, centerWidth, [1,0,0]);

    red.forEach(sticker => sticker.translate([0,0,halfWidth]));
    orange.forEach(sticker => sticker.translate([0,0,-halfWidth]));
    blue.forEach(sticker => sticker.translate([0,0,-halfWidth]));
    green.forEach(sticker => sticker.translate([0,0,halfWidth]));
    yellow.forEach(sticker => sticker.translate([0,0,-halfWidth]));
    white.forEach(sticker => sticker.translate([0,0,halfWidth]));

    this.stickers = [...red, ...yellow, ...blue, ...orange, ...green, ...white];
    this.group = new Group(this.stickers);

    this.group.rotate(0.593411946, [1,0,0]);
    this.group.rotate(0.785398, [0,1,0]);
  }

  private makeStickers(
    color: IColor,
    width: number,
    axis?: vec3
  ): Geometry[] {
    const center = new Plane(width, width, color);
    if (axis) {
      center.rotate(Math.PI/2, axis);
    }
    center.rotate(Math.PI/4, [0,0,1]);
    center.translate([-width/2, width/2, 0]);

    const triangles = [];
    for (let i = 0; i < 4; i++) {
      const triangle = new Triangle(
        [-width/2, width/2, 0],
        [0, width, 0],
        [width/2, width/2, 0],
        color
      )
      if (axis) {
        triangle.rotate(Math.PI/2, axis);
      }
      triangle.rotate(Math.PI/2 * i, [0,0,1])
      triangle.rotate(Math.PI/4, [0,0,1]);
      triangles.push(triangle)
    }

    return [center, ...triangles];
  }

}