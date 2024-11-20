import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";


export function AdmMiddlware(req: Request, res: Response, next: NextFunction) {
    const  authorization  = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({
            message: "Token não encontrado"
        })
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        req.user = {
            id: decoded.id as string,
            tipo: decoded.tipo as string
            
        }

        if(decoded.tipo !== "locador"){
            return res.status(401).json({
                message: "Não possui permissão para acessar essa rota",
                
            })
        }

        return next();
}catch(err){
    return res.status(401).json({
        message: "Token inválido"
    })
}
}