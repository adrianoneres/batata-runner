import { AnimatedSprite, Sprite } from 'pixi.js';

import { resources } from '../../state';
import { Hero } from '../../characters/Hero';

export class Collectable {
  sprite: AnimatedSprite;

  constructor(x: number, y: number) {
    this.sprite = new AnimatedSprite([
      resources.sprites['potato1'].texture,
      resources.sprites['potato2'].texture,
      resources.sprites['potato3'].texture,
      resources.sprites['potato4'].texture,
      resources.sprites['potato5'].texture,
      resources.sprites['potato6'].texture,
    ]);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
  }

  get left() {
    return this.sprite.x + this.sprite.parent.x;
  }

  get right() {
    return this.left + this.sprite.width;
  }

  get top() {
    return this.sprite.y + this.sprite.parent.y;
  }

  get bottom() {
    return this.top + this.sprite.height;
  }

  checkCollision(hero: Hero) {
    if (!this.sprite) {
      return;
    }

    if (this.isOverlap(hero)) {
      hero.collect();
      this.sprite.destroy();
      this.sprite = null;
    }
  }

  isOverlap(hero: Hero) {
    return (
      hero.bottom >= this.top &&
      hero.top <= this.bottom &&
      hero.right >= this.left &&
      hero.left <= this.right
    );
  }
}
