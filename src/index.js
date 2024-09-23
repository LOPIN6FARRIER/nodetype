"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const serverSocketIo_1 = require("./servers/serverSocketIo");
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = (0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST'],
});
const app = (0, express_1.default)();
app.use(allowedOrigins);
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
const http = (0, http_1.createServer)(app);
const io = new serverSocketIo_1.serverSocketIo(http);
http.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    }
    else {
        console.log('listening http://localhost:3000');
    }
});
