import { Request, Response } from "express";

import { CriarUserService } from "../../Service/User/CriarUserService";

class CriarUserController{
    async handle(req: Request, res: Response) {

        const criarUserService = new CriarUserService();

        const {nome, email, senha, tipo} = req.body;

       const user =  await criarUserService.execute({
           nome,
           email,
           senha,
           tipo
       });

       return res.json(user);
    }
    
}

export {CriarUserController};