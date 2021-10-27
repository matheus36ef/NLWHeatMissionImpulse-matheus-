import { Request, Response } from "express";
import { CreatedMessageService } from "../services/createdMessageService"
 

class createdMessageController {
    async handle(request: Request, response: Response){
        const { message } = request.body; //recebendo a mensagem via body
        
        const { user_id } = request;

        const service = new CreatedMessageService();

        const result = await service.execute(message, user_id);

        return response.json(result);
    }
}

export { createdMessageController };