import { Text } from 'pixi.js';

import { game, managers, resources } from '../state';
import { Scene } from './Scene';
import { FinalScene } from './FinalScene';
import { Background } from './elements/Background';
import { Platforms } from './elements/Platforms';
import { Hero } from '../characters/Hero';

export class GameScene extends Scene {
  background: Background;
  hero: Hero;
  score: Text;
  platforms: Platforms;

  constructor() {
    super();
    this.createScene();
    resources.sounds['main_sound'].sound.stop();
    resources.sounds['run_sound'].sound.stop();
    resources.sounds['run_sound'].sound.play({
      loop: true,
      volume: 0.1,
    });
  }

  createScene() {
    this.createPlatforms();
    this.createHero();
    this.createScore();
  }

  onWindowResize(): void {
    this.resizeScene();
  }

  createPlatforms() {
    this.platforms = new Platforms();
    this.container.addChild(this.platforms.container);
  }

  createHero() {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);
    this.container.interactive = true;
    this.container.on('pointerdown', () => {
      this.hero.startJump();
    });
    this.hero.sprite.on('score', () => {
      this.score.text = `Score: ${this.hero.score}`;
    });
    this.hero.sprite.once('die', () => {
      game.speed = 5;
      resources.sounds['game_over_sound'].sound.play({ volume: 0.5 });
      managers.scenes.start(new FinalScene(this.hero.score));
    });
  }

  createScore() {
    this.score = new Text(`Score: ${this.hero.score}`);
    this.score.style = {
      fontFamily: 'VT323',
      fontSize: 20,
      fill: ['#000000'],
    };
    this.score.x = 10;
    this.score.y = 10;
    this.container.addChild(this.score);
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
    this.platforms.checkCollision(this.hero);
    this.platforms.update(deltaTime);
    this.hero.update(deltaTime);
  }

  destroy() {
    super.container.destroy();
  }
}
