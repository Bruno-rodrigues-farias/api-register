import { Request, Response } from "express";
import { CriarCasaService } from "../../Service/Casa/CriarCasaService";

class CriarCasaController {
  async handle(req: Request, res: Response) {
    const casaService = new CriarCasaService();

    const { disponivel, quartos, banheiro, endereco, estado, cidade, valor } = req.body;
    const userId = req.user.id;

    // Verifique se userId é um número válido
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber) || userIdNumber <= 0) {
      return res.status(400).json({
        message: "O userId fornecido não é válido.",
      });
    }

    try {
      const casa = await casaService.execute({
        disponivel,
        quartos,
        banheiro,
        endereco,
        estado,
        cidade,
        valor,
        userId: userIdNumber,
      });

      return res.json(casa);
    } catch (error) {
      // Erro ao criar a casa
      return res.status(500).json({
        message: "Erro ao criar a casa",
        error: error.message || "Erro desconhecido",
      });
    }
  }
}

export { CriarCasaController };
