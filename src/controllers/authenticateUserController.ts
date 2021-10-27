import {Request, Response} from "express";
import { AuthenticateUserService } from "../services/authenticateUserService";


class authenticateUserController {
    async handle(request: Request, response: Response){

        const { code } = request.body;

        const service = new AuthenticateUserService();

        try {
            const result = await service.execute(code) //pausa aq -> chamando a o authenticate
            return response.json(result);
        } catch (err) {
            return response.json({error: err.message});
        }
    }
}


export { authenticateUserController }