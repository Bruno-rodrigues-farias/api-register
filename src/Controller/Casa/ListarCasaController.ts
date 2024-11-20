import { Request, Response } from "express";
import { ListarCasaService } from "../../Service/Casa/ListarCasaService";   

class ListarCasaController{
    async handle(req: Request, res: Response){

        const listarCasaService = new ListarCasaService();

        const casas = await listarCasaService.execute();

        return res.json(casas);
    }
}

export {ListarCasaController}