const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        //http Server
        this.server = http.createServer( this.app );

        //Configuracion de Sockets
        this.io = socketio(this.server, { /* configuraciones */ } );
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ));
        this.app.use( cors() );
    }

    configSockets(){
        new Sockets( this.io );
    }

    execute() {

        // Inicilizar Middlewares
        this.middlewares();

        // Incializar Sockets
        this.configSockets();

        // Inicializar servidor
        this.server.listen(this.port, () => {
            console.log('Server corriendo: ' + this.port);
        });
    }
}


module.exports = Server;