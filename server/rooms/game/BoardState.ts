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
        this.players[ client.sesssionId ] = new GamePlayer();
    }

    removePlayer (client) {
        delete this.players[client.sessionId];
    }



    movePlayer (client, action) {

    }
}
