import express from "express";
import { Server } from "socket.io";
import { dirname, join } from "path";
import { createServer } from "http";
import { fileURLToPath } from "url";

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "/views")));


app.get("/", (request, response) => {
    response.sendFile("index.html");
});


io.on('connection', (socket) => {
  console.log('user connetected!');
  socket.on('chat message', (msg) => {
    console.log(`chat: ${msg}`);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
      console.log("A user disconnected from the server!");
  });
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});