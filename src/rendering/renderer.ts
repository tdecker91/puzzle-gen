import { Scene } from './scene';
import { Camera } from './camera';

/**
 * Interface the visualizer uses to render the scene
 */
export interface Renderer {
  render(scene: Scene, camera: Camera): void;
}