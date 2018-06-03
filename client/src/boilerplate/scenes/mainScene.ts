/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("logo", "./assets/boilerplate/phaser.png");
  }

  create(): void {
    this.phaserSprite = this.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, "logo");
    this.events.on('resize', this.onResize, this);
  }

  onResize() {
    this.phaserSprite.x = this.sys.canvas.width/2;
    this.phaserSprite.y = this.sys.canvas.height/2;
  }
}

/* function resize (width, height) {
  console.log("q")
    if (width === undefined) { 
      width = this.sys.game.config.width; 
    }
    if (height === undefined) { 
      height = this.sys.game.config.height; 
    }
    
    this.cameras.resize(width, height);

} */