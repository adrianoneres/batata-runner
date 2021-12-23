import { Container } from 'pixi.js';

import { state } from '../state/Global';
import { Scene } from './Scene';
import { FinalScene } from './FinalScene';
import { Background } from './elements/Background';
import { Platforms } from './elements/Platforms';
import { Hero } from '../characters/Hero';
import { LabelScore } from './elements/LabelScore';

export class MainScene extends Scene {
  container: Container;
  background: Background;
  platforms: Platforms;
  hero: Hero;
  labelScore: LabelScore;

  constructor() {
    super();
    this.container = new Container();
    this.createBackground();
    this.createPlatforms();
    this.createHero();
    this.createUI();
  }

  createBackground() {
    this.background = new Background();
    this.container.addChild(this.background.container);
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
    this.hero.sprite.once('score', () => {
      state.score = this.hero.score;
    });
    this.hero.sprite.once('die', () => {
      state.scene.start(new FinalScene(this.hero.score));
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
