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
  character: 'biel',
  characters: [
    { id: 'biel', name: 'Biel' },
    { id: 'caua', name: 'Caua' },
    { id: 'farofa', name: 'Farofa' },
    { id: 'gu', name: 'Gu' },
    { id: 'kevin', name: 'Kevin' },
    { id: 'leo', name: 'Leo' },
    { id: 'lo', name: 'Lo' },
    { id: 'marco', name: 'Marco' },
    { id: 'nano', name: 'Nano' },
    { id: 'vi', name: 'Vi' },
  ],
};
