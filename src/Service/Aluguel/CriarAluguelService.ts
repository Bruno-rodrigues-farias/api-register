import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface aluguelProps {
  casaId: number;
  userId: number;
}

class CriarAluguelService {
  async execute({ casaId, userId }: aluguelProps) {
    // Verifica se existe um aluguel ativo para a casa
    const casaJaAlugada = await prisma.aluguel.findFirst({
      where: {
        casaId,
      },
    });

    // Verifica se a casa está alugada (não há aluguel ativo)
    if (casaJaAlugada) {
      throw new Error("Casa já alugada");
    }

    // Busca a casa para verificar se está disponível
    const casa = await prisma.casas.findUnique({
      where: {
        id: casaId,
      },
    });

    // Verifica se a casa foi encontrada e está disponível
    if (!casa || !casa.disponivel) {
      throw new Error("Casa já alugada ou indisponível");
    }

    // Criação do aluguel
    const aluguel = await prisma.aluguel.create({
      data: {
        casaId,
        userId,
      },
    });

    // Atualiza a casa para não disponível
    const aluguelCriado = await prisma.aluguel.update({
      where: {
        id: aluguel.id,
      },
      data: {
        casas: {
          update: {
            disponivel: false,
          },
        },
      },
      include: {
        casas: true,
        user: {
          select: {
            nome: true,
            email: true,
            tipo: true,
          },
        },
      },
    });

    return aluguelCriado;
  }
}

export { CriarAluguelService };
