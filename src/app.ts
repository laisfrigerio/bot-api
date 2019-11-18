import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import auth from "./routes/auth";
import dealers from "./routes/dealers";
import notFound from "./routes/not-found";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(auth);
app.use("/dealers", dealers);
app.use(notFound);

export default app;