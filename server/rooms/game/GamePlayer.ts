export class GamePlayer {
  playerIndex;
  x;
  y;

  constructor (x: number, y: number, playerIndex) {
    this.playerIndex = playerIndex;
    this.x = x;
    this.y = y;
  }
}