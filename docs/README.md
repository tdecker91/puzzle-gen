# PuzzleGen

PuzzleGen is a javascript library intended to render [WCA puzzles](https://www.worldcubeassociation.org/regulations/#article-9-events). Colors can be customized, or scrambles can be applied to make references for solve guides or scramble previews. It's heavily inspired by [visualcube](https://github.com/Cride5/visualcube) and [twistysim](http://cube.rider.biz/twistysim.html). My first go at this was porting visuacube to javascript [here](https://github.com/tdecker91/visualcube). But in order to get all the functionality desired, I had to completely rewrite from scratch.

PuzzleGen is built to be customizable, so if desired functionality can be extended to use cases other than embedding scramble previews in web pages.

## Demonstration

Check out the library in action [HERE](https://tdecker91.github.io/puzzlegen-demo/)

## Examples

Here are some examples of what the library is capable of.

<p float="left">
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/cube.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/cube-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/cube-net.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/cube-net-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/cube-top.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/cube-top-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/megaminx.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/megaminx-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/megaminx-net.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/megaminx-net-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/pyraminx.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/pyraminx-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/pyraminx-net.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/pyraminx-net-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/skewb.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/skewb-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/skewb-net.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/skewb-net-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/sq1.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/sq1-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/sq1-net.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/sq1-net-scrm.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/megaminx-top.png" width="125" />
  <img src="https://raw.githubusercontent.com/tdecker91/puzzle-gen/master/assets/megaminx-top-scrm.png" width="125" />
</p>

## Installation

```bash
> npm install sr-puzzlegen
```

## Usage

For full usage demonsration see [here](https://tdecker91.github.io/puzzle-gen/#/basicusage)

## Development

> Requirements
>
> - [Node.js](nodejs.org) - v14.15.4 but other versions may work

> Tools Used
>
> - [nvm](https://github.com/nvm-sh/nvm)
> - [TypeScript](https://www.typescriptlang.org/) - v4.1.3
> - [WebPack](https://webpack.js.org/) - 5.15.0

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
> npm run build # build the bundled library with webpack to /dist/bundle
> tsc # build unbundled library to /dist/lib
```

Publish to registry

1. update version in `package.json`
1. build bundle `npm run build` and build library `tsc`
1. run npm publish command

```bash
> npm publish
```
