import { Container, Sprite } from 'pixi.js';

import { state } from '../../state/Global';
import { Hero } from '../../characters/Hero';
import { Collectable } from './Collectable';

const TILE_SIZE = 64;

export class Platform {
  container: Container;
  collectablesOffsetMin: number;
  collectablesOffsetMax: number;
  collectables: Collectable[];
  distanceX: number;
  rows: number;
  cols: number;
  width: number;
  height: number;

  constructor(x: number, cols: number, rows: number) {
    this.collectables = [];
    this.collectablesOffsetMin = 100;
    this.collectablesOffsetMax = 200;
    this.distanceX = state.speed;
    this.rows = rows;
    this.cols = cols;
    this.width = cols * TILE_SIZE;
    this.height = rows * TILE_SIZE;

    this.createContainer(x);
    this.createTiles();
    this.createCollectables();
  }

  get left() {
    return this.container.x;
  }

  get right() {
    return this.left + this.width;
  }

  get top() {
    return this.container.y;
  }

  get bottom() {
    return this.top + this.height;
  }

  get nextLeft() {
    return this.left + this.distanceX;
  }

  createContainer(x: number) {
    this.container = new Container();
    this.container.x = x;
    this.container.y = window.innerHeight - this.rows * TILE_SIZE;
  }

  createTiles() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createTile(row, col);
      }
    }
  }

  createTile(row: number, col: number) {
    let tile_type = row === 0 ? 'platform' : 'tile';
    let tile_position = '';
    if (col === 0) {
      tile_position = '_left';
    } else if (col === this.cols - 1) {
      tile_position = '_right';
    }
    const texture = `${tile_type}${tile_position}`;
    // const texture = row === 0 ? 'platform' : 'tile';
    const tile = new Sprite(state.resources[texture].texture);
    this.container.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
  }

  createCollectables() {
    const y =
      this.collectablesOffsetMin +
      Math.random() * (this.collectablesOffsetMax - this.collectablesOffsetMin);
    for (let i = 0; i < this.cols; i++) {
      if (Math.random() < 0.1) {
        const x = 64 * i;
        const collectable = new Collectable(x, -y);
        this.container.addChild(collectable.sprite);
        this.collectables.push(collectable);
      }
    }
  }

  isCollideTop(hero: Hero) {
    return (
      hero.right >= this.left &&
      hero.left <= this.right &&
      hero.bottom <= this.top &&
      hero.nextBottom >= this.top
    );
  }

  isCollideLeft(hero: Hero) {
    return (
      hero.bottom >= this.top &&
      hero.top <= this.bottom &&
      hero.right <= this.left &&
      hero.right >= this.nextLeft
    );
  }

  checkCollision(hero: Hero) {
    this.collectables.forEach(collectable => {
      collectable.checkCollision(hero);
    });

    if (this.isCollideTop(hero)) {
      hero.stayOnPlatform(this);
    } else {
      if (hero.platform === this) {
        hero.platform = null;
      }
      if (this.isCollideLeft(hero)) {
        hero.moveByPlatform(this);
      }
    }
  }

  increaseSpeed(score: number) {
    const speed = score === 0 ? -5 : -5 - score * 0.25;
    state.speed = speed;
    this.distanceX = speed;
  }

  move() {
    this.container.x += this.distanceX;

    if (this.right < 0) {
      this.container.emit('hidden');
    }
  }
}
