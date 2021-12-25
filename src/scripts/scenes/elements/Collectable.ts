import { AnimatedSprite, Sprite } from 'pixi.js';

import { state } from '../../state/Global';
import { Hero } from '../../characters/Hero';

export class Collectable {
  sprite: AnimatedSprite;

  constructor(x: number, y: number) {
    this.sprite = new AnimatedSprite([
      state.resources['potato1'].texture,
      state.resources['potato2'].texture,
      state.resources['potato3'].texture,
      state.resources['potato4'].texture,
      state.resources['potato5'].texture,
      state.resources['potato6'].texture,
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
