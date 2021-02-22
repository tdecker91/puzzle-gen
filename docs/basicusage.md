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
PNG("#cube", Type.CUBE);

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
    <div id="pyraminx"></div>

    <script type="text/javascript">
      puzzleGen.PNG("#cube", puzzleGen.Type.CUBE);
      puzzleGen.PNG("#cube", "pyraminx"); // string value can be passed in too
    </script>
  </body>
</html>
```

## Types
Puzzle Gen supports several different puzzles types. Here is a complete list of supported puzzles.

| Type | Value | Description |
| --- | --- | --- |
| [Type.CUBE](/cube) | "cube" | Rubik's cube 3D view |
| [Type.CUBE_NET](/cube) | "cube-net" | Flat view of a Rubik's cube |
| [Type.CUBE_TOP](/cube) | "cube-top" | Top view of a Rubiks's cube |
| [Type.MEGAMINX](/megaminx) | "megaminx" | Megaminx 3D view |
| [Type.MEGAMINX_NET](/megaminx) | "megaminx-net" | Flat view of a megaminx |
| [Type.MEGAMINX_TOP](/megaminx) | "megaminx-top" | Top view of a megaminx |
| [Type.PYRAMINX](/pyraminx) | "pyraminx" | Pyraminx 3D view |
| [Type.PYRAMINX_NET](/pyraminx) | "pyraminx-net" | Flat view of a pyraminx |
| [Type.SKEWB](/skewb) | "skewb" | Skewb 3D view |
| [Type.SKEWB_NET](/skewb) | "skewb-net" | Flat view of a skewb |
| [Type.SQAURE1](/square1) | "square1" | Square 1 3D View |
| [Type.SQAURE1_NET](/square1) | "square1-net" | Flat view of a square 1 |

## Options
Puzzle Gen has preset options, but if you want to customize the appearance of the puzzle you can supply an object with the options you want to override. Here's a few examples of different kinds of options.

```typescript
import { PNG, Type, Masks } from "sr-puzzlegen"

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
Size is only supported by a few puzzles (Cube, Pyraminx, Megaminx) and is not compatible with using algorithms when rendering pyraminx and megaminx.

`size: number`

```typescript
import { PNG, Type } from "sr-puzzlegen"

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

### Alg
Puzzle Gen supports executing algorithms on all of the puzzle types. It'll parse and execute the algorithm. The rendered image will show the state of the puzzle after the algorithm has been executed.

`alg: string`

```typescript
import { PNG, Type } from "sr-puzzlegen"

// Cube Scramble Preview
let cubeOptions: PNGVisualizerOptions = {
  puzzle: {
    alg: "B' D2 R2 F' B L U2 R2 F' D' F D F' D L D B2 L2 B U R L' B2 D2 L'"
  }
};

// Official WCA large cube scramble notation
let cube6options: PNGVisualizerOptions = {
  puzzle: {
    alg: "Rw Uw 3Uw2 F Uw' L Dw' Fw 3Uw2 Rw' F2 3Rw Lw2 R Rw' D' Bw' Dw2 Uw U L' Fw Dw Rw2 L 3Uw Bw' B' Lw' U' D Lw' U D2 Dw Rw' U' 3Rw' Lw2 F R' U' Lw Uw B' Lw L 3Fw Dw2 3Rw' L2 B2 Lw' B Fw2 Dw' R' Rw2 Dw Lw' R' Bw' L' 3Fw' Uw 3Fw' U 3Uw L' 3Rw2 Fw' 3Rw' U' 3Uw2 3Fw2 B' Lw' U2 Lw Dw"
  }
};

// Megaminx scramble
let megaminxOptions: PNGVisualizerOptions = {
  puzzle: {
    alg: "R-- D-- R-- D++ R-- D-- R-- D++ R-- D++ U D-- R-- D++ R-- D-- R++ D-- R-- D++ R-- U' R++ D++ R++ D-- R++ D++ R++ D-- R-- D-- U R++ D++ R++ D-- R++ D++ R++ D-- R-- D-- U R-- D-- R-- D-- R++ D-- R++ D-- R++ D++ U D++ R++ D++ R++ D++ R-- D-- R++ D++ R-- U R++ D++ R++ D++ R-- D++ R-- D-- R++ D++ U"
  }
};

