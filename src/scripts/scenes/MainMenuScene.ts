import { AnimatedSprite, Container, Sprite, Text } from 'pixi.js';

import { state } from '../state/Global';
import { Scene } from './Scene';
import { LabelScore } from './elements/LabelScore';
import { MainScene } from './MainScene';
import { Background } from './elements/Background';

const CENTER_X = window.innerWidth / 2;
const CENTER_Y = window.innerHeight / 2;
export class MainMenuScene extends Scene {
  charContainer: Container;
  background: Background;
  popup: Sprite;
  labelScore: LabelScore;
  logo: Sprite;
  selectedSprite: AnimatedSprite;
  selectedName: Text;

  constructor() {
    super();
    this.container = new Container();
    this.charContainer = new Container();
    this.createBackground();
    this.createLogo();
    this.createPopup();
    this.createPlayButton();

    state.resources['run_sound'].sound.stop();
    state.resources['main_sound'].sound.play({
      volume: 0.5,
    });

    this.container.once('pointerdown', () => {
      state.scene.start(new MainScene());
    });
  }

  createBackground() {
    this.background = new Background();
    this.container.addChild(this.background.container);
  }

  createLogo() {
    this.logo = new Sprite(state.resources['logo'].texture);
    this.logo.x = CENTER_X - this.logo.width / 2;
    this.logo.y = CENTER_Y - this.logo.height;
    this.container.addChild(this.logo);
  }

  createPopup() {
    this.popup = new Sprite(state.resources['select_char'].texture);
    this.popup.interactive = true;
    this.popup.buttonMode = true;
    this.popup.x = CENTER_X - this.popup.width / 2;
    this.popup.y = CENTER_Y;
    this.popup.on('pointerdown', () => this.changeCharacter());
    this.container.addChild(this.popup);

    this.showCharacter('default');
  }

  showCharacter(id: string) {
    if (this.selectedSprite) {
      this.container.removeChild(this.selectedSprite);
    }

    if (this.selectedName) {
      this.container.removeChild(this.selectedName);
    }

    const selectedCharacter = state.characters.find(char => char.id === id);

    const charSprite = new AnimatedSprite([
      state.resources[`${selectedCharacter.id}_walk1`].texture,
      state.resources[`${selectedCharacter.id}_walk2`].texture,
    ]);
    charSprite.x = CENTER_X - charSprite.width / 2;
    charSprite.y = CENTER_Y + charSprite.height / 2 + 40;
    charSprite.loop = true;
    charSprite.animationSpeed = 0.125;
    charSprite.play();
    this.selectedSprite = charSprite;
    this.container.addChild(charSprite);

    const charName = new Text('');
    charName.anchor.set(0.5);
    charName.x = CENTER_X;
    charName.y = CENTER_Y + this.popup.height - 30;
    charName.style = {
      fontFamily: 'VT323',
      fontSize: 36,
      fill: ['#FFFFFF'],
    };
    charName.text = selectedCharacter.name;
    this.selectedName = charName;
    this.container.addChild(charName);
  }

  changeCharacter() {
    const currentCharIndex = state.characters.findIndex(
      c => c.id === state.character,
    );
    const nextIndex =
      currentCharIndex === state.characters.length - 1
        ? 0
        : currentCharIndex + 1;
    const nextChar = state.characters[nextIndex];
    state.character = nextChar.id;
    state.resources['character_select_sound'].sound.play({
      volume: 1,
    });
    this.showCharacter(nextChar.id);
  }

  createPlayButton() {
    const button = new Sprite(state.resources['play_button'].texture);
    button.width = 140;
    button.height = 70;
    button.x = CENTER_X - button.width / 2;
    button.y = CENTER_Y + this.popup.height + 20;
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', () => {
      state.resources['menu_select_sound'].sound.play({
        volume: 1,
      });
      state.scene.start(new MainScene());
    });
    this.container.addChild(button);
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
  }
}
