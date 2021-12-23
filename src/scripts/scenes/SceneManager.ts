import { Container } from 'pixi.js';

import { Scene } from './Scene';

export class SceneManager {
  container: Container;
  scene: Scene;

  constructor() {
    this.container = new Container();
    this.scene = null;
  }

  start(scene: Scene) {
    if (this.scene) {
      this.scene.container.destroy();
    }

    this.scene = scene;
    this.container.addChild(this.scene.container);
  }

  update(deltaTime: number) {
    if (this.scene && this.scene.update) {
      this.scene.update(deltaTime);
    }
  }
}
