import { Container } from 'pixi.js';

export abstract class Scene {
  container: Container;

  abstract update(deltaTime: number): void;
}
