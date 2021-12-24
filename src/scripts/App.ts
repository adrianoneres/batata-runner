import { Application } from 'pixi.js';
import 'pixi-sound';

import { state } from './state/Global';
import { AppLoader } from './loader/AppLoader';
import { Scene } from './scenes/Scene';
import { SceneManager } from './scenes/SceneManager';
import { MainMenuScene } from './scenes/MainMenuScene';

export class App {
  app: Application;
  loader: AppLoader;
  scene: Scene;

  run() {
    this.app = new Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    state.scene = new SceneManager();
    this.app.stage.addChild(state.scene.container);
    this.app.ticker.add(deltaTime => state.scene.update(deltaTime));

    this.loader = new AppLoader(this.app.loader);
    this.loader.preload().then(() => state.scene.start(new MainMenuScene()));
  }
}
