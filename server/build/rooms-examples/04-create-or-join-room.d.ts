import { Room } from "colyseus";
export declare class CreateOrJoinRoom extends Room<any> {
    maxClients: number;
    onInit(options: any): void;
    onJoin(client: any, options: any, auth: any): void;
    requestJoin(options: any, isNewRoom: boolean): boolean;
    onMessage(client: any, message: any): void;
    onLeave(client: any): void;
}
