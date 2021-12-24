import { LoaderResource } from 'pixi.js';
import { SceneManager } from '../scenes/SceneManager';

interface IState {
  speed: number;
  scene: SceneManager;
  resources: {
    [key: string]: any;
  };
  character: string;
  characters: ICharacter[];
}

interface ICharacter {
  id: string;
  name: string;
}

export const state: IState = {
  speed: -5,
  scene: {} as SceneManager,
  resources: {},
  character: 'default',
  characters: [
    { id: 'default', name: 'Default' },
    { id: 'nano', name: 'Nano' },
    { id: 'leo', name: 'Leo' },
  ],
};
