import { SceneManager } from '../scenes/SceneManager';
import { SoundManager } from '../sounds/SoundManager';

interface IState {
  scenes: SceneManager;
  sounds: SoundManager;
}

export const managers: IState = {
  scenes: new SceneManager(),
  sounds: new SoundManager(),
};
