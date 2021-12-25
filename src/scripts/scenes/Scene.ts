import { Container } from 'pixi.js';
import { Background } from './elements/Background';

export abstract class Scene {
  container: Container;
  background: Background;

  constructor() {
    this.container = new Container();
    this.createBackground();
  }

  abstract update(deltaTime: number): void;

  createBackground() {
    this.background = new Background();
    this.container.addChild(this.background.container);
  }
}
