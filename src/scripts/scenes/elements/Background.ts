import { Container, Sprite } from 'pixi.js';
import { state } from '../../state/Global';

export class Background {
  container: Container;
  speed: number;
  sprites: Sprite[];

  constructor() {
    this.speed = 1.5;
    this.container = new Container();
    this.createSprites();
  }

  createSprites() {
    this.sprites = [];
    for (let i = 0; i < 3; i++) {
      this.createSprite(i);
    }
  }

  createSprite(index: number) {
    const sprite = new Sprite(state.resources['background'].texture);
    sprite.x = sprite.width * index;
    sprite.y = 0;

    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  move(sprite: Sprite, offset: number) {
    const spriteRightX = sprite.x + sprite.width;
    const screenLeftX = 0;

    if (spriteRightX <= screenLeftX) {
      sprite.x += sprite.width * this.sprites.length;
    }

    sprite.x -= offset;
  }

  update(deltaTime: number) {
    const offset = this.speed * deltaTime;

    this.sprites.forEach(sprite => {
      this.move(sprite, offset);
    });
  }
}
