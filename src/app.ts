import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { router } from "./routes";
import cors from "cors"

const app = express();

app.use(express.json()); //Habilitando o json dentro do app.
app.use(cors());         //Habilitando o cors dentro do app.
app.use(router);         //Habilitando o router dentro do app.

const serveHttp = http.createServer(app);
const io = new Server(serveHttp, {
    cors: {
        origin: "*",     //Estou dizendo que aceito conexões de outras fontes. Front-end, mobile, etc...se concte tanto no http via express, como tambem no websocket.
    }
});

io.on("connection", socket => {//Permite que eu emita, como também possa ficar ouvindo eventos. 1º oque quero ouvir(Palavras), ele vai receber o  socket com algumas informações.

    console.log(`Usuario conectado no socket${socket.id}`);
}); 


//------------------------------------------------------------------------
//Login com autenticação pelo Github
app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GUITHUB_CLIENT_ID}`);
});
//Resposta
app.get("/signin/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code)
})
//------------------------------------------------------------------------

//------------------------------------------------------------------------
//Servidor ---------------------------------------------------------------
export {serveHttp, io};
//------------------------------------------------------------------------
