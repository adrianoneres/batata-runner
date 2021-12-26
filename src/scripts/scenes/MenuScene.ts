import { AnimatedSprite, Container, Sprite, Text } from 'pixi.js';

import { characters, game, managers, meta, resources } from '../state';
import { Scene } from './Scene';
import { GameScene } from './GameScene';

export class MenuScene extends Scene {
  charContainer: Container;
  logo: Sprite;
  version: Text;
  popup: Sprite;
  charSprite: AnimatedSprite;
  charName: Text;
  playButton: Sprite;
  selectedSprite: AnimatedSprite;
  selectedName: Text;

  constructor() {
    super();
    this.charContainer = new Container();
    this.createScene();

    resources.sounds['run_sound'].sound.stop();
    resources.sounds['main_sound'].sound.play({
      volume: 0.25,
    });

    this.container.once('pointerdown', () => {
      managers.scenes.start(new GameScene());
    });
  }

  createScene() {
    this.createLogo();
    this.createPopup();
    this.createPlayButton();
    this.createVersionText();
  }

  onWindowResize() {
    this.resizeScene();
    this.resizeElements();
  }

  createLogo() {
    this.logo = new Sprite(resources.sprites['logo'].texture);
    this.logo.x = this.centerX - this.logo.width / 2;
    this.logo.y = this.centerY - this.logo.height;
    this.container.addChild(this.logo);
  }

  createPopup() {
    this.popup = new Sprite(resources.sprites['select_char_board'].texture);
    this.popup.interactive = true;
    this.popup.buttonMode = true;
    this.popup.x = this.centerX - this.popup.width / 2;
    this.popup.y = this.centerY - 24;
    this.popup.on('pointerdown', () => this.changeCharacter());
    this.container.addChild(this.popup);

    this.showCharacter(characters.availableCharacters[0].id);
  }

  showCharacter(id: string) {
    if (this.selectedSprite) {
      this.container.removeChild(this.selectedSprite);
    }

    if (this.selectedName) {
      this.container.removeChild(this.selectedName);
    }

    const currentCharacter = characters.availableCharacters.find(
      char => char.id === game.selectedCharacter,
    );

    this.charSprite = new AnimatedSprite([
      resources.sprites[`${currentCharacter.id}_walk1`].texture,
      resources.sprites[`${currentCharacter.id}_walk2`].texture,
    ]);
    this.charSprite.x = this.centerX - this.charSprite.width / 2;
    this.charSprite.y = this.centerY + this.charSprite.height / 2 + 16;
    this.charSprite.loop = true;
    this.charSprite.animationSpeed = 0.125;
    this.charSprite.play();
    this.selectedSprite = this.charSprite;
    this.container.addChild(this.charSprite);

    this.charName = new Text(currentCharacter.name);
    this.charName.anchor.set(0.5);
    this.charName.x = this.centerX;
    this.charName.y = this.centerY + this.popup.height - 54;
    this.charName.style = {
      fontFamily: 'VT323',
      fontSize: 36,
      fill: ['#FFFFFF'],
    };
    this.selectedName = this.charName;
    this.container.addChild(this.charName);
  }

  changeCharacter() {
    const currentCharIndex = characters.availableCharacters.findIndex(
      c => c.id === game.selectedCharacter,
    );
    const nextIndex =
      currentCharIndex === characters.availableCharacters.length - 1
        ? 0
        : currentCharIndex + 1;
    const nextChar = characters.availableCharacters[nextIndex];
    game.selectedCharacter = nextChar.id;
    resources.sounds['character_select_sound'].sound.play({
      volume: 1,
    });
    this.showCharacter(nextChar.id);
  }

  createPlayButton() {
    this.playButton = new Sprite(resources.sprites['play_button'].texture);
    this.playButton.width = 140;
    this.playButton.height = 70;
    this.playButton.x = this.centerX - this.playButton.width / 2;
    this.playButton.y = this.centerY + this.popup.height + 20;
    this.playButton.interactive = true;
    this.playButton.buttonMode = true;
    this.playButton.on('pointerdown', () => {
      this.playButton.texture =
        resources.sprites['play_button_pressed'].texture;
      resources.sounds['character_select_sound'].sound.play({
        volume: 1,
      });
    });
    this.playButton.on('pointerup', () => {
      resources.sprites['play_button'].texture;
      managers.scenes.start(new GameScene());
    });
    this.container.addChild(this.playButton);
  }

  createVersionText() {
    this.version = new Text(`v. ${meta.version}`);
    this.version.anchor.set(0.5);
    this.version.x = this.centerX + 225;
    this.version.y = this.centerY - 85;
    this.version.style = {
      fontFamily: 'VT323',
      fontSize: 16,
      fill: ['#FFFFFF'],
    };

    this.container.addChild(this.version);
  }

  resizeElements() {
    this.logo.x = this.centerX - this.logo.width / 2;
    this.logo.y = this.centerY - this.logo.height;

    this.version.x = this.centerX + 225;
    this.version.y = this.centerY - 85;

    this.popup.x = this.centerX - this.popup.width / 2;
    this.popup.y = this.centerY - 24;

    this.charSprite.x = this.centerX - this.charSprite.width / 2;
    this.charSprite.y = this.centerY + this.charSprite.height / 2 + 16;

    this.charName.x = this.centerX;
    this.charName.y = this.centerY + this.popup.height - 54;

    this.playButton.x = this.centerX - this.playButton.width / 2;
    this.playButton.y = this.centerY + this.popup.height + 20;
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
  }
}
