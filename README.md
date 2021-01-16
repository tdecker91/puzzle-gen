# Puzzle Visualizer
Just a prototype

## Vision
This project aims to build on the idea of [visual cube](https://github.com/tdecker91/visualcube) and extend support to generate images for puzzles other than Rubik's cubes.


## Prototype
Really I just wanted an excuse to fiddle with very rudimentary 3d rendering. So I decided to make a basic "svg renderer" to take geometry and draw them on an svg using svg.js 

Sure, something like three.js SVGRenderer would probably be much better. 

...But it works!

![default cube](https://raw.githubusercontent.com/tdecker91/puzzle-visualizer/master/assets/svg-cube.gif)

## Notes
using webpack dev server 4 beta version due to issue described here with `webpack serve` https://github.com/webpack/webpack-dev-server/issues/2484