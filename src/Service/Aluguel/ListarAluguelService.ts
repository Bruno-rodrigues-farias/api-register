import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface aluguelProps{
    
    userId: number;
}

class ListarAluguelService{
    async execute({ userId}: aluguelProps){

        const alugueis = await prisma.aluguel.findMany({where:{
             userId
            },
            include:{
                casas: true
            }
        
        }); 

        return alugueis;
    }
}

export {ListarAluguelService};