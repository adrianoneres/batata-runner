import background from '../../sprites/background.png';
import jump from '../../sprites/jump.png';
import logo from '../../sprites/logo.png';
import platform from '../../sprites/platform.png';
import potato from '../../sprites/potato.png';
import tile from '../../sprites/tile.png';
import default_walk1 from '../../sprites/default_walk1.png';
import default_walk2 from '../../sprites/default_walk2.png';
import nano_walk1 from '../../sprites/nano_walk1.png';
import nano_walk2 from '../../sprites/nano_walk2.png';

import main_sound from '../../sounds/main.mp3';
import run_sound from '../../sounds/run.mp3';
import jump_sound from '../../sounds/jump.mp3';
import collect_sound from '../../sounds/collect.mp3';
import game_over_sound from '../../sounds/game_over.mp3';

interface IResources {
  [key: string]: any;
}

export const sprites: IResources = {
  background,
  jump,
  logo,
  platform,
  potato,
  tile,
  default_walk1,
  default_walk2,
  nano_walk1,
  nano_walk2,
  main_sound,
  run_sound,
  jump_sound,
  collect_sound,
  game_over_sound,
};
