import { Container } from 'pixi.js';
import { Background } from './elements/Background';

export abstract class Scene {
  centerX: number;
  centerY: number;
  container: Container;
  background: Background;

  constructor() {
    this.container = new Container();
    this.createBackground();
    this.resetCenter();
  }

  abstract update(deltaTime: number): void;

  abstract createScene(): void;

  abstract onWindowResize(): void;

  createBackground() {
    this.background = new Background();
    this.container.addChild(this.background.container);
  }

  resizeScene() {
    this.resetBackground();
    this.resetCenter();
  }

  private resetBackground() {
    this.background.container.removeChildren();
    this.background.createSprites();
  }

  private resetCenter() {
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;
  }
}
