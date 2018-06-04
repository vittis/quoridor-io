import * as Colyseus from "colyseus.js"
import {Network} from "../network"

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  room : Colyseus.Room;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("logo", "./assets/boilerplate/phaser.png");
    this.load.image("tilewhite", "./assets/boilerplate/tilewhite.png");

  }

  create(): void {
    //this.phaserSprite = this.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, "logo");
    this.events.on('resize', this.onResize, this);
    this.events.on('wake', this.onWake, this);
    this.events.on('sleep', this.onSleep, this);

    this.sys.sleep();
  }
  onSleep() {
    console.log("onSleep");
  }
  onWake() {
    console.log("onWake");
    this.setupBoard();
  }
  setupBoard() {
    console.log('setup board');
    /* var quad=this.make.graphics({x:0, y:0, add:false });
    var color = 0xffff00;
    quad.fillStyle(color);
    quad.fillRectShape
    quad.fillRect(0, 0, 200, 200);
    quad.generateTexture('quadTexture',200, 200);
    var image = this.add.image(0,0,'quadTexture'); */
    var container = this.add.container(0, 10);
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        var tile = this.add.sprite(i*92, j*92, "tilewhite");
        tile.setTint(0xff1235);
        //tile.setScale(0.85, 0.85);
        tile.setOrigin(0,0);
        container.add(tile);
      }
    }
    container.x = container.getBounds().width/2;
    //container.y = container.getBounds().height/2;;
    container.setScale(0.85, 0.85);

  }





  onClickPlayRanked() {
    console.log("onclickplayranked mainscene");
    this.sys.wake();
    
    this.room = Network.client.join("game");
    this.room.onJoin.add(function () {
      console.log("joinedsamxiba");
    });
  }







  onResize() {
    /* this.phaserSprite.x = this.sys.canvas.width/2;
    this.phaserSprite.y = this.sys.canvas.height/2; */
  }
}
