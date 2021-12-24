import background from '../../sprites/background.png';
import jump from '../../sprites/jump.png';
import logo from '../../sprites/logo.png';
import platform from '../../sprites/platform.png';
import potato from '../../sprites/potato.png';
import tile from '../../sprites/tile.png';
import walk1 from '../../sprites/walk1.png';
import walk2 from '../../sprites/walk2.png';
import nano_walk1 from '../../sprites/nano_walk1.png';
import nano_walk2 from '../../sprites/nano_walk2.png';
import main_sound from '../../sounds/main.mp3';

interface ISprites {
  [key: string]: any;
}

export const sprites: ISprites = {
  background,
  jump,
  logo,
  platform,
  potato,
  tile,
  walk1,
  walk2,
  nano_walk1,
  nano_walk2,
  main_sound,
};
