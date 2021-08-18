class Sockets {
    constructor( io ){
        this.io = io;

        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', ( socket ) => {

            socket.emit('welcome-client','Bienvenio User!');
        
            socket.on('message-client', ( data ) => {
                console.log(data);
                
                this.io.emit('message-server', data );
            });

        });
    }
}

module.exports = Sockets;