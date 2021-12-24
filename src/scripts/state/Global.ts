import { LoaderResource } from 'pixi.js';
import { SceneManager } from '../scenes/SceneManager';

interface IState {
  speed: number;
  scene: SceneManager;
  resources: {
    [key: string]: any;
  };
}

export const state: IState = {
  speed: -5,
  scene: {} as SceneManager,
  resources: {},
};
