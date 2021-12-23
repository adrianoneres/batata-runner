import { Loader } from 'pixi.js';

import { sprites } from './Resources';
import { state } from '../state/Global';

export class AppLoader {
  loader: Loader;

  constructor(loader: Loader) {
    this.loader = loader;
  }

  preload() {
    return new Promise<void>(resolve => {
      for (let key in sprites) {
        this.loader.add(key, sprites[key]);
      }

      this.loader.load((loader, resources) => {
        state.resources = resources;
        resolve();
      });
    });
  }
}
