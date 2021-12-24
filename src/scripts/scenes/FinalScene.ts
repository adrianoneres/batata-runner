import { Container, Graphics, Sprite, Text } from 'pixi.js';

import { state } from '../state/Global';
import { Scene } from './Scene';
import { LabelScore } from './elements/LabelScore';
import { MainScene } from './MainScene';
import { Background } from './elements/Background';

const CENTER_X = window.innerWidth / 2;
const CENTER_Y = window.innerHeight / 2;
export class FinalScene extends Scene {
  background: Background;
  popup: Sprite;
  labelScore: LabelScore;

  constructor(amount: number) {
    super();
    this.container = new Container();
    this.container.interactive = true;
    this.createBackground();
    this.createPopup();
    this.showScore(amount);
    this.createRestartButton();
  }

  createBackground() {
    this.background = new Background();
    this.container.addChild(this.background.container);
  }

  createPopup() {
    this.popup = new Sprite(state.resources['score'].texture);
    this.popup.x = CENTER_X - this.popup.width / 2;
    this.popup.y = CENTER_Y - this.popup.height;
    this.container.addChild(this.popup);
  }

  showScore(amount: number) {
    const scoreText = new Text(`${amount}`);
    scoreText.style = {
      fontFamily: 'VT323',
      fontSize: 60,
      fill: ['#FFFFFF'],
    };
    scoreText.y = CENTER_Y - this.popup.height + this.popup.height / 2;
    scoreText.x = CENTER_X - scoreText.width / 2;
    this.container.addChild(scoreText);
  }

  createRestartButton() {
    const button = new Sprite(state.resources['restart_button'].texture);
    button.width = 140;
    button.height = 70;
    button.x = CENTER_X - button.width / 2;
    button.y = CENTER_Y - this.popup.height + this.popup.height + 20;
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
