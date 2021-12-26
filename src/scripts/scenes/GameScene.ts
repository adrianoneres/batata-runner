import { AnimatedSprite, Sprite, Text } from 'pixi.js';

import { game, managers, resources } from '../state';
import { Scene } from './Scene';
import { FinalScene } from './FinalScene';
import { Background } from './elements/Background';
import { Platforms } from './elements/Platforms';
import { Hero } from '../characters/Hero';

export class GameScene extends Scene {
  background: Background;
  hero: Hero;
  scoreValue: Text;
  scoreBoard: AnimatedSprite;
  platforms: Platforms;

  constructor() {
    super();
    this.createScene();
    resources.sounds['main_sound'].sound.stop();
    resources.sounds['run_sound'].sound.stop();
    resources.sounds['run_sound'].sound.play({
      loop: true,
      volume: 0.1,
    });
  }

  createScene() {
    this.createPlatforms();
    this.createHero();
    this.createScore();
  }

  onWindowResize(): void {
    this.resizeScene();
  }

  createPlatforms() {
    this.platforms = new Platforms();
    this.container.addChild(this.platforms.container);
  }

  createHero() {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);
    this.container.interactive = true;
    this.container.on('pointerdown', () => {
      this.hero.startJump();
    });
    this.hero.sprite.on('score', () => {
      this.scoreValue.text = '' + this.hero.score;
    });
    this.hero.sprite.once('die', () => {
      game.speed = 5;
      resources.sounds['game_over_sound'].sound.play({ volume: 0.5 });
      managers.scenes.start(new FinalScene(this.hero.score));
    });
  }

  createScore() {
    this.scoreBoard = new AnimatedSprite([
      resources.sprites[game.showScore ? 'score5' : 'score1'].texture,
    ]);
    this.scoreBoard.x = window.innerWidth - this.scoreBoard.width - 10;
    this.scoreBoard.y = 10;
    this.scoreBoard.interactive = true;
    this.scoreBoard.buttonMode = true;
    this.scoreBoard.loop = false;
    this.scoreBoard.animationSpeed = 0.125;
    this.scoreBoard.on('pointerdown', () => {
      game.showScore = !game.showScore;
      game.showScore ? this.showScore() : this.hideScore();
    });

    this.container.addChild(this.scoreBoard);

    this.scoreValue = new Text('' + this.hero.score);
    this.scoreValue.style = {
      fontFamily: 'VT323',
      fontSize: 30,
      fill: ['#FFFFFF'],
    };
    this.scoreValue.x = window.innerWidth - this.scoreBoard.width + 20;
    this.scoreValue.y = 40;
    this.scoreValue.visible = game.showScore;
    this.container.addChild(this.scoreValue);
  }

  showScore() {
    this.scoreBoard.textures = [
      resources.sprites['score1'].texture,
      resources.sprites['score2'].texture,
      resources.sprites['score3'].texture,
      resources.sprites['score4'].texture,
      resources.sprites['score5'].texture,
    ];

    this.scoreBoard.play();
    setTimeout(() => {
      this.scoreValue.visible = true;
    }, 750);
  }

  hideScore() {
    this.scoreValue.visible = false;
    this.scoreBoard.textures = [
      resources.sprites['score5'].texture,
      resources.sprites['score4'].texture,
      resources.sprites['score3'].texture,
      resources.sprites['score2'].texture,
      resources.sprites['score1'].texture,
    ];

    this.scoreBoard.play();
  }

  update(deltaTime: number) {
    this.background.update(deltaTime);
    this.platforms.checkCollision(this.hero);
    this.platforms.update(deltaTime);
    this.hero.update(deltaTime);
  }

  destroy() {
    super.container.destroy();
  }
}
