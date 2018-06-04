import * as Colyseus from "colyseus.js"

export namespace Network {

    export var host : string;
    export var client :Colyseus.Client;

    export function setup() {
        host = window.document.location.host.replace(/:.*/, '');
        client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':3333' : ''));
        console.log("connected to server");
    }
    
    /* export function connectToGame() : Colyseus.Room{
        var room = client.join("game");
        room.onJoin.add(function () {
            console.log("joinedsamxiba");
        });
        return room;
    } */
    

}