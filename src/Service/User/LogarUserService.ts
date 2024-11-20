import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Carrega o arquivo .env

const prisma = new PrismaClient();

interface UserProps {
    email: string;
    senha: string;
}

class LogarUserService {
    async execute({ email, senha }: UserProps) {
        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Teste se a variável está carregada

        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            throw new Error("Email ou senha inválidos");
        }

        const passwordMatch = await compare(senha, user.senha);

        if (!passwordMatch) {
            throw new Error("Email ou senha inválidos");
        }

        const JWT_SECRET = process.env.JWT_SECRET as string;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET não configurado nas variáveis de ambiente.");
        }
        console.log(user.tipo);
        
        const token = sign(
            {   
                id: user.id,
                email: user.email,
                tipo: user.tipo
                 // Payload
            },
            JWT_SECRET, // Chave secreta
            {
                subject: String(user.id),
                 // ID como subject
                expiresIn: "10d", // Expiração em 10 dias
            }
        );

        return {token,
            user:{
                id: user.id,
                email: user.email,
                tipo: user.tipo
            }
        };
    }
}

export { LogarUserService };
