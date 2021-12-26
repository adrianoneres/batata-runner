import { Container } from 'pixi.js';

import { randomNumber } from '../../utils/NumberUtils';
import { Platform } from './Platform';
import { Hero } from '../../characters/Hero';

interface IRanges {
  rows: IMinMax;
  cols: IMinMax;
  offset: IMinMax;
}

interface IMinMax {
  min: number;
  max: number;
}

interface IRandomData {
  x: number;
  cols: number;
  rows: number;
}

export class Platforms {
  container: Container;
  ranges: IRanges;
  platforms: Platform[];
  current: Platform;
  speed: number;

  constructor() {
    this.platforms = [];
    this.container = new Container();
    this.ranges = {
      rows: {
        min: 3,
        max: 7,
      },
      cols: {
        min: 3,
        max: 9,
      },
      offset: {
        min: 60,
        max: 200,
      },
    };

    this.createPlatform({
      rows: 4,
      cols: 6,
      x: 200,
    });
  }

  get randomData() {
    const randomOffset = randomNumber(
      this.ranges.offset.max,
      this.ranges.offset.min,
    );

    const x = this.current.right + randomOffset;
    const cols = randomNumber(this.ranges.cols.max, this.ranges.cols.min);
    const rows = randomNumber(this.ranges.rows.max, this.ranges.rows.min);

    return { x, cols, rows };
  }

  createPlatform(data: IRandomData) {
    const { x, rows, cols } = data;
    const platform = new Platform(x, cols, rows);

    this.container.addChild(platform.container);
    this.platforms.push(platform);
    this.current = platform;

    platform.container.once('hidden', () => {
      this.platforms = this.platforms.filter(item => item !== platform);
      platform.container.destroy();
    });
  }

  checkCollision(hero: Hero) {
    this.speed = hero.score;
    this.platforms.forEach(platform => {
      platform.checkCollision(hero);
    });
  }

  update(deltaTime: number) {
    if (this.current.right < window.innerWidth) {
      this.createPlatform(this.randomData);
    }

    this.platforms.forEach(platform => {
      platform.move();
    });
  }
}
