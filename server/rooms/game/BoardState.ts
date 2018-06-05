import { EntityMap } from "colyseus";
import { GamePlayer } from "./GamePlayer";
import { GridManager } from "./GridManager";


export class BoardState {
    players: EntityMap<GamePlayer> = {};

    gridManager : GridManager;


    constructor() { 
        this.gridManager = new GridManager();
        console.log("Board State Criado");
    }

    addPlayer (client) {
        var playerIndex = Object.keys(this.players).length;
        this.players[client.sessionId] = new GamePlayer(this.gridManager.playersPos[playerIndex].x, this.gridManager.playersPos[playerIndex].y, playerIndex);
        console.log("new player joined = "+this.players[client.sessionId].x);
    }

    removePlayer (client) {
        delete this.players[client.sessionId];
    }



    movePlayer (client, action) {

    }
}
