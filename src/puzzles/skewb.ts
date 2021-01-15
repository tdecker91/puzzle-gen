import { Geometry } from './../geometry/geometry';
import { Object3D } from './../geometry/object3d';
import { RED, YELLOW, BLUE, ORANGE, GREEN, WHITE } from './colors';
import { Group } from "../geometry/group";
import { IColor } from "../geometry/color";
import { vec3 } from "gl-matrix";
import { Plane } from "../geometry/plane";
import { Triangle } from "../geometry/triangle";
import { chunkArray } from '../utils/arrays';

export class Skewb {

  stickers: Object3D[];
  group: Group;

  private U: Group;
  private R: Group;
  private F: Group;
  private D: Group;
  private L: Group;
  private B: Group;

  constructor() {
    const cubeWidth = 1.25;
    const centerWidth = Math.sqrt(Math.pow(cubeWidth/2, 2) * 2);
    const halfWidth = cubeWidth/2;

    const red = new Group(this.makeStickers(RED, centerWidth));
    const yellow = new Group(this.makeStickers(YELLOW, centerWidth, [1,0,0]));
    const blue = new Group(this.makeStickers(BLUE, centerWidth, [0,1,0]));
    const orange = new Group(this.makeStickers(ORANGE, centerWidth));
    const green = new Group(this.makeStickers(GREEN, centerWidth, [0,1,0]));
    const white = new Group(this.makeStickers(WHITE, centerWidth, [1,0,0]));

    this.U = yellow;
    this.R = red;
    this.F = blue;
    this.L = orange;
    this.B = green;
    this.D = white;

    red.translate([0,0,halfWidth]);
    red.rotate(Math.PI, [1,0,0])
    red.rotate(Math.PI/2, [0,0,1])

    orange.rotate(-Math.PI/2, [0,0,1]);
    orange.translate([0,0,-halfWidth]);

    blue.rotate(-Math.PI/2, [1,0,0]);
    blue.translate([-halfWidth,0,0]);

    green.translate([halfWidth,0,0]);
    green.rotate(Math.PI, [0,1,0]);
    green.rotate(-Math.PI/2, [1,0,0]);

    yellow.rotate(Math.PI, [0,1,0]);
    yellow.translate([0,halfWidth,0]);

    white.translate([0,-halfWidth,0]);
    white.rotate(Math.PI, [1,0,0]);

    this.stickers = [red, yellow, blue, orange, green, white];
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

  setColors(colors: IColor[]) {
    const numStickers =  5;
    let [u,r,f,d,l,b] = chunkArray<IColor>(colors, numStickers);

    console.log(u,r,f,d,l,b);

    this.setFaceColors(this.U, u);
    this.setFaceColors(this.R, r);
    this.setFaceColors(this.F, f);
    this.setFaceColors(this.D, d);
    this.setFaceColors(this.L, l);
    this.setFaceColors(this.B, b);
  }

  private setFaceColors(faceStickers: Group, colors: IColor[]) {
    (<any>faceStickers).objects[0].faces[0].color = colors[0];
    (<any>faceStickers).objects[1].faces[0].color = colors[1];
    (<any>faceStickers).objects[2].faces[0].color = colors[2];
    (<any>faceStickers).objects[3].faces[0].color = colors[4]; // Setting 3 -> 4 and 4 -> 3 now because 4 and 3 are stored incorrectly in this class.
    (<any>faceStickers).objects[4].faces[0].color = colors[3];
  }

}