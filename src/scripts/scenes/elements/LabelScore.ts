import { Text } from 'pixi.js';

export class LabelScore extends Text {
  constructor(x = 10, y = 10, anchor = 0) {
    super('');
    this.x = x;
    this.y = y;
    this.anchor.set(anchor);
    this.style = {
      fontFamily: 'Verdana',
      fontWeight: 'bold',
      fontSize: 44,
      fill: ['#FF7F50'],
    };
    this.renderScore();
  }

  renderScore(score = 0) {
    this.text = `Score: ${score}`;
  }
}
