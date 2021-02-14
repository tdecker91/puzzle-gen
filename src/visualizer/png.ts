import { GREY } from "./../puzzles/colors";
import { VisualizerType } from "./enum";
import { PuzzleOptions } from "./interface";
import { SVG, SVGVisualizerOptions } from "./svg";

export interface PNGVisualizerOptions<T> extends SVGVisualizerOptions<T> {}

const defaultOptions: PNGVisualizerOptions<any> = {
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
 * Creates PNG element
 */
export function PNG<T extends PuzzleOptions>(
  container: Element | string,
  type: VisualizerType,
  options: PNGVisualizerOptions<T> = {}
) {

  if (typeof container === "string") {
    container = document.querySelector(container as string);
    if (container === null) {
      throw new Error(
        `Could not find visuzlier element by query selector: ${container}`
      );
    }
  }

  let element = document.createElement("div");
  options = { ...defaultOptions, ...options };

  SVG(element, type, options);

  setTimeout(() => {
    let svgElement = element.querySelector("svg");
    let targetImage = document.createElement("img");
    (container as Element).appendChild(targetImage);

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let loader = new Image();

    loader.width = canvas.width = targetImage.width = options.width;
    loader.height = canvas.height = targetImage.height = options.height;
    loader.onload = function() {
      ctx.drawImage(loader, 0, 0, loader.width, loader.height);
      targetImage.src = canvas.toDataURL(); 
    }

    var svgAsXML = new XMLSerializer().serializeToString(svgElement);
    loader.src = `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`;
  });
}
