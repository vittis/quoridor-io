/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene";
import { HtmlUI }from "./html_ui/htmlUI";
import {Network} from "./network"


Network.setup();


var originalSize = {
  width: 1366,
  height: 768
}

const config: GameConfig = {
  width: originalSize.width,
  height: originalSize.height,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  transparent: true,
};

export var game : Phaser.Game;

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
declare var particlesJS: any;

window.onload = () => {
  particlesJS.load('particles-js', './assets/boilerplate/particlesjs-config.json', function() {
  });
  game = new Game(config);
  HtmlUI.setup();
};


window.addEventListener('resize', () => { 
  game.resize(Math.min(originalSize.width, window.innerWidth-20), Math.min(originalSize.height, window.innerHeight-20));
}, false);
