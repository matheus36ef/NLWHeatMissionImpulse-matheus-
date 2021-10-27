import prismaclient from "../prisma";

class GetLast3MessagesService {
    async execute(){
        const messages = await prismaclient.message.findMany({ //Irá traser do DB 3 mensagens, sendo q terá que ser ordenado do mais novo para o mais velho. com limite de 3.
            take: 3,
            orderBy: {
                created_at: "desc",
            }, include: {
                user: true,
            }

            //o mesmo que: SELECT * FROM MESSAGES LIMIT 3 ORDER BY CREATED_AT DESC
        });
        return messages;
    }
}

export { GetLast3MessagesService }