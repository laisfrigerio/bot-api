import { Request, Response } from "express";
import express from "express";
import Login from "../actions/auth/login";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
    return (new Login()).do(req, res);
});

export default router;