import { Room } from "colyseus";
import { BoardState } from "./BoardState";
export declare class GameRoom extends Room<BoardState> {
    onInit(options: any): void;
    onJoin(client: any): void;
    onLeave(client: any): void;
    onMessage(client: any, data: any): void;
}
