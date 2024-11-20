import { Request, Response } from "express";
import { ListarAluguelService } from "../../Service/Aluguel/ListarAluguelService";

class ListarAluguelController{
    async handle(req: Request, res: Response){

        const listarAluguelService = new ListarAluguelService();

        const userId = req.user?.id
       

        const alugueis = await listarAluguelService.execute({
            userId: Number(userId),
           

        });

        return res.json(alugueis);

    }
}

export {ListarAluguelController};