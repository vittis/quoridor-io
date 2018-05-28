import { Room, Client } from "colyseus";
import { BoardState } from "./BoardState";

export class GameRoom extends Room<BoardState> {



  onInit (options: any) {
    console.log("Game Room Criado");
    this.maxClients = 2;

    this.setState(new BoardState());
    
    /* this.state.gridManager.putFence(1,0, false);
    this.state.gridManager.putFence(0,0, false); */

    //this.state.gridManager.putFence(0,7, true);
    
    //this.state.gridManager.putFence(0,5, true);

    this.state.gridManager.printFullGrid();
  }

  onJoin (client) {
    this.state.addPlayer(client);
    
  }

  onLeave (client) {
    this.state.removePlayer(client);
  }

  onMessage (client, data) {
    /* if (data.action) {
      this.state.movePlayer(client, data.action);
    } */
  }
}