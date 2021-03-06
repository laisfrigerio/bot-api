import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import auth from "./routes/auth";
import dashboard from "./routes/dashboard";
import orders from "./routes/orders";
import users from "./routes/users";
import notFound from "./routes/not-found";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(auth);
app.use("/dashboard", dashboard);
app.use("/orders", orders);
app.use("/users", users);
app.use(notFound);

export default app;