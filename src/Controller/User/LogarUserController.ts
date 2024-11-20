import { json, Request, Response } from "express";
import { LogarUserService } from "../../Service/User/LogarUserService";


class LogarUserController{
    async handle(req: Request, res: Response){

        const logarUserService = new LogarUserService();
        const {email, senha} = req.body;

        const user = await logarUserService.execute({email, senha});
        return res.json(user);
    }
}

export {LogarUserController}