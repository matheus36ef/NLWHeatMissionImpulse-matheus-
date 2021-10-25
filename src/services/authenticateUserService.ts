
import axios from "axios";
/** Fluxo:
 * Receber o codigo(string) x
 * Recuperar o access_token no github x
 * Recuperar infos do user no github 
 * Verificar se o usuario existe no BD
 *  - Se existir -> gerar um token 
 *  - Se não existir -> criar no BD, gerar um token
 * Retornar o token com as info do usuario logado
 */
/*------------------------------------------------------------------------------------------------------------*/


interface IaccessTokenResponse { //para conseguir pegar somente oque precisa com o response
    access_token: string;
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
        const response = await axios.get("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        });

        return response.data;
    }
}

export { AuthenticateUserService }