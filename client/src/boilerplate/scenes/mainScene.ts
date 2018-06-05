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
    this.events.on('resize', this.onResize, this);


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

    var container = this.add.container(0, 0);
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let xPos = i*92;
        let yPos = j*92;
        var tile = this.add.sprite(xPos, yPos, "tilewhite");
        tile.setTint(0xe5e5e5);
        tile.setOrigin(0,0);
        container.add(tile);
        tile.alpha=0;
        tile.y=yPos-50;
        var tween = this.tweens.add({
          targets: tile,
          alpha: 1,
          y: yPos,
          ease: 'Back.easeOut',
          duration: 500,
          easeParams: [ 5 ],
          //delay: Math.random()*1000+i*50+j*50,
          //delay: i*Math.random()*250+j*Math.random()*250
          delay: (i+j)*100
        });
        
      }
    }
    container.setScale(0.85, 0.85);

    container.x = this.sys.canvas.width/2-container.getBounds().width/2;
    container.y = this.sys.canvas.height/2-container.getBounds().height/2;
    /* container.alpha =0;
    var tween = this.tweens.add({
      targets: container,
      alpha: 1,
      ease: 'Linear',
      duration: 1000
    }); */

  }





  onClickPlayRanked() {
    console.log("onclickplayranked mainscene");
    
    this.room = Network.client.join("game");
    this.room.onJoin.add(() =>{
      console.log("onJoinRoom");
      Network.status = Network.clientStatus.WAITING_OPPONENT;
      this.sys.wake();
    });

    let numPlayers = 0;
    this.room.listen("players/:id", (change) => {
      numPlayers++;
      console.log("aeporra")

      if (numPlayers === 2) {
        console.log("tem 2")
      }
    });
    
  }

  onResize() {
    if (this.sys.isVisible()) {
     // this.cameras.baseScale=0.5;
    }
  }
}
