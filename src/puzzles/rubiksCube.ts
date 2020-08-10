import { Plane } from "../geometry/plane";
import { IColor } from "../geometry/color";
import { vec3 } from "gl-matrix";
import { Group } from "../geometry/group";
import { Cube } from "../geometry/cube";

export class RubiksCube {

  stickers: Plane[];
  cube: Cube;
  group: Group;

  constructor(size: number) {
    const width = 1/2;
    const spacing = .02;
    const cubeWidth = (width * size) + (spacing * (size + 1));
    const halfWidth = cubeWidth/2;

    const red = this.makeStickers(size, {value: '#FF0000'}, width, spacing);
    const orange = this.makeStickers(size, {value: '#FFA500'}, width, spacing);
    const blue = this.makeStickers(size, {value: '#0000FF'}, width, spacing, [0,1,0]);
    const green = this.makeStickers(size, {value: '#00FF00'}, width, spacing, [0,1,0]);
    const yellow = this.makeStickers(size, {value: '#FFFF00'}, width, spacing, [1,0,0]);
    const white = this.makeStickers(size, {value: '#FFFFFF'}, width, spacing, [1,0,0]);

    red.forEach(sticker => sticker.translate([0,0,halfWidth]));
    orange.forEach(sticker => sticker.translate([0,0,-halfWidth]));
    blue.forEach(sticker => sticker.translate([0,0,-halfWidth]));
    green.forEach(sticker => sticker.translate([0,0,halfWidth]));
    yellow.forEach(sticker => sticker.translate([0,0,-halfWidth]));
    white.forEach(sticker => sticker.translate([0,0,halfWidth]));

    this.stickers = [...red, ...orange, ...blue, ...green, ...yellow, ...white];

    this.group = new Group(this.stickers);

    this.group.rotate(0.593411946, [1,0,0]);
    this.group.rotate(0.785398, [0,1,0]);
  }

  private makeStickers(
    size: number,
    color: IColor,
    width: number,
    spacing: number,
    axis?: vec3
  ): Plane[] {
    let stickers = [];
    const cubeWidth = (width * size) + (spacing * (size + 1));
    const halfWidth = cubeWidth/2;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let sticker = new Plane(width, width, color);
        if (axis) {
          sticker.rotate(Math.PI/2, axis);
        }
        sticker.translate([
          spacing + (i * (width + spacing)) - halfWidth,
          0 - spacing - (j * (width + spacing)) + halfWidth,
          0
        ]);
        stickers.push(sticker)
      }
    }
    return stickers;
  }
}