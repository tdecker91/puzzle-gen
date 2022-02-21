import { PuzzleOptions, Visualizer } from ".";
import { VisualizerType } from "./enum";
import { HtmlCanvasRenderer } from "../rendering/htmlCanvasRenderer";
import { IColor } from "../geometry/color";
import { GREY } from "../puzzles/colors";

export type CanvasVisualizerOptions = {
  width?: number;
  height?: number;
  lineWidth?: number;
  arrowColor?: IColor;
  puzzle?: PuzzleOptions;
};

const defaultOptions = {
  width: 500,
  height: 500,
  lineWidth: 5,
  arrowColor: GREY,
};

/**
 * Visualize puzzles with canvas
 */
export function Canvas(
  element: Element | string,
  type: VisualizerType,
  options: CanvasVisualizerOptions = {}
): Visualizer {
  return new CanvasVisualizer(element, type, options);
}

export class CanvasVisualizer extends Visualizer {
  constructor(
    element: Element | string,
    type: VisualizerType,
    options: CanvasVisualizerOptions
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

    const renderer = new HtmlCanvasRenderer(
      options.width,
      options.height,
      options.lineWidth,
      options.arrowColor
    );

    element.appendChild(renderer.domElement);

    super(renderer, type, options.puzzle);
  }
}
