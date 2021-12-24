import { AnimatedSprite, Container, Graphics, Sprite, Text } from 'pixi.js';

import { state } from '../state/Global';
import { Scene } from './Scene';
import { LabelScore } from './elements/LabelScore';
import { MainScene } from './MainScene';
import { Background } from './elements/Background';

export class MainMenuScene extends Scene {
  container: Container;
  charContainer: Container;
  background: Background;
  popup: Graphics;
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
    this.createCharactersContainer();
    this.crateInstructionLabel();
    this.showCharacter('default');
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
    this.logo.x = window.innerWidth / 2 - this.logo.width / 2;
    this.logo.y = 0;
    this.container.addChild(this.logo);
  }

  createCharactersContainer() {
    this.popup = new Graphics();
    const width = 200;
    const height = 200;
    const x = window.innerWidth / 2 - width / 2;
    const y = this.logo.height - 60;
    this.popup.beginFill(0xffffff, 0.8);
    this.popup.drawRect(x, y, width, height);
    this.popup.interactive = true;
    this.popup.buttonMode = true;
    this.popup.on('pointerdown', () => this.changeCharacter());
    this.container.addChild(this.popup);
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
    this.showCharacter(nextChar.id);
  }

  crateInstructionLabel() {
    const text = new Text('');
    text.anchor.set(0.5);
    text.x = window.innerWidth / 2;
    text.y = window.innerHeight / 2 - 120;
    text.style = {
      fontFamily: 'Verdana',
      fontWeight: 'bold',
      fontSize: 14,
      fill: ['#060606'],
    };
    text.text = 'Toque para escolher';
    this.popup.addChild(text);
  }

  showCharacter(id: string) {
    if (this.selectedSprite) {
      this.popup.removeChild(this.selectedSprite);
    }

    if (this.selectedName) {
      this.popup.removeChild(this.selectedName);
    }

    const selectedCharacter = state.characters.find(char => char.id === id);

    const charSprite = new AnimatedSprite([
      state.resources[`${selectedCharacter.id}_walk1`].texture,
      state.resources[`${selectedCharacter.id}_walk2`].texture,
    ]);
    charSprite.x = window.innerWidth / 2 - charSprite.width / 2;
    charSprite.y = this.logo.height;
    charSprite.loop = true;
    charSprite.animationSpeed = 0.125;
    charSprite.play();
    this.selectedSprite = charSprite;
    this.popup.addChild(charSprite);

    const charName = new Text('');
    charName.anchor.set(0.5);
    charName.x = window.innerWidth / 2;
    charName.y = window.innerHeight / 2 + 20;
    charName.style = {
      fontFamily: 'Verdana',
      fontWeight: 'bold',
      fontSize: 20,
      fill: ['#FF7F50'],
    };
    charName.text = selectedCharacter.name;
    this.selectedName = charName;
    this.popup.addChild(charName);
  }

  createPlayButton() {
    const button = new Sprite(state.resources['potato'].texture);
    button.x = window.innerWidth / 2 - button.width / 2;
    button.y = this.logo.height + 150;
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', () => {
      state.scene.start(new MainScene());
    });
    this.container.addChild(button);
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
  }
}
