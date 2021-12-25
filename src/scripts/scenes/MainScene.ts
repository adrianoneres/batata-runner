import { Container } from 'pixi.js';

import { state } from '../state/Global';
import { Scene } from './Scene';
import { FinalScene } from './FinalScene';
import { Background } from './elements/Background';
import { Platforms } from './elements/Platforms';
import { Hero } from '../characters/Hero';
import { LabelScore } from './elements/LabelScore';

export class MainScene extends Scene {
  background: Background;
  platforms: Platforms;
  hero: Hero;
  labelScore: LabelScore;

  constructor() {
    super();
    this.createPlatforms();
    this.createHero();
    this.createUI();

    state.resources['main_sound'].sound.stop();
    state.resources['run_sound'].sound.stop();
    state.resources['run_sound'].sound.play({
      loop: true,
      volume: 0.1,
    });
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
    this.hero.sprite.once('die', () => {
      state.resources['game_over_sound'].sound.play({ volume: 0.5 });
      state.scene.start(new FinalScene(this.hero.score));
      state.speed = -5;
    });
  }

  createUI() {
    this.labelScore = new LabelScore();
    this.container.addChild(this.labelScore);
    this.hero.sprite.on('score', () => {
      this.labelScore.renderScore(this.hero.score);
    });
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
    this.platforms.checkCollision(this.hero);
    this.platforms.update(deltaTime);
    this.hero.update(deltaTime);
  }
}
