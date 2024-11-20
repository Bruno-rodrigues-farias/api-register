import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ListarCasaService{
    async execute(){
        const casas = await prisma.casas.findMany({
            include:{
                user: {
                    select:{
                        nome: true
                    }
                }
            }
        });
        return casas;
    }
}

export {ListarCasaService};