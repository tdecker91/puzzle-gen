import { BLACK, GREY } from "./../puzzles/colors";
import { VisualizerType } from "./enum";
import { CustomSVGRenderer } from "./../rendering/customSvgRenderer";
import { Visualizer } from "./visualizer";
import { PuzzleOptions, validColor } from "./interface";
import { IColor } from "../geometry/color";

export interface SVGVisualizerOptions<T> {
  /**
   * Width of the svg element in pixels
   */
  width?: number;

  /**
   * Height of the svg element in pixels
   */
  height?: number;

  /**
   * SVG viewbox minx value
   */
  minx?: number;

  /**
   * SVG viewbox miny value
   */
  miny?: number;

  /**
   * SVG viewbox width value
   */
  svgWidth?: number;

  /**
   * SVG viewbox height value
   */
  svgHeight?: number;

  /**
   * stroke size for the sticker polygons drawn on the svg
   */
  strokeWidth?: number;

  /**
   * puzzle options for the cube to draw
   */
  puzzle?: T;

  /**
   * change the default arrow color for drawing arrows
   */
  arrowColor?: IColor;

  /**
   * change the default arrow stroke width
   *
   * @default 0.03
   */
  arrowStrokeWidth?: number;
}

const defaultOptions: SVGVisualizerOptions<any> = {
  width: 500,
  height: 500,
  minx: -0.9,
  miny: -0.9,
  svgWidth: 1.8,
  svgHeight: 1.8,
  strokeWidth: 0.02,
  arrowColor: GREY,
  arrowStrokeWidth: 0.03,
};

/**
 * Visualize puzzles with svg in a DOM
 */
export function SVG<T extends PuzzleOptions>(
  element: Element | string,
  type: VisualizerType,
  options: SVGVisualizerOptions<T> = {}
): Visualizer {
  return new SvgVisualizer(element, type, options);
}

export class SvgVisualizer<T extends PuzzleOptions> extends Visualizer {
  private svgOptions: SVGVisualizerOptions<T>;

  constructor(
    element: Element | string,
    type: VisualizerType,
    options: SVGVisualizerOptions<T> = {}
  ) {
    options = { ...defaultOptions, ...options };

    if (typeof element === "string") {
      element = document.querySelector(element as string);
      if (element === null) {
        throw new Error(
          `Could not find visuzlier element by query selector: ${element}`
        );
      }
    }

    const renderer = new CustomSVGRenderer(
      options.width,
      options.height,
      options.minx,
      options.miny,
      options.svgWidth,
      options.svgHeight,
      options.arrowColor
    );
    renderer.strokeWidth = "" + options.strokeWidth;

    element.appendChild(renderer.domElement);

    super(renderer, type, options.puzzle);

    this.svgOptions = options;
  }

  /**
   * Set the stroke width for the svg elements rendered and re draw the puzzle.
   *
   * @param strokeWidth - value to set the stroke width to. It depends on the svg options and puzzle size,
   *                      but good values are around .01 - .06
   */
  setStrokeWidth(strokeWidth: number) {
    this.svgOptions.strokeWidth = strokeWidth;
    (this.renderer as CustomSVGRenderer).strokeWidth =
      "" + this.svgOptions.strokeWidth;
    this.render();
  }

  /**
   * Dynamically update the svg element options
   *
   * @param options - options for the svg element that is being rendered to
   */
  setSvgOptions(options: SVGVisualizerOptions<T>) {
    this.svgOptions = { ...defaultOptions, ...options };
    validateSvgOptions(this.svgOptions);

    const renderer: CustomSVGRenderer = this.renderer as CustomSVGRenderer;
    const svgElement: SVGElement = renderer.svgElement;

    renderer.strokeWidth = "" + this.svgOptions.strokeWidth;
    renderer.arrowStrokeWidth = "" + this.svgOptions.arrowStrokeWidth;
    svgElement.setAttributeNS(null, "width", this.svgOptions.width.toString());
    svgElement.setAttributeNS(null, "height", this.svgOptions.width.toString());

    svgElement.setAttributeNS(
      null,
      "viewBox",
      `${this.svgOptions.minx} ${this.svgOptions.miny} ${this.svgOptions.svgWidth} ${this.svgOptions.svgHeight}`
    );

    this.render();
  }
}

function validateSvgOptions(options: SVGVisualizerOptions<any>) {
  if (!Number.isInteger(options.width)) {
    console.warn(`invalid svg width ${options.width}. Must be a whole number`);
    options.width = defaultOptions.width;
  }

  if (!Number.isInteger(options.height)) {
    console.warn(
      `invalid svg height ${options.height}. Must be a whole number`
    );
    options.width = defaultOptions.height;
  }

  if (!Number.isFinite(options.minx)) {
    console.warn(`invalid svg minx ${options.minx}`);
    options.minx = defaultOptions.minx;
  }

  if (!Number.isFinite(options.miny)) {
    console.warn(`invalid svg miny ${options.miny}`);
    options.minx = defaultOptions.miny;
  }

  if (!Number.isFinite(options.svgWidth)) {
    console.warn(`invalid svgWidth ${options.svgWidth}`);
    options.minx = defaultOptions.svgWidth;
  }

  if (!Number.isFinite(options.svgHeight)) {
    console.warn(`invalid svgHeight ${options.svgHeight}`);
    options.minx = defaultOptions.svgHeight;
  }

  if (!Number.isFinite(options.strokeWidth)) {
    console.warn(`invalid strokeWidth ${options.strokeWidth}`);
    options.minx = defaultOptions.strokeWidth;
  }

  if (!Number.isFinite(options.arrowStrokeWidth)) {
    console.warn(`invalid arrowStrokeWidth ${options.arrowStrokeWidth}`);
    options.minx = defaultOptions.arrowStrokeWidth;
  }

  if (options.arrowColor && !validColor(options.arrowColor)) {
    options.arrowColor = BLACK;
  }
}
