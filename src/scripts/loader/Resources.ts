import background from '../../sprites/background.png';
import jump from '../../sprites/jump.png';
import logo from '../../sprites/logo.png';
import platform from '../../sprites/platform.png';
import potato from '../../sprites/potato.png';
import tile from '../../sprites/tile.png';
import select_char from '../../sprites/select_char.png';
import play_button from '../../sprites/play_button.png';
import restart_button from '../../sprites/restart_button.png';
import score from '../../sprites/score.png';
import default_walk1 from '../../sprites/default_walk1.png';
import default_walk2 from '../../sprites/default_walk2.png';
import nano_walk1 from '../../sprites/nano_walk1.png';
import nano_walk2 from '../../sprites/nano_walk2.png';
import leo_walk1 from '../../sprites/leo_walk1.png';
import leo_walk2 from '../../sprites/leo_walk2.png';

import main_sound from '../../sounds/main.mp3';
import character_select_sound from '../../sounds/character_select.mp3';
import menu_select_sound from '../../sounds/menu_select.mp3';
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
  select_char,
  play_button,
  restart_button,
  score,
  default_walk1,
  default_walk2,
  nano_walk1,
  nano_walk2,
  leo_walk1,
  leo_walk2,
  main_sound,
  run_sound,
  jump_sound,
  collect_sound,
  game_over_sound,
  character_select_sound,
  menu_select_sound,
};
