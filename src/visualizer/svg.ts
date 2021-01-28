import { VisualizerType } from "./enum";
import { CustomSVGRenderer } from "./../rendering/customSvgRenderer";
import { Visualizer } from "./visualizer";
import { PuzzleOptions } from "./interface";

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
}

const defaultOptions: SVGVisualizerOptions<any> = {
  width: 500,
  height: 500,
  minx: -0.9,
  miny: -0.9,
  svgWidth: 1.8,
  svgHeight: 1.8,
  strokeWidth: 0.02,
};

/**
 * Visualize puzzles with svg in a DOM
 */
export function SVG<T extends PuzzleOptions>(
  element: Element | string,
  type: VisualizerType,
  options: SVGVisualizerOptions<T> = {}
): Visualizer {
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
    options.svgHeight
  );
  renderer.strokeWidth = "" + options.strokeWidth;

  element.appendChild(renderer.domElement);

  return new Visualizer(renderer, type, options.puzzle);
}
