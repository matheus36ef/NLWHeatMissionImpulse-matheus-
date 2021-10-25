
/** Fluxo:
 * Receber o codigo(string)
 * Recuperar o access_token no github
 * Verificar se o usuario existe no BD
 *  - Se existir gerar um token 
 *  - Se não existir criar no BD, gerar um token
 * Retornar o token com as info do usuario logado
 */


class AuthenticateUserService {
    async execute(code: string){ // Recebendo o codigo(string).
        //Recuperando o access_token. Para isso fazer um acesso ao github (intalar dependencia axios, + as tipagens do axios (@types/axios))


    }
}

export { AuthenticateUserService }