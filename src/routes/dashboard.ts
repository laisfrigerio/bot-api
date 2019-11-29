import { Request, Response } from "express";
import express from "express";
import Dashboard from "../actions/dashboard/index";
import checkJWT from "../middlewares/checkJWT";

const router = express.Router();

router.get("/", checkJWT, async (req: Request, res: Response) => {
    return (new Dashboard()).do(req, res);
});

export default router;