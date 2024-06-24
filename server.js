import express from "express";
import * as path from "path";
import * as http from "http";

const app = express();

const http_server = http.Server(app);
const port = 8080;

app.use(express.static(path.join(process.cwd(), "views/")));

app.get("/", (request, response) => {
    response.sendFile(".", "index.html");
});

http_server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});