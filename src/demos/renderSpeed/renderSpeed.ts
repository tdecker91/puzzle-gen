import { SVG, Type, Canvas, ArrowDefinition } from '../../visualizer'

export function renderDemo() {

  for (let i = 0; i < 10; i++) {
    document.getElementById("puzzle").childNodes.forEach(child => {
      document.getElementById("puzzle").removeChild(child);
    })

    renderSvg(3 + i)
  }
  for (let i = 0; i < 10; i++) {
    document.getElementById("puzzle").childNodes.forEach(child => {
      document.getElementById("puzzle").removeChild(child);
    })

    renderCanvas(3 + i)
  }

}

export function renderSvg(size: number) {
  let start = performance.now();
  let arrows: ArrowDefinition[] = [
    {
      start: {
        face: 'U',
        sticker: 0
      },
      end: {
        face: 'U',
        sticker: 2
      }
    }
  ]
  SVG("#puzzle", Type.CUBE, { puzzle: { size: size, arrows: arrows } as any });
  let end = performance.now();
  let diff = end - start;
  addLog(`svg size ${size} ${diff.toFixed(2)}ms`)
}

export function renderCanvas(size: number) {
  let start = performance.now();
  let arrows: ArrowDefinition[] = [
    {
      start: {
        face: 'U',
        sticker: 0
      },
      end: {
        face: 'U',
        sticker: 2
      }
    }
  ]
  Canvas("#puzzle", Type.CUBE, { puzzle: { size: size, arrows: arrows } as any });
  let end = performance.now();
  let diff = end - start;
  addLog(`canvas size ${size} ${diff.toFixed(2)}ms`)
}

export function addLog(msg) {
  (<HTMLTextAreaElement>document.getElementById("output")).value += `\n${msg}`;
}

document.addEventListener("DOMContentLoaded", function (event) {
  renderDemo();
});