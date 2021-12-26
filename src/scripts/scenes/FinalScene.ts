import { Sprite, Text } from 'pixi.js';

import { managers, resources } from '../state';
import { Scene } from './Scene';
import { GameScene } from './GameScene';
import { MenuScene } from './MenuScene';
export class FinalScene extends Scene {
  gameover: Sprite;
  popup: Sprite;
  score: Text;
  amount: number;
  backButton: Sprite;
  restartButton: Sprite;

  constructor(amount: number) {
    super();
    this.amount = amount;
    this.createScene();
  }

  createScene() {
    this.createBackground();
    this.createGameOver();
    this.createPopup();
    this.createScore(this.amount);
    this.createBackButton();
    this.createRestartButton();
  }

  onWindowResize() {
    this.resizeScene();
    this.resizeElements();
  }

  createGameOver() {
    this.gameover = new Sprite(resources.sprites['gameover'].texture);
    this.gameover.x = this.centerX - this.gameover.width / 2;
    this.gameover.y = this.centerY - this.gameover.height;
    this.container.addChild(this.gameover);
  }

  createPopup() {
    this.popup = new Sprite(resources.sprites['final_score_board'].texture);
    this.popup.x = this.centerX - this.popup.width / 2;
    this.popup.y = this.centerY - this.popup.height + 80;
    this.container.addChild(this.popup);
  }

  createScore(amount: number) {
    this.score = new Text(`${amount}`);
    this.score.x = this.centerX - this.score.width / 2;
    this.score.y =
      this.centerY - this.popup.height + this.popup.height / 2 + 80;
    this.score.style = {
      fontFamily: 'VT323',
      fontSize: 60,
      fill: ['#FFFFFF'],
    };

    this.container.addChild(this.score);
  }

  createBackButton() {
    this.backButton = new Sprite(resources.sprites['back_button'].texture);
    this.backButton.anchor.set(0.5);
    this.backButton.width = 140;
    this.backButton.height = 70;
    this.backButton.x = this.centerX - this.backButton.width / 2 - 10;
    this.backButton.y = this.centerY + 140;
    this.backButton.interactive = true;
    this.backButton.buttonMode = true;
    this.backButton.on('pointerdown', () => {
      this.backButton.texture =
        resources.sprites['back_button_pressed'].texture;
      resources.sounds['character_select_sound'].sound.play({
        volume: 1,
      });
    });
    this.backButton.on('pointerout', () => {
      this.backButton.texture = resources.sprites['back_button'].texture;
    });
    this.backButton.on('pointerup', () => {
      this.backButton.texture = resources.sprites['back_button'].texture;
      managers.scenes.start(new MenuScene());
    });

    this.container.addChild(this.backButton);
  }

  createRestartButton() {
    this.restartButton = new Sprite(
      resources.sprites['restart_button'].texture,
    );
    this.restartButton.anchor.set(0.5);
    this.restartButton.width = 140;
    this.restartButton.height = 70;
    this.restartButton.x = this.centerX + this.restartButton.width / 2 + 10;
    this.restartButton.y = this.centerY + 140;
    this.restartButton.interactive = true;
    this.restartButton.buttonMode = true;
    this.restartButton.on('pointerdown', () => {
      this.restartButton.texture =
        resources.sprites['restart_button_pressed'].texture;
      resources.sounds['character_select_sound'].sound.play({
        volume: 1,
      });
    });
    this.restartButton.on('pointerout', () => {
      this.restartButton.texture = resources.sprites['restart_button'].texture;
    });
    this.restartButton.on('pointerup', () => {
      this.restartButton.texture = resources.sprites['restart_button'].texture;
      managers.scenes.start(new GameScene());
    });

    this.container.addChild(this.restartButton);
  }

  resizeElements() {
    this.gameover.x = this.centerX - this.gameover.width / 2;
    this.gameover.y = this.centerY - this.gameover.height;

    this.popup.x = this.centerX - this.popup.width / 2;
    this.popup.y = this.centerY - this.popup.height + 80;

    this.score.x = this.centerX - this.score.width / 2;
    this.score.y =
      this.centerY - this.popup.height + this.popup.height / 2 + 80;

    this.backButton.x = this.centerX - this.backButton.width / 2 - 10;
    this.backButton.y = this.centerY + 140;

    this.restartButton.x = this.centerX + this.restartButton.width / 2 + 10;
    this.restartButton.y = this.centerY + 140;
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
  }
}
