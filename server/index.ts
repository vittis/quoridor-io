import * as path from 'path';
import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import { GameRoom } from './rooms/game/gameRoom';


const port = Number(process.env.PORT || 3333);
const app = express();

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
    server: createServer(app),
    verifyClient: function (info, next) {
        next(true);
    }
});



//Rooms register

gameServer.register('game', GameRoom);


 

app.use('/',express.static(path.join(__dirname, "/../../client/public/")));

app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname+'/../../client/public/index.html'));
});

// (optional) attach web monitoring panel
app.use('/colyseus', monitor(gameServer));

gameServer.listen(port);
console.log(`Listening on http://localhost:${ port }`);