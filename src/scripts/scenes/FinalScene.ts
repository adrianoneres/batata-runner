import { Sprite, Text } from 'pixi.js';

import { game, managers, resources } from '../state';
import { Scene } from './Scene';
import { GameScene } from './GameScene';
export class FinalScene extends Scene {
  popup: Sprite;
  score: Text;
  amount: number;
  restartButton: Sprite;

  constructor(amount: number) {
    super();
    this.amount = amount;
    this.createScene();
  }

  createScene() {
    this.createBackground();
    this.createPopup();
    this.createScore(this.amount);
    this.createRestartButton();
  }

  onWindowResize(): void {
    this.resizeScene();
    this.resizeElements();
  }

  createPopup() {
    this.popup = new Sprite(resources.sprites['score'].texture);
    this.popup.x = this.centerX - this.popup.width / 2;
    this.popup.y = this.centerY - this.popup.height;
    this.container.addChild(this.popup);
  }

  createScore(amount: number) {
    this.score = new Text(`${amount}`);
    this.score.x = this.centerX - this.score.width / 2;
    this.score.y = this.centerY - this.popup.height + this.popup.height / 2;
    this.score.style = {
      fontFamily: 'VT323',
      fontSize: 60,
      fill: ['#FFFFFF'],
    };

    this.container.addChild(this.score);
  }

  createRestartButton() {
    this.restartButton = new Sprite(
      resources.sprites['restart_button'].texture,
    );
    this.restartButton.width = 140;
    this.restartButton.height = 70;
    this.restartButton.x = this.centerX - this.restartButton.width / 2;
    this.restartButton.y = this.centerY + 60;
    this.restartButton.interactive = true;
    this.restartButton.buttonMode = true;
    this.restartButton.on('pointerdown', () => {
      resources.sounds['menu_select_sound'].sound.play({
        volume: 1,
      });
      managers.scenes.start(new GameScene());
    });

    this.container.addChild(this.restartButton);
  }

  resizeElements() {
    this.popup.x = this.centerX - this.popup.width / 2;
    this.popup.y = this.centerY - this.popup.height;

    this.score.x = this.centerX - this.score.width / 2;
    this.score.y = this.centerY - this.popup.height + this.popup.height / 2;

    this.restartButton.x = this.centerX - this.restartButton.width / 2;
    this.restartButton.y =
      this.centerY - this.popup.height + this.popup.height + 60;
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
  }
}
