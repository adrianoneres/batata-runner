import { LoaderResource } from 'pixi.js';
import { SceneManager } from '../scenes/SceneManager';

interface IState {
  score: number;
  scene: SceneManager;
  resources: {
    [key: string]: LoaderResource;
  };
}

export const state: IState = {
  score: 0,
  scene: {} as SceneManager,
  resources: {},
};