PNG("#puzzle", Type.CUBE, cubeOptions);
PNG("#puzzle", Type.CUBE, cube6Options);
PNG("#puzzle", Type.CUBE, megaminxOptions);
```

> Results
>
> ![3x3 scrambled](/img/cube3scrm.png)
> ![6x6 scrambled](/img/cube6scrm.png)
> ![megaminx scrambled](/img/megaminxScrm.png)

### Case
Case is the opposite of an algorithm. It reverses the algorithm and then applies it to the puzzle. This is helpul to show the state of the puzzle before an algorithm is applied. Helpful for demonstrating OLL algorithms.

`case: string`

```typescript
import { PNG, Type } from "sr-puzzlegen"

let options: PNGVisualizerOptions = {
  puzzle: {
    case: "R U R2 U' R' F R U R U' F'"
  }
};

PNG("#puzzle", Type.CUBE_TOP, options);
```

> Results
>
> ![3x3 oll](/img/caseExample.png)

### Scheme
Each puzzle has a default color scheme. For example the cube's color scheme is shown below. 
  - U: YELLOW
  - R: RED
  - F: BLUE
  - D: WHITE
  - L: ORANGE
  - B: GREEN

By default the cube will be rendered with a view of the UFR corner. Passing in an alternative scheme allows desired color scheme or alternative shades to be used instead of the defaults. Scheme is a mapping from a puzzle face to a color. Each puzzle has a unique set of "faces". Below is an example of overriding cube color scheme. A color's shade and stroke (border) color can be provided.

`scheme: { [face: string]: { value: string, stroke?: string } }`

```typescript
import { PNG, Type } from "sr-puzzlegen"

let japanColorScheme: PNGVisualizerOptions = {
  puzzle: {
    scheme: {
      U: { value: "#FFF" },
      F: { value: "#0F0" },
      R: { value: "#F00" },
      D: { value: "#00F" },
      L: { value: "#FFA500" },
      B: { value: "#FF0" }
    },
    alg: "M2 E2 S2"
  }
};

let stickerlessScheme: PNGVisualizerOptions = {
  puzzle: {
    scheme: {
      U: { value: "#FFFF00", stroke: "#DDDD00"},
      F: { value: "#0000FF", stroke: "#0000DD" },
      R: { value: "#FF0000", stroke: "#DD0000" },
      D: { value: "#FFFFFF", stroke: "#DDD" },
      L: { value: "#FFA500", stroke: "#DD8500" },
      B: { value: "#00FF00", stroke: "#00DD00" }
    }
  }
};

let transparency: PNGVisualizerOptions = {
  puzzle: {
    scheme: {
      U: { value: "#FFFF00AA" },
      R: { value: "#FF0000AA" },
      F: { value: "#0000FFAA" },
      D: { value: "#FFFFFFAA" },
      L: { value: "#FFA500AA" },
      B: { value: "#00FF00AA" }
    }
  }
};

let carbon: PNGVisualizerOptions = {
  puzzle: {
    scheme: {
      U: { value: "#000", stroke: "#FFFF00" },
      R: { value: "#000", stroke: "#FF0000" },
      F: { value: "#000", stroke: "#0000FF" },
      D: { value: "#000", stroke: "#FFFFFF" },
      L: { value: "#000", stroke: "#FFA500" },
      B: { value: "#000", stroke: "#00FF00" }
    }
  }
};


PNG("#puzzle", Type.CUBE, japanColorScheme);
PNG("#puzzle", Type.CUBE, stickerlessScheme);
PNG("#puzzle", Type.CUBE, transparency);
PNG("#puzzle", Type.CUBE, carbon);
```

> Results
>
> ![japan scheme](/img/japanScheme.png)
> ![stickerless](/img/stickerless.png)
> ![transparent](/img/transparent.png)
> ![transparent](/img/carbon.png)

### Mask
Mask will gray out certain stickers of the puzzle to highlight the remaining stickers. Stickers are grayed out before algorithms are applied so we can see the effect of the algorithm. This is helpful for when we only want to show certain pieces that are affected by an algorithm. Using this we can improve upon our case example from before.

A few default masks are provided, but a custom mask can be used as well. A mask is a mapping of puzzle face to an array of sticker indicies to gray out.

`mask: { [face: string]: number[] }`

```typescript
import { PNG, Type, Masks } from "sr-puzzlegen"

let options: PNGVisualizerOptions = {
  puzzle: {
    case: "R U R2 U' R' F R U R U' F'",
    mask: Masks.CUBE_3.OLL
  }
};

let customMask : PNGVisualizerOptions = {
  puzzle: {
    mask: {
      U: [1,3,5,7],
      R: [1,3,5,7],
      F: [1,3,5,7],
      D: [1,3,5,7],
      L: [1,3,5,7],
      B: [1,3,5,7],
    }
  }
};

