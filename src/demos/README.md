# Demos
This directory is exluded as part of the normal build process for the puzzle visualizer library. Because the library is built as a library there needs to be some glue to get some visuals on the screen that shouldn't necessarily be bundled in the build itself. So it lives here for now until it can be moved to somewhere more appropriate.

## Files related to demos
- `/src/demos/*`
- `webpack.demos.config.js`
- `tsconfig.demos.json`

## Commands

Build the demos. Output will be placed under `demos/`. Open `demos/index.html` in a browser to see the directory of demos.
```bash
> npm run build:demos
```

Build the demos and open with webpack dev server.
```bash
> npm run dev
```