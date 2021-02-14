# Basic Usage

## Installation

Install library with npm.
```bash
> npm install sr-puzzlegen
```

## Usage
Call the PNG method to render puzzles to an html element in the dom. Pass in the element to render the puzzle under, and the puzzle type.
> `PNG(element, type, options?)`

```html
<div id="cube"></div>
<div id="skewb"></div>
```

```typescript
import { PNG, Type } from "sr-puzzlegen"

// pass query selector
PNG("#puzzle", Type.CUBE);

// pass element directly
let skewb = document.getElementById("skewb");
PNG(skewb, Type.SKEWB);
```

> Results
>
> ![default cube](/img/default-cube.png)
> ![default skewb](/img/default-skewb.png)

---

If you aren't using a bundler you can include the [minified bundle](https://github.com/tdecker91/puzzle-gen/tree/master/dist/bundle) on your page and access the library directly. 

Check out the [releases](https://github.com/tdecker91/puzzle-gen/releases) for the latest bundle.
```html
<html>
  <head>
    <script type="text/javascript" src="dist/puzzleGen.min.js"></script>
  </head>

  <body>
    <div id="cube"></div>

    <script type="text/javascript">
      puzzleGen.PNG("#cube", puzzleGen.Type.CUBE);
    </script>
  </body>
</html>
```

## Options
Puzzle Gen has preset options, but if you want to customize the appearance of the puzzle you can supply an object with the options you want to override. Here's an example of rendering a smaller image of a cube with an algorithm applied.

```typescript
import { PNG, Type, PNG, Masks } from "sr-puzzlegen"

let options: PNGVisualizerOptions = {
  width: 250,
  height: 250,
  puzzle: {
    alg: "M2 E2 S2"
  }
}

PNG("#puzzle", Type.CUBE, options);

// use case to show state solved by the algorithm
options = {
  width: 250,
  height: 250,
  puzzle: {
    case: "R U R' U R U2 R'",
    mask: Masks.CUBE_3.OLL
  }
};

PNG("#puzzle", Type.CUBE, options);

options = {
  width: 250,
  height: 250,
  puzzle: {
    size: 4
  }
};

PNG("#puzzle", Type.CUBE, options);
```

> Results
>
> ![checkerboard cube](/img/alg-cube.png)
> ![oll cube](/img/case-cube.png)
> ![4x4 cube](/img/cube4.png)

Below is a complete description of what options can contain.
```typescript
interface PNGVisualizerOptions {
  width?: number;
  height?: number;
  minx?: number;
  miny?: number;
  svgWidth?: number;
  svgHeight?: number;
  strokeWidth?: number;
  puzzle?: {
    size?: number; // only supported by a few puzzles (cube, pyraminx, megaminx)
    alg?: string;
    case?: string;
    scheme?: { [face: string]: IColor };
    mask?: { [face: string]: number[] };
    stickerColors?: { [face: string]: IColor[] };
    rotations?: { x?: number; y?: number; z?: number }[];
    scale?: number;
    translation?: { x?: number; y?: number; z?: number };
    arrows?: ArrowDefinition[];
  };
  arrowColor?: {
    value: string,
    stroke?: string
  };
  arrowStrokeWidth?: number;
}
```

## Examples

### Size
Size is only supported by a few puzzles (Cube, Pyraminx, Megaminx) and is not compatible with using algorithms.
```typescript
import { PNG, Type, PNG, Masks } from "sr-puzzlegen"

let options: PNGVisualizerOptions = {
  width: 250,
  height: 250,
  puzzle: {
    size: 2
  }
};

PNG("#puzzle", Type.CUBE, options);
PNG("#puzzle", Type.CUBE_TOP, options);
PNG("#puzzle", Type.CUBE_NET, options);
PNG("#puzzle", Type.PYRAMINX, options);
PNG("#puzzle", Type.PYRAMINX_NET, options);

options.puzzle.size = 1;
PNG("#puzzle", Type.MEGAMINX, options);
PNG("#puzzle", Type.MEGAMINX_NET, options);
```

> Results
>
> ![2x2 cube](/img/cube2.png)
> ![2x2 cube top](/img/cubeTop2.png)
> ![2x2 cube net](/img/cubeNet2.png)
> ![2x2 pyraminx](/img/pyraminx2.png)
> ![2x2 pyraminx net](/img/pyraminxNet2.png)
> ![1x1 megaminx](/img/megaminx1.png)
> ![1x1 megaminx net](/img/megaminxNet1.png)