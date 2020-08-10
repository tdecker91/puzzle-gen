import { Plane } from "../geometry/plane";
import { IColor } from "../geometry/color";
import { vec3 } from "gl-matrix";
import { Group } from "../geometry/group";

export class RubiksCubeNet {
  stickers: Plane[];
  group: Group; 

  constructor(size: number) {
    const width = 1/2;
    const spacing = .01;
    const cubeWidth = (width * size) + (spacing * (size + 1));

    const red = this.makeStickers(size, {value: '#FF0000'}, width, spacing);
    const orange = this.makeStickers(size, {value: '#FFA500'}, width, spacing);
    const blue = this.makeStickers(size, {value: '#0000FF'}, width, spacing);
    const green = this.makeStickers(size, {value: '#00FF00'}, width, spacing);
    const yellow = this.makeStickers(size, {value: '#FFFF00'}, width, spacing);
    const white = this.makeStickers(size, {value: '#FFFFFF'}, width, spacing);

    red.forEach(sticker => sticker.translate([-cubeWidth,0,0]));
    green.forEach(sticker => sticker.translate([0,cubeWidth,0]));
    blue.forEach(sticker => sticker.translate([0,-cubeWidth,0]));
    orange.forEach(sticker => sticker.translate([cubeWidth,0,0]));
    yellow.forEach(sticker => sticker.translate([2*cubeWidth,0,0]));

    this.stickers = [...red, ...orange, ...blue, ...green, ...yellow, ...white];

    this.group = new Group(this.stickers);
  }

  private makeStickers(
    size: number,
    color: IColor,
    width: number,
    spacing: number
  ): Plane[] {
    let stickers = [];
    const cubeWidth = (width * size) + (spacing * (size + 1));
    const halfWidth = cubeWidth/2;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let sticker = new Plane(width, width, color);
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