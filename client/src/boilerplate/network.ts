import * as Colyseus from "colyseus.js"



export namespace Network {

    export enum clientStatus {
        HOME,
        INGAME,
        WAITING_OPPONENT,
    }

    export var host : string;
    export var client :Colyseus.Client;

    export var status:clientStatus = clientStatus.HOME;

    export function setup() {
        host = window.document.location.host.replace(/:.*/, '');
        client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':3333' : ''));
        client.onOpen.add(function() {
            console.log("connected to server");
        });
        client.onClose.add(function() {
            console.log("connection has been closed");
        });
        
        client.onError.add(function(err) {
            console.log("something wrong happened", err);
          });        
    }
    

    
    

}