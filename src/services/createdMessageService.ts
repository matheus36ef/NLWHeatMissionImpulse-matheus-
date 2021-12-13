//Criação de mensagem / Cadastro de mensagem
import prismaClient  from "../prisma"
import { io } from "../app";

class CreatedMessageService {
    async execute(text: string, user_id: string){
        const message = await prismaClient.message.create({
            data: {
                text,
                user_id
            },
            include: { //Depois que ele for no banco de dados, ele irá retornar com essas informações
                user: true,
            }
        });

        const infoWS = {
            text: message.text,
            user_id: message.user_id,
            created_at: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url,
            }
        }
        io.emit("new_message", infoWS) //Vou emitir um evento sempre que algum usuario enviar uma msg. 1º nome do evento, oque quero ter dentro desse evento
        return message;        
    };
}



export { CreatedMessageService };

