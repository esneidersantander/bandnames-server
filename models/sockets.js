const BandList = require("./band-list");

class Sockets {
    constructor (io){
        this.io = io;
    
        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', (socket) => {

            console.log('cliente conectado');

            //emitir las bandas actuales
            socket.emit('current-bands', this.bandList.getBands() );
            
            //increment votes
            socket.on('votar-banda', (id)=>{
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands() );
            } );

            //borrar banda
            socket.on('borrar-banda', (id)=>{
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands() );
            } );
            //cambiar nombre banda
            socket.on('cambiar-nombre-banda', ({id,nombre})=>{
                this.bandList.changeName(id, nombre);
                this.io.emit('current-bands', this.bandList.getBands() );
            } );
            //nueva banda
            socket.on('nueva-banda', ({nombre})=>{
                this.bandList.addBand( nombre);
                this.io.emit('current-bands', this.bandList.getBands() );
            } );
        });
        
        
    }
}


module.exports = Sockets;