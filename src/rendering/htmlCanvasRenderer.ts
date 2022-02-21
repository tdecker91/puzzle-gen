import { vec3 } from "gl-matrix";
import { IColor } from "../geometry/color";
import { BLACK } from "../puzzles/colors";
import { Polygon, PolygonRenderer } from "./polygonRenderer";

export class HtmlCanvasRenderer extends PolygonRenderer {
  /**
   * dom element containing canvas
   */
  domElement: HTMLElement;

  /**
   * canvas element
   */
  canvasElement: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private lineWidth: number;
  private arrowColor: IColor;

  constructor(
    width: number,
    height: number,
    lineWidth: number = 5,
    arrowColor: IColor = BLACK
  ) {
    super();
    this.width = width;
    this.height = height;
    this.lineWidth = lineWidth;
    this.arrowColor = arrowColor;

    this.domElement = document.createElement("div");
    this.domElement.className = "canvas-renderer";
    this.canvasElement = document.createElement("canvas");
    this.domElement.appendChild(this.canvasElement);
    this.canvasElement.width = width;
    this.canvasElement.height = height;

    this.ctx = this.canvasElement.getContext("2d");
  }
  /**
   * Visualizer point values will be in range (-.9, .9)
   * Convert these values to canvas points (0, imgSize)
   * using linear interpolation
   *
   * really the camera matrix should be set up properly
   * so we don't have to do this...
   */
  private convertRange(n: number, range): number {
    return ((n - -0.9) / (0.9 - -0.9)) * range;
  }

  drawPolygon(polygon: Polygon) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineJoin = "round";
    this.ctx.fillStyle = polygon?.face?.color?.value || "#000000";
    this.ctx.strokeStyle = "#000000";

    this.ctx.moveTo(
      this.convertRange(polygon.points[0][0], this.width),
      this.convertRange(polygon.points[0][1], this.height)
    );
    this.ctx.beginPath();
    for (let i = 0; i <= polygon.points.length; i++) {
      let point = polygon.points[(i + 1) % polygon.points.length];
      this.ctx.lineTo(
        this.convertRange(point[0], this.width),
        this.convertRange(point[1], this.height)
      );
    }

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawArrow(p1: vec3, p2: vec3, uid: string) {
    const toX = this.convertRange(p2[0], this.width);
    const toY = this.convertRange(-p2[1], this.height);
    const fromX = this.convertRange(p1[0], this.width);
    const fromY = this.convertRange(-p1[1], this.height);
    const headlen = 20; // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    this.ctx.strokeStyle = this.arrowColor.value;
    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.lineTo(
      toX - headlen * Math.cos(angle - Math.PI / 6),
      toY - headlen * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.moveTo(toX, toY);
    this.ctx.lineTo(
      toX - headlen * Math.cos(angle + Math.PI / 6),
      toY - headlen * Math.sin(angle + Math.PI / 6)
    );
    this.ctx.stroke();
  }

  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }

  onComplete() {}
}
