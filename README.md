# Puzzle Visualizer

Just a prototype

## Vision

This project aims to build on the idea of [visual cube](https://github.com/tdecker91/visualcube) and extend support to generate images for puzzles other than Rubik's cubes.

## Prototype

Really I just wanted an excuse to fiddle with very rudimentary 3d rendering. So I decided to make a basic "svg renderer" to take geometry and render images in a browser context. But the renderer can also be replaced with something custom to fit needs.

Sure, something like three.js SVGRenderer would probably be much better.

...But it works!

![default cube](https://raw.githubusercontent.com/tdecker91/puzzle-visualizer/master/assets/svg-cube.gif)

## Development

> Requirements

- [Node.js](nodejs.org)

Install dependencies

```bash
> npm install
```

Run development demos. This will automatically start a web server and open a browser to the index. For more info see [Demos](src/demos/README.md)

```bash
> npm run dev
```

Run tests cases (Yes we have some tests!)

```bash
> npm t
```

Build library. This will save build assets to `dist/`

```bash
> npm run build
```

Publish to registry

```bash
> coming eventually
```

## Notes

using webpack dev server 4 beta version due to issue described here with `webpack serve` https://github.com/webpack/webpack-dev-server/issues/2484
