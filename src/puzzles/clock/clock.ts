import { Circle } from "../../geometry/circle";
import { IColor } from "../../geometry/color";
import { Face } from "../../geometry/face";
import { Geometry } from "../../geometry/geometry";
import { Group } from "../../geometry/group";
import { Object3D } from "../../geometry/object3d";
import { polarToCartesian } from "../../math/utils";
import { Vector3 } from "../../math/vector";
import { YELLOW } from "../colors";
import { CLOCK_BACKGROUND_VERTICES } from "./data";

const GRID_GAP = 0.625;
const FACE_RADIUS = 0.195;
const FACE_SUBDIVISIONS = 24;
const PEG_RADIUS = FACE_RADIUS / 2;
const DIAL_SUBDIVISIONS = 8;
const DIAL_LENGTH = 0.16;
const DIAL_RADIUS = 0.055;

const FRONT_COLOR: IColor = { value: "#114fd4" };
const BACK_COLOR: IColor = { value: "#a1bfff" };

export class Clock {
  objects: Object3D[];
  group: Group;
  faces: { [face: string]: Group | Geometry };

  private front: Group;
  private back: Group;

  private frontDials: Geometry[];
  private backDials: Geometry[];

  constructor(top, bottom, pegs, flipped) {
    this.front = new Group();
    this.back = new Group();

    let frontColor = FRONT_COLOR;
    let backColor = BACK_COLOR;

    if (flipped) {
      frontColor = BACK_COLOR;
      backColor = FRONT_COLOR;
    }

    this.front.addObject(clockBackground(frontColor));
    this.back.addObject(clockBackground(backColor));

    let frontFaces = clockFaces(backColor);
    let backFaces = clockFaces(frontColor);

    this.front.addObject(frontFaces);
    this.back.addObject(backFaces);

    let frontPegs = clockPegs();
    let backPegs = clockPegs();

    frontPegs.forEach((p) => this.front.addObject(p));
    backPegs.forEach((p) => this.back.addObject(p));

    this.frontDials = clockDials(top);
    this.backDials = clockDials(bottom);

    this.frontDials.forEach((d) => this.front.addObject(d));
    this.backDials.forEach((d) => this.back.addObject(d));

    this.front.translate(-1.1, 0, 0);
    this.back.translate(1.1, 0, 0);

    this.group = new Group([this.front, this.back]);

    this.group.scale(0.5, 0.5, 0.5);
  }

  /**
   * Not implemented. Just here for {@link Visualizer}'s sake
   */
  public setColors(colors: { [face: string]: IColor[] }) {}
}

function clockBackground(color: IColor): Geometry {
  let vertices = [];
  let faceIndices = [];

  CLOCK_BACKGROUND_VERTICES.forEach((v, i) => {
    vertices.push(Vector3.fromValues(v[0], v[1], 0));
    faceIndices.push(i);
  });

  return new Geometry(vertices, [new Face(faceIndices, vertices, color)]);
}

function clockFaces(color: IColor): Group {
  let faces = new Group();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const face = new Circle(FACE_RADIUS, FACE_SUBDIVISIONS, color);
      const hours = clockHours();
      let x = -GRID_GAP + j * GRID_GAP;
      let y = -GRID_GAP + i * GRID_GAP;
      face.translate(x, y, 0.01);
      hours.translate(x, y, 0.01);
      faces.addObject(face);
      faces.addObject(hours);
    }
  }
  return faces;
}

function clockPegs(): Geometry[] {
  let pegs = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const peg = new Circle(PEG_RADIUS, FACE_SUBDIVISIONS, YELLOW);
      let x = j == 0 ? -0.325 : 0.325;
      let y = i == 0 ? -0.325 : 0.325;
      peg.translate(x, y, 0.01);
      pegs.push(peg);
    }
  }
  return pegs;
}

function clockHours(): Group {
  let circles = new Group();
  for (let i = 0; i < 12; i++) {
    let circle = new Circle(0.01, 4, { value: "#FFF", stroke: "#FFF" });
    let position = polarToCartesian(
      FACE_RADIUS + 0.04,
      0 + Math.PI * i * (2 / 12)
    );
    circle.translate(position.x, position.y, 0.02);
    circles.addObject(circle);
  }

  return circles;
}

function clockDials(values) {
  let dials = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const dialValue = values && values[i * 3 + j];
      const d = dial();
      let x = -GRID_GAP + j * GRID_GAP;
      let y = -(-GRID_GAP + i * GRID_GAP);
      d.translate(x, y, 0.02);
      if (dialValue > 0) {
        d.rotate(-(Math.PI / 6) * dialValue, 0, 0, 1);
      }
      dials.push(d);
    }
  }
  return dials;
}

function dial(): Geometry {
  let vertices = [];
  let faceIndices = [];
  for (let i = 0; i <= DIAL_SUBDIVISIONS; i++) {
    vertices.push(
      Vector3.fromVec2(
        polarToCartesian(
          DIAL_RADIUS,
          Math.PI + (Math.PI / DIAL_SUBDIVISIONS) * i
        )
      )
    );
    faceIndices.push(i);
  }

  vertices.push(Vector3.fromValues(0, DIAL_LENGTH, 0));
  faceIndices.push(vertices.length - 1);

  const dialGeometry = new Geometry(vertices, [
    new Face(faceIndices, vertices, YELLOW),
  ]);
  dialGeometry.translate(0, 0, 0.02);

  return dialGeometry;
}
