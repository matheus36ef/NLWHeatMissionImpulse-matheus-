//Prisma client
//Vai fazer toda parte de conexão com o banco de dados

import { PrismaClient } from "@prisma/client";

const prismaclient = new PrismaClient();

export default prismaclient;