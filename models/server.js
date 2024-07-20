import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import { socketsControllers } from "../sockets/controllers.js";

export class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        this.server = createServer( this.app );
        this.io = new SocketIOServer( this.server );

        //Paths
       
        // Middlewares
        this.middlewares();

        // Sockets configuration
        this.sockets();
    }

    // Middlewares
    middlewares() {

        //CORS
        this.app.use( cors() );
  
        //Public directory
        this.app.use( express.static('public') );

    }

    //Socket 
    sockets(){

    this.io.on('connection', socketsControllers );
    
 }
    //Server listening to requests
    listen(){

        this.server.listen(this.port, () => {
            console.log(`Server running on port: ${ this.port }`);
        });
    
    }

}
