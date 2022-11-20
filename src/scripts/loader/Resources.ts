import background from '../../sprites/background.png';
import back_button from '../../sprites/back_button.png';
import back_button_pressed from '../../sprites/back_button_pressed.png';
import logo from '../../sprites/logo.png';
import final_score_board from '../../sprites/final_score_board.png';
import gameover from '../../sprites/gameover.png';
import platform from '../../sprites/platform.png';
import platform_left from '../../sprites/platform_left.png';
import platform_right from '../../sprites/platform_right.png';
import potato1 from '../../sprites/potato1.png';
import potato2 from '../../sprites/potato2.png';
import potato3 from '../../sprites/potato3.png';
import potato4 from '../../sprites/potato4.png';
import potato5 from '../../sprites/potato5.png';
import potato6 from '../../sprites/potato6.png';
import tile from '../../sprites/tile.png';
import tile_left from '../../sprites/tile_left.png';
import tile_right from '../../sprites/tile_right.png';
import select_char_board from '../../sprites/select_char_board.png';
import play_button from '../../sprites/play_button.png';
import play_button_pressed from '../../sprites/play_button_pressed.png';
import restart_button from '../../sprites/restart_button.png';
import restart_button_pressed from '../../sprites/restart_button_pressed.png';
import score1 from '../../sprites/score1.png';
import score2 from '../../sprites/score2.png';
import score3 from '../../sprites/score3.png';
import score4 from '../../sprites/score4.png';
import score5 from '../../sprites/score5.png';
import biel_walk1 from '../../sprites/biel_walk1.png';
import biel_walk2 from '../../sprites/biel_walk2.png';
import caua_walk1 from '../../sprites/caua_walk1.png';
import caua_walk2 from '../../sprites/caua_walk2.png';
import farofa_walk1 from '../../sprites/farofa_walk1.png';
import farofa_walk2 from '../../sprites/farofa_walk2.png';
import gab_walk1 from '../../sprites/gab_walk1.png';
import gab_walk2 from '../../sprites/gab_walk2.png';
import gu_walk1 from '../../sprites/gu_walk1.png';
import gu_walk2 from '../../sprites/gu_walk2.png';
import leo_walk1 from '../../sprites/leo_walk1.png';
import leo_walk2 from '../../sprites/leo_walk2.png';
import nano_walk1 from '../../sprites/nano_walk1.png';
import nano_walk2 from '../../sprites/nano_walk2.png';
import pedro_walk1 from '../../sprites/pedro_walk1.png';
import pedro_walk2 from '../../sprites/pedro_walk2.png';
import shulqs_walk1 from '../../sprites/shulqs_walk1.png';
import shulqs_walk2 from '../../sprites/shulqs_walk2.png';
import vi_walk1 from '../../sprites/vi_walk1.png';
import vi_walk2 from '../../sprites/vi_walk2.png';

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
  back_button,
  back_button_pressed,
  logo,
  final_score_board,
  gameover,
  platform,
  platform_left,
  platform_right,
  potato1,
  potato2,
  potato3,
  potato4,
  potato5,
  potato6,
  tile,
  tile_left,
  tile_right,
  select_char_board,
  play_button,
  play_button_pressed,
  restart_button,
  restart_button_pressed,
  score1,
  score2,
  score3,
  score4,
  score5,
  biel_walk1,
  biel_walk2,
  caua_walk1,
  caua_walk2,
  farofa_walk1,
  farofa_walk2,
  gab_walk1,
  gab_walk2,
  gu_walk1,
  gu_walk2,
  leo_walk1,
  leo_walk2,
  nano_walk1,
  nano_walk2,
  pedro_walk1,
  pedro_walk2,
  vi_walk1,
  vi_walk2,
  shulqs_walk1,
  shulqs_walk2,
};

export const sounds: IResources = {
  main_sound,
  run_sound,
  jump_sound,
  collect_sound,
  game_over_sound,
  character_select_sound,
  menu_select_sound,
};
