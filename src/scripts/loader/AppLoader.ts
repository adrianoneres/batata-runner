import { Loader } from 'pixi.js';

import { resources } from '../state';
import { sprites, sounds } from './Resources';

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

      for (let key in sounds) {
        this.loader.add(key, sounds[key]);
      }

      this.loader.load((_, loaderResources) => {
        resources.sprites = Object.keys(loaderResources)
          .filter(value => loaderResources[value].extension === 'png')
          .reduce((obj, key) => {
            return { ...obj, [key]: loaderResources[key] };
          }, {});

        resources.sounds = Object.keys(loaderResources)
          .filter(value => loaderResources[value].extension === 'mp3')
          .reduce((obj, key) => {
            return { ...obj, [key]: loaderResources[key] };
          }, {});

        resolve();
      });
    });
  }
}
