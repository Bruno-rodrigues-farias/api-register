import { PrismaClient } from "@prisma/client";
import {hash} from "bcryptjs";


const prisma = new PrismaClient();

interface userProps{
    nome: string;
    email: string;
    senha: string;
    tipo?: string;
}
class CriarUserService{
    async execute({nome, email, senha, tipo}: userProps){

        const senhaHash = await hash (senha, 8);

        const useAlready = await prisma.user.findFirst({
            where: {
                email: email
            },
            select:{
                nome: true,
                email: true,
                tipo: true
            }
        })

        if(useAlready){
            throw new Error("Email ja cadastrado");
        }
        
        const user = await prisma.user.create({
            data: {
                nome,
                email,
                senha: senhaHash
                
            }
        })

        return user;
    }
}   

export {CriarUserService};