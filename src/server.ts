import dotenv from "dotenv";
import express from "express";
import routes from "./routes"; // Certifique-se de que o caminho está correto
import cors from "cors";    

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);  // Usando as rotas importadas

app.listen(port, () => {
    console.log(`Server está rodando na porta ${port}`);
});
