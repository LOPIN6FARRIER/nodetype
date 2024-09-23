import express from "express";
import { createServer } from "http";
import { serverSocketIo } from "./servers/serverSocketIo";
import cors from "cors";

const allowedOrigins = cors({
    origin: '*',
    methods: ['GET', 'POST'],
});

const app = express();
app.use(allowedOrigins);

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

const http = createServer(app);
const io = new serverSocketIo(http);

http.listen(3000, (err?: Error) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('listening http://localhost:3000');
    }
});
