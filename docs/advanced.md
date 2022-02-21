# Advanced

## Visualizations
PuzzleGen supports three visualization types out of the box. `PNG, SVG, Canvas`. 
- [PNG](https://github.com/tdecker91/puzzle-gen/blob/master/src/visualizer/png.ts#L23) to render a `.png` image. Good for one image generation on the page.
- [SVG](https://github.com/tdecker91/puzzle-gen/blob/master/src/visualizer/svg.ts#L77) to render raw svg to the DOM. Good for a more dynamic app because the options can be updated on the existing svg elements so subsequent renders will be faster.
- [Canvas](https://github.com/tdecker91/puzzle-gen/blob/master/src/visualizer/canvas.ts#L25) (experimental) render image to an html canvas element.

```typescript
import { PNG, SVG, Canvas, Type } from "sr-puzzlegen"

// Render to .png
PNG("#cube", Type.CUBE);

// Render to canvas
Canvas("#cube", Type.CUBE);

// Render to SVG
const svgVisualizer = SVG("#cube", Type.CUBE);

// Update visualizer options. This will re-render the output
svgVisualizer.setSvgOptions({ alg: "M2 E2 S2"})
```

## Customizations
PuzzleGen can be customized to run outside of the browser. For example, you may want to build an application to render puzzle images serverside using node.js. Or you may want to generate puzzle images on a mobile devide using React Native.

This can be accomplished by building a custom renderer and instantiating [Visualizer](https://github.com/tdecker91/puzzle-gen/blob/master/src/visualizer/visualizer.ts#L182) manually. `Visualizer` is the class that does the work of building puzzle geometry and applying all of the settings. The Renderer does the work of drawing the image.

Below is an example of a nodejs app using [canvas](https://www.npmjs.com/package/canvas) to render the puzzle image
```typescript
import { Rendering, Visualizer } from 'sr-puzzlegen';
import { Polygon } from 'sr-puzzlegen/dist/lib/rendering/polygonRenderer';
import { VisualizerType } from 'sr-puzzlegen/dist/lib/visualizer/enum';
const { createCanvas } = require('canvas');
const fs = require('fs');

class NodeCanvasRenderer extends Rendering.PolygonRenderer {
  private canvas;
  private ctx;
  private size: number;

  constructor(size: number) {
    super();
    this.size = size;
    this.canvas = createCanvas(size, size);
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Visualizer point values will be in range (-.9, .9)
   * Convert these values to canvas points (0, imgSize)
   * using linear interpolation
   *
   * really the camera matrix should be set up properly
   * so we don't have to do this...
   */
   private convertRange(n: number, range: number): number {
    return ((n - -0.9) / (0.9 - -0.9)) * range;
  }

  drawPolygon(polygon: Polygon) {
    this.ctx.lineJoin = "round";
    this.ctx.fillStyle = polygon?.face?.color?.value || "#000000";
    this.ctx.strokeStyle = "#000000";

    this.ctx.moveTo(
      this.convertRange(polygon.points[0][0], this.size),
      this.convertRange(polygon.points[0][1], this.size)
    );
    this.ctx.beginPath();
    for (let i = 0; i <= polygon.points.length; i++) {
      let point = polygon.points[(i + 1) % polygon.points.length];
      this.ctx.lineTo(
        this.convertRange(point[0], this.size),
        this.convertRange(point[1], this.size)
      );
    }

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawArrow(p1: any, p2: any, uid: string) {
    // Omitted for example
  }

  onComplete() {
    const out = fs.createWriteStream(__dirname + '/test.png');
    const stream = this.canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () =>  console.log('The PNG file was created.'));
  }
}

let imgSize = 500;
let renderer = new NodeCanvasRenderer(imgSize);

// Instantiate the puzzle visualizer and render the puzzle
let visualizer = new Visualizer(renderer, VisualizerType.MEGAMINX, {});
```

Here are the important parts of this example

```typescript
class NodeCanvasRenderer extends Rendering.PolygonRenderer {
  ...
}
```
extend the class `PolygonRenderer`. This class does all of the 3d rendering logic and we just have to implement the methods that tell the renderer how to draw the 2d polygons

```typescript
drawPolygon(polygon: Polygon) {
  ...
}
```
implement `drawPolygon`. This method is called for every sticker on the puzzle. The `polygon` parameter has an array of points in screen space. So in this example we simply draw a polygon on the canvas with the appropirate fill color.


```typescript
let imgSize = 500;
let renderer = new NodeCanvasRenderer(imgSize);

// Instantiate the puzzle visualizer and render the puzzle
let visualizer = new Visualizer(renderer, VisualizerType.MEGAMINX, {});
```

Create an instance of the renderer class. When you instantiate the visuzlier it will automatically render the puzzle.