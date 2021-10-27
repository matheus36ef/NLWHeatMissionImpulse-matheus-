//Criação de mensagem / Cadastro de mensagem
import prismaClient  from "../prisma"

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
        return message;        
    };
}



export { CreatedMessageService };

