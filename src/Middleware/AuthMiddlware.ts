import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: "Token não encontrado. Faça login para continuar."
        });
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = { id: decoded.id }; // Passa o id do usuário para a requisição
        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Token inválido ou expirado. Faça login novamente."
        });
    }
}