PNG("#puzzle", Type.CUBE_TOP, options);
PNG("#puzzle", Type.CUBE, customMask);
```

> Results
>
> ![oll mask](/img/mask1.png)
> ![only show corners](/img/mask2.png)

### Sticker Colors
Sticker colors can be provided to manually set colors of the puzzle faces. This takes precedence over alg and case.  `stickerColors` is a mapping from face to an array of colors. For convenience a few color definitions are exported.

`stickerColors: { value: string, stroke?: string }[]`

```typescript
import { PNG, Type, Colors } from "sr-puzzlegen"

let options: PNGVisualizerOptions = {
  puzzle: {
    stickerColors: {
      U: [Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN],
      R: [Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN],
      F: [Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN, Colors.RED, Colors.GREEN],
    }
  }
};

PNG("#puzzle", Type.CUBE, options);
```

> Results
>
> ![christmas cube](/img/christmas.png)


### Rotations
The angle the puzzle is viewed at can be adjusted by passing in rotations. They are a list of euler angle rotations to perform on the puzzle before rendering. They can be adjusted to get the perfect view of the puzzle for your purposes.

Each puzzle has default rotations already. So providing rotations will override what is already there. 

For example the cube's default rotation is `[ { y: 45 }, { x: 34 } ]` which will first rotation along the y axis by 45 degrees, then rotation along the x axis by 34 degrees to get the URF corner view.

`rotations: { x?: number, y?: number, z?: number }[]`

```typescript
import { PNG, Type } from "sr-puzzlegen"

let options: PNGVisualizerOptions = {
  puzzle: {
    rotations: [{ y: 90 }, { x: 45 }]
  }
};

PNG("#puzzle", Type.CUBE, options);
```

> Results
>
> ![cube rotations](/img/rotations.png)


### Scale
The scale the puzzle is rendered at can be adjusted by passing in a scalar value. Note this does not adjust the size of the image canvas, just the size of the puzzle within the image.

`scale: number`

```typescript
import { PNG, Type } from "sr-puzzlegen"

let half: PNGVisualizerOptions = {
  puzzle: {
    scale: .5
  }
};

let double: PNGVisualizerOptions = {
  puzzle: {
    scale: 2
  }
};

PNG("#puzzle", Type.CUBE, half);
PNG("#puzzle", Type.CUBE, double);
```

> Results
>
> ![half](/img/half.png)
> ![double](/img/double.png)

### Translation
Move the puzzle along the x/y/z plane by some amount. 

`translation: { x?: number, y?: number, z?: number }`

The translation amount is relative to the svg view box. For example the default svg viewbox settings are -1.8 to 1.8, so translating by 3.6 will adjust the image the entire length of the image. Any part of the puzzle outside the image will be cutt off.

In the example below we hide half of the megaminx and translate one side over so it fits in the middle of the image.

```typescript
import { PNG, Type, Colors } from "sr-puzzlegen"

let invisible = { value: "#00000000", stroke: "#00000000" };
let options: PNGVisualizerOptions = {
  puzzle: {

    // Move the puzzle over to fit in the center of the image
    translation: { x: .9, y: 0, z: 0 }, 

    // scale the puzzle by a factor of 1.75
    scale: 1.75,

    // Custom scheme that hides some of the faces
    scheme: {
      U: WHITE,
      F: RED,
      R: BLUE,
      dr: PINK,
      dl: LIGHT_YELLOW,
      L: GREEN,
      d: invisible,
      br: invisible,
      BR: invisible,
      BL: invisible,
      bl: invisible,
      b: invisible,
    }
  }
};

PNG("#puzzle", Type.MEGAMINX_NET, options);
```

> Results
>
> ![translate](/img/translate.png)

## Arrows
Draw arrows from one sticker to another.

Arrows are always drawn last, so they will always be on top of the puzzle. Even if the faces you draw them on aren't visible.

```typescript
arrows: {
  start: { face: string; sticker: number };
  end: { face: string; sticker: number };
}[]
```

```typescript
import { PNG, Type } from "sr-puzzlegen"

let options: PNGVisualizerOptions = {
  puzzle: {
    arrows: [{
      start: { face: "U", sticker: 1 },
      end: { face: "U", sticker: 5 }
    }, {
      start: { face: "U", sticker: 5 },
      end: { face: "U", sticker: 3 }
    }, {
      start: { face: "U", sticker: 3 },
      end: { face: "U", sticker: 1 }
    }]
  }
};

PNG("#puzzle", Type.CUBE_TOP, options);
```

> Results
>
> ![arrows](/img/arrows.png)