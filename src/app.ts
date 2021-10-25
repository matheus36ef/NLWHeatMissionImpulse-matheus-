import "dotenv/config";
import express from "express";

import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);


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





//Servidor ---------------------------------------------------------------
app.listen(4000, () => {console.log(`Server is run on PORT 4000--`);
});
//------------------------------------------------------------------------
