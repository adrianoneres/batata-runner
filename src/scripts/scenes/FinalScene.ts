import { Container, Graphics, Text } from 'pixi.js';

import { state } from '../state/Global';
import { Scene } from './Scene';
import { LabelScore } from './elements/LabelScore';
import { MainScene } from './MainScene';
import { Background } from './elements/Background';

export class FinalScene extends Scene {
  container: Container;
  background: Background;
  popup: Graphics;
  labelScore: LabelScore;

  constructor(amount: number) {
    super();
    this.container = new Container();
    this.container.interactive = true;
    this.createBackground();
    this.createPopup();
    this.createLabelScore(amount);
    this.createText();

    this.container.once('pointerdown', () => {
      state.scene.start(new MainScene());
    });
  }

  createBackground() {
    this.background = new Background();
    this.container.addChild(this.background.container);
  }

  createPopup() {
    this.popup = new Graphics();
    const width = 600;
    const height = 400;
    const x = window.innerWidth / 2 - width / 2;
    const y = window.innerHeight / 2 - height / 2;
    this.popup.beginFill(0x000000, 0.5);
    this.popup.drawRect(x, y, width, height);
    this.container.addChild(this.popup);
  }

  createLabelScore(amount: number) {
    this.labelScore = new LabelScore(
      window.innerWidth / 2,
      window.innerHeight / 2,
      0.5,
    );
    this.container.addChild(this.labelScore);
    this.labelScore.renderScore(amount);
  }

  createText() {
    const text = new Text('');
    text.anchor.set(0.5);
    text.x = window.innerWidth / 2;
    text.y = window.innerHeight / 2 + 100;
    text.style = {
      fontFamily: 'Verdana',
      fontWeight: 'bold',
      fontSize: 34,
      fill: ['#FFFFFF'],
    };
    text.text = 'Tap to restart';
    this.popup.addChild(text);
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
  }
}
