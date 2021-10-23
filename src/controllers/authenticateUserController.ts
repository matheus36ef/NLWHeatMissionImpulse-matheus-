import {Request, Response} from "express";
import { AuthenticateUserService } from "../services/authenticateUserService";


class authenticateUserController {
    async handle(request: Request, response: Response){

        const service = new AuthenticateUserService();
        service.execute("684354")

    }
}


export { authenticateUserController }