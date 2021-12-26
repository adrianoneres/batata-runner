import { Container, Graphics, Sprite, Texture } from 'pixi.js';

import { resources } from '../../state';

export class Background {
  container: Container;
  texture: Texture;
  speed: number;
  sprites: Sprite[];

  constructor() {
    this.speed = 1.5;
    this.container = new Container();
    this.container.height = window.innerHeight;
    this.createDefaultLayer();
    this.createSprites();
  }

  createDefaultLayer() {
    const layer = new Graphics();
    const width = window.innerWidth;
    const height = window.innerHeight;
    layer.beginFill(0x92b9ff);
    layer.drawRect(0, 0, width, height);
    this.container.addChild(layer);
  }

  createSprites() {
    this.sprites = [];
    for (let i = 0; i < 3; i++) {
      this.createSprite(i);
    }
  }

  onWindowResize() {
    this.container.removeChildren();
    this.createSprites();
  }

  createSprite(index: number) {
    this.texture = resources.sprites['background'].texture;
    const sprite = new Sprite(this.texture);
    sprite.x = sprite.width * index;
    sprite.y = window.innerHeight - sprite.height;

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
