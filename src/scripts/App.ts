import { Application } from 'pixi.js';
import 'pixi-sound';

import { game, managers } from './state';
import { AppLoader } from './loader/AppLoader';
import { Scene } from './scenes/Scene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

const frameRate = 15; // 1000/15 = ~60 FPS
export class App {
  run() {
    let time = 0;
    const app = new Application({ resizeTo: window });
    document.body.appendChild(app.view);
    app.stage.addChild(managers.scenes.container);

    app.ticker.add(deltaTime => {
      const now = new Date().getTime();
      const diff = now - time;

      if (diff < frameRate) {
        return;
      }

      time = now;
      managers.scenes.update(deltaTime);
    });

    const loader = new AppLoader(app.loader);
    loader.preload().then(() => managers.scenes.start(new MenuScene()));

    document.addEventListener('window:resize', () => {
      managers.scenes.scene.onWindowResize();
    });

    document.addEventListener('collect', () => {
      game.speed += 0.25;

      if (managers.scenes.scene instanceof GameScene) {
        (managers.scenes.scene as GameScene).platforms.platforms.forEach(
          platform => {
            platform.changeSpeed();
          },
        );
      }
    });
  }
}
