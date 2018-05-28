import { EntityMap } from "colyseus";
import { GamePlayer } from "./GamePlayer";
import { GridManager } from "./GridManager";
export declare class BoardState {
    players: EntityMap<GamePlayer>;
    gridManager: GridManager;
    constructor();
    addPlayer(client: any): void;
    removePlayer(client: any): void;
    movePlayer(client: any, action: any): void;
}
