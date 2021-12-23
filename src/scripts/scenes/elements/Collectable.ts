import { Sprite } from 'pixi.js';

import { state } from '../../state/Global';
import { Hero } from '../../characters/Hero';

export class Collectable {
  sprite: Sprite;

  constructor(x: number, y: number) {
    this.sprite = new Sprite(state.resources['potato'].texture);
    this.sprite.x = x;
    this.sprite.y = y;
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
