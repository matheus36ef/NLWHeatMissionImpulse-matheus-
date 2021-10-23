import "dotenv/config";
import express from "express";

const app = express();

app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GUITHUB_CLIENT_ID}`);
});

app.get("/signin/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code)
})



//Servidor
app.listen(4000, () => {console.log(`Server is run on PORT 4000--`);
});

