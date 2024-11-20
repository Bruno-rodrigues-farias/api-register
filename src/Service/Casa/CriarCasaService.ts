import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface casaProps {
  disponivel: boolean;
  quartos: number;
  banheiro: number;
  endereco: string;
  estado: string;
  cidade: string;
  valor: string;
  userId: number;
}

class CriarCasaService {
  async execute({
    banheiro,
    cidade,
    disponivel,
    endereco,
    estado,
    quartos,
    userId,
    valor,
  }: casaProps) {
    // Verifique se o userId é um número válido
    if (isNaN(userId) || userId <= 0) {
      console.error('userId inválido:', userId); // Log para ver o valor recebido
      throw new Error("O userId fornecido não é válido.");
    }

    // Verifica se o usuário com o userId existe
    const user = await prisma.user.findUnique({
      where: {
        id: userId,  // Garantindo que userId seja um número
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Cria a casa associando ao usuário
    const casa = await prisma.casas.create({
      data: {
        banheiro,
        cidade,
        disponivel,
        endereco,
        estado,
        quartos,
        valor,
        user: {
          connect: {
            id: userId, // Conectando a casa ao usuário
          },
        },
      },
    });

    return casa;
  }
}

export { CriarCasaService };
