import { Camera } from "./camera";
import { Scene } from "./scene";
import { HtmlSvgRenderer } from "./htmlSvgRenderer";

export class DelayedSvgRenderer extends HtmlSvgRenderer {
  private renderQueue = [];
  private renderInterval;

  render(scene: Scene, camera: Camera) {
    clearInterval(this.renderInterval);
    delete this.renderInterval;
    this.renderQueue = [];
    super.render(scene, camera);
  }

  protected renderPolygons() {
    this.polygons.sort((a, b) => {
      return a.centroid[2] - b.centroid[2];
    });

    this.polygons.forEach((p) => {
      this.renderQueue.push(p.polygon);
    });

    this.renderInterval = setInterval(() => {
      this.delayRender();
    }, 10);
  }

  private delayRender() {
    if (this.renderQueue.length == 0) {
      clearInterval(this.renderInterval);
      delete this.renderInterval;
    } else {
      const polygon = this.renderQueue.shift();
      this.svgElement.append(polygon);
    }
  }
}
