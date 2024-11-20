import dotenv from "dotenv";
dotenv.config();
import express from "express";
import  routes from "./routes";
import cors from "cors";    

const app = express();

const port = process.env.PORT || 3333;

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log("Server está rodando na porta 3333");
});