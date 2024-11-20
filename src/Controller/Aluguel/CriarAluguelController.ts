import { Request, Response } from "express";
import { CriarAluguelService } from "../../Service/Aluguel/CriarAluguelService";

class CriarAluguelController {
  async handle(req: Request, res: Response) {
    const { casaId } = req.body;
    const userId = req.user?.id; // Supondo que o ID do usuário seja extraído de um middleware de autenticação

    console.log(req.body);
    
    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    try {
      const criarAluguelService = new CriarAluguelService();
      const aluguelCriado = await criarAluguelService.execute({
        casaId,
        userId: Number(userId),
      });
      return res.json(aluguelCriado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CriarAluguelController };
