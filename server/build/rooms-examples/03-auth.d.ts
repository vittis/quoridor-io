import { Room } from "colyseus";
export declare class AuthRoom extends Room {
    onInit(options: any): void;
    onJoin(client: any): void;
    onLeave(client: any): void;
    onMessage(client: any, data: any): void;
    onDispose(): void;
}
