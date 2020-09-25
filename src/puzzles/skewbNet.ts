import { Group } from "../geometry/group";
import { IColor } from "../geometry/color";
import { vec3 } from "gl-matrix";
import { Plane } from "../geometry/plane";
import { Geometry } from "../geometry/geometry";
import { Triangle } from "../geometry/triangle";

export class SkewbNet {

  stickers: Geometry[];
  group: Group;

  constructor() {
    const cubeWidth = 1;
    const centerWidth = Math.sqrt(Math.pow(cubeWidth/2, 2) * 2);

    const red = this.makeStickers({value: '#FF0000'}, centerWidth, [-cubeWidth,0,0]);
    const yellow = this.makeStickers({value: '#FFFF00'}, centerWidth, [2*cubeWidth,0,0]);
    const blue = this.makeStickers({value: '#0000FF'}, centerWidth, [0,-cubeWidth,0]);
    const orange = this.makeStickers({value: '#FFA500'}, centerWidth, [cubeWidth,0,0]);
    const green = this.makeStickers({value: '#00FF00'}, centerWidth, [0,cubeWidth,0]);
    const white = this.makeStickers({value: '#FFFFFF'}, centerWidth, [0,0,0]);

    this.stickers = [...red, ...yellow, ...blue, ...orange, ...green, ...white];
    this.group = new Group(this.stickers);

    this.group.translate([-cubeWidth/4,0,0]);
    this.group.scale([.5,.5,.5]);
  }

  private makeStickers(
    color: IColor,
    width: number,
    translate: vec3
  ): Geometry[] {
    const center = new Plane(width, width, color);

    center.translate(translate);
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

      triangle.translate(translate);
      triangle.rotate(Math.PI/2 * i, [0,0,1])
      triangle.rotate(Math.PI/4, [0,0,1]);
      triangles.push(triangle)
    }

    return [center, ...triangles];
  }

}