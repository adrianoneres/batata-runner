import { AnimatedSprite } from 'pixi.js';

import { state } from '../state/Global';
import { Platform } from '../scenes/elements/Platform';

export class Hero {
  score: number;
  distanceY: number;
  jumpIndex: number;
  platform: Platform;
  sprite: AnimatedSprite;

  constructor() {
    this.score = 0;
    this.distanceY = 0;
    this.jumpIndex = 0;
    this.platform = null;
    this.sprite = new AnimatedSprite([
      state.resources['nano_walk1'].texture,
      state.resources['nano_walk2'].texture,
    ]);
    this.sprite.x = 100;
    this.sprite.y = 100;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.125;
    this.sprite.play();
  }

  get left() {
    return this.sprite.x;
  }

  get right() {
    return this.left + this.sprite.width;
  }

  get top() {
    return this.sprite.y;
  }

  get bottom() {
    return this.top + this.sprite.height;
  }

  get nextBottom() {
    return this.bottom + this.distanceY;
  }

  startJump() {
    if (this.platform || this.jumpIndex === 1) {
      ++this.jumpIndex;
      this.platform = null;
      this.distanceY = -25;
    }
  }

  stayOnPlatform(platform: Platform) {
    this.platform = platform;
    this.distanceY = 0;
    this.jumpIndex = 0;
    this.sprite.y = platform.top - this.sprite.height;
  }

  moveByPlatform(platform: Platform) {
    this.sprite.x = platform.nextLeft - this.sprite.width;
  }

  update(deltaTime: number) {
    if (!this.platform) {
      ++this.distanceY;
      this.sprite.y += this.distanceY;
    }
    if (this.sprite.y > window.innerHeight) {
      this.sprite.emit('die');
    }
  }

  collect() {
    ++this.score;
    this.sprite.emit('score', { score: this.score });
    document.dispatchEvent(
      new CustomEvent('collect', {
        bubbles: true,
        detail: {
          score: this.score,
        },
      }),
    );
  }
}
