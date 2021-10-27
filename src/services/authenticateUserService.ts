
import axios from "axios";
import prismaClient from "../prisma/index"
import { sign } from "jsonwebtoken"; // para criar o token
/** Fluxo:
 * Receber o codigo(string) x
 * Recuperar o access_token no github x
 * Recuperar infos do user no github x
 * Verificar se o usuario existe no BD x
 *  - Se existir -> gerar um token x
 *  - Se não existir -> criar no BD, gerar um token 
 * Retornar o token com as info do usuario logado
 */
/*------------------------------------------------------------------------------------------------------------*/


interface IaccessTokenResponse { //para conseguir pegar somente oque precisa com o response
    access_token: string;
}

interface IUserResponse { //Fazendo um filtro das informações recolhidas pela busca de dados do user.
    avatar_url: string,
    login: string,
    id: number,
    name: string,
}

class AuthenticateUserService {
    async execute(code: string){ // Recebendo o codigo(string).
       
        //Recuperando o access_token. Para isso fazer um acesso ao github (intalar dependencia axios, + as tipagens do axios (@types/axios))
        const url = "http://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IaccessTokenResponse>(url, null, { //<IaccessTokenResponse>
            params: {
                client_id: process.env.GUITHUB_CLIENT_ID,
                client_secret: process.env.GUITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json",
            }
        });

        //fazer uma busca para pegar os info do username
        const response = await axios.get<IUserResponse>("https://api.github.com/user", { // Oque está entre < > dps do get, é um metodo de filtro. Chamando apenas oque está configurado.
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        });

        // Desestruturando o response.data -> colocando em constantes.
        const { login, id, avatar_url, name } = response.data;
        //verificando se tem essa id no BD
        let user = await prismaClient.user.findFirst ({ //findFirst ->  fazer uma seleção, onde o github tem o usuario id
            where: {
                github_id: id
            }
        })
        //se n (!user) tiver esse user, criar um.
        if(!user /*Se usuario não existir */){
           user = await prismaClient.user.create({
                data: { //aq passamos todas as informações que quero que ele salve.
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        //criando token
        const token = sign({
        /*
         * primeiro parametro que ele via esperar receber é um penLoad ->Que é tudo que eu quero que meu usuario que esta fazendo a requisição tenha acesso. Geralmente passa as info do usuario
        */
            user: {
                name: user.name,
                avatar_ur: user.avatar_url,
                id: user.id
            }},
            process.env.JWT_SECRET,
            { //como terceito parametro geralmente coloca o id do user
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return {token, user};
    }
}

export { AuthenticateUserService }