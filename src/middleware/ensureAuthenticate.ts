import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){
    //Next faz com que se for verdadeiro, ele passe os dados a quem está a frente dle.
    const authToken = request.headers.authorization;
    
    if(!authToken){
        return response.status(401).json({
            errorCode: "token invalid"
        });
    }
    
    const [, token] = authToken.split(" ");
    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload; // as IPayload ta falando que oque vier dentro do JWT_SECRET é um IPayload, que por sua vez vai ter um sub que é string;
        request.user_id = sub

        return next();
        
    } catch (error) {
        return response.status(401).json({errorCode: "Token.expired"})
    }
}