/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene";
import * as Colyseus from "colyseus.js"

var host = window.document.location.host.replace(/:.*/, '');

var client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':3333' : ''));
console.log("karqpov a   ")

var room = client.join("game");

room.onJoin.add(function () {
  console.log("joinedsam");
});


var originalSize = {
  width: 1366,
  height: 768
}

// main game configuration
const config: GameConfig = {
  width: originalSize.width,
  height: originalSize.height,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  transparent: true,
};

var game : Phaser.Game;

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
};


window.addEventListener('resize', () => { 
  game.resize(Math.min(originalSize.width, window.innerWidth-20), Math.min(originalSize.height, window.innerHeight-20));
}, false);
