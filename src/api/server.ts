import express from "express";
import routes from "../routes";
import { createServer } from "http";

const app = express();

app.use(express.json());
app.use(routes);

const server = createServer(app);

export default server;
