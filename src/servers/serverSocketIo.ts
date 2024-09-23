import { on } from "events";
import { Server } from "socket.io";

export class serverSocketIo{

    socketIo:Server
    groupMessages: { [key: string]: string[] } = {};
    constructor(serverHttp: any){
        this.socketIo = new Server(serverHttp,
            {
                cors: {
                    origin: "http://localhost:4200",
                    methods: ["GET", "POST"]
                }
            }
        );
        this.socketIo.on('connection', (socket) => {
            console.log('a user connected')

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('joinGroup', (room) => {
                console.log('join room: ' + room);
                socket.join(room);
                // Envía los mensajes almacenados al usuario que se une
                if (this.groupMessages[room]) {
                    this.groupMessages[room].forEach((msg) => {
                        socket.emit('message', msg);
                    });
                }
            });

            socket.on('group message', ( room, msg ) => {
                console.log(`message to room ${room}: ${msg}`);
                // Almacena el mensaje en el grupo correspondiente
                if (!this.groupMessages[room]) {
                    this.groupMessages[room] = [];
                }
                this.groupMessages[room].push(msg);
                this.socketIo.to(room).emit('message', msg);
            });
        });
    }
    
}