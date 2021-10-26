
import axios from "axios";
import prismaClient from "../prisma/index"
/** Fluxo:
 * Receber o codigo(string) x
 * Recuperar o access_token no github x
 * Recuperar infos do user no github x
 * Verificar se o usuario existe no BD
 *  - Se existir -> gerar um token 
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

        const { login, id, avatar_url, name } = response.data;

        const user = await prismaClient.user.findFirst ({ //findFirst ->  fazer uma seleção, onde o github tem o usuario id
            where: {
                github_id: id
            }
        })

        if(!user /*Se usuario não existir */){
            await prismaClient.user.create({
                data: { //aq passamos todas as informações que quero que ele salve.
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        return response.data;
    }
}

export { AuthenticateUserService }