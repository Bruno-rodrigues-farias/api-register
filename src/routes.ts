import { Router } from "express";

// Import middlewares
import {authMiddleware} from './Middleware/AuthMiddlware'
import {AdmMiddlware} from './Middleware/AdmMiddlware'

// import usuarios
import { CriarUserController } from "./Controller/User/CriarUserController";
import { LogarUserController } from "./Controller/User/LogarUserController";

// Import Casa
import { CriarCasaController } from "./Controller/Casa/CriarCasaController";
import { ListarCasaController } from "./Controller/Casa/ListarCasaController";

// import Aluguel
import { CriarAluguelController } from "./Controller/Aluguel/CriarAluguelController";
import { ListarAluguelController } from "./Controller/Aluguel/ListarAluguelController";

const router = Router();
// Rotas usuarios
router.post('/registro', new CriarUserController().handle)
router.post('/login',new LogarUserController().handle)

// Rotas Casa
router.post('/criar/casa',AdmMiddlware, new CriarCasaController().handle)
router.get('/listar/casas',authMiddleware, new ListarCasaController().handle)

// Rotas Aluguel
router.post('/criar/aluguel',authMiddleware, new CriarAluguelController().handle)
router.get('/listar/alugueis',authMiddleware, new ListarAluguelController().handle)
export default router;