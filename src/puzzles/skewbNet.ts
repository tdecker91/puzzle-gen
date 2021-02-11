import { Object3D } from "./../geometry/object3d";
import { RED, YELLOW, BLUE, ORANGE, GREEN, WHITE, BLACK } from "./colors";
import { Group } from "../geometry/group";
import { IColor } from "../geometry/color";
import { vec3 } from "gl-matrix";
import { Plane } from "../geometry/plane";
import { Geometry } from "../geometry/geometry";
import { Triangle } from "../geometry/triangle";
import { chunkArray } from "../utils/arrays";

export class SkewbNet {
  stickers: Object3D[];
  group: Group;
  faces: { [face: string]: Group };

  private U: Group;
  private R: Group;
  private F: Group;
  private D: Group;
  private L: Group;
  private B: Group;

  constructor() {
    const cubeWidth = 1;
    const centerWidth = Math.sqrt(Math.pow(cubeWidth / 2, 2) * 2);

    const orange = new Group(
      this.makeStickers(ORANGE, centerWidth, [-cubeWidth, 0, 0])
    );
    const green = new Group(
      this.makeStickers(GREEN, centerWidth, [2 * cubeWidth, 0, 0])
    );
    const white = new Group(
      this.makeStickers(WHITE, centerWidth, [0, -cubeWidth, 0])
    );
    const red = new Group(
      this.makeStickers(RED, centerWidth, [cubeWidth, 0, 0])
    );
    const yellow = new Group(
      this.makeStickers(YELLOW, centerWidth, [0, cubeWidth, 0])
    );
    const blue = new Group(this.makeStickers(BLUE, centerWidth, [0, 0, 0]));

    this.U = yellow;
    this.R = red;
    this.F = blue;
    this.L = orange;
    this.B = green;
    this.D = white;

    this.faces = {
      top: this.U,
      front: this.F,
      right: this.R,
      back: this.B,
      left: this.L,
      bottom: this.D,
    };

    this.stickers = [red, yellow, blue, orange, green, white];
    this.group = new Group(this.stickers);

    this.group.translate([-cubeWidth / 4, 0, 0]);
    this.group.scale([0.5, 0.5, 0.5]);
  }

  private makeStickers(
    color: IColor,
    width: number,
    translate: vec3
  ): Geometry[] {
    const center = new Plane(width, width, color);

    center.translate(translate);
    center.rotate(Math.PI / 4, [0, 0, 1]);
    center.translate([-width / 2, width / 2, 0]);

    const triangles = [];
    for (let i = 0; i < 4; i++) {
      const triangle = new Triangle(
        [-width / 2, width / 2, 0],
        [0, width, 0],
        [width / 2, width / 2, 0],
        color
      );

      triangle.translate(translate);
      triangle.rotate((-Math.PI / 2) * i, [0, 0, 1]);
      triangle.rotate(Math.PI / 4, [0, 0, 1]);
      triangles.push(triangle);
    }

    return [center, ...triangles];
  }

  setColors(colors: { [face: string]: IColor[] }) {
    let { top, right, front, bottom, left, back } = colors;

    this.setFaceColors(this.U, top);
    this.setFaceColors(this.R, right);
    this.setFaceColors(this.F, front);
    this.setFaceColors(this.D, bottom);
    this.setFaceColors(this.L, left);
    this.setFaceColors(this.B, back);
  }

  private setFaceColors(faceStickers: Group, colors: IColor[] = []) {
    (<any>faceStickers).objects[0].faces[0].color = colors[0] || BLACK;
    (<any>faceStickers).objects[1].faces[0].color = colors[1] || BLACK;
    (<any>faceStickers).objects[2].faces[0].color = colors[2] || BLACK;
    (<any>faceStickers).objects[3].faces[0].color = colors[4] || BLACK; // Setting 3 -> 4 and 4 -> 3 now because 4 and 3 are stored incorrectly in this class.
    (<any>faceStickers).objects[4].faces[0].color = colors[3] || BLACK;
  }
}
