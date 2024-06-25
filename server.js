import express from "express";
import { Server } from "socket.io";
import * as path from "path";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 8080;

app.use(express.static(path.join(process.cwd(), "views/")));


app.get("/", (request, response) => {
    response.sendFile(".", "index.html");
});


io.on('connection', (socket) => {
    
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log("A user disconnected from the server!");
    });
  });

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});