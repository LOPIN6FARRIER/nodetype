"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverSocketIo = void 0;
const socket_io_1 = require("socket.io");
class serverSocketIo {
    constructor(serverHttp) {
        this.groupMessages = {};
        this.socketIo = new socket_io_1.Server(serverHttp, {
            cors: {
                origin: "http://localhost:4200",
                methods: ["GET", "POST"]
            }
        });
        this.socketIo.on('connection', (socket) => {
            console.log('a user connected');
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
            socket.on('group message', (room, msg) => {
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
exports.serverSocketIo = serverSocketIo;
