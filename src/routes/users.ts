import { Request, Response } from "express";
import express from "express";
import UserFind from "../actions/users/find";
import UserList from "../actions/users/list";
import UserStore from "../actions/users/store";
import UserUpdate from "../actions/users/update";
import checkJWT from "../middlewares/checkJWT";

const router = express.Router();

router.get("/", checkJWT, async (req: Request, res: Response) => {
    return await (new UserList).do(req, res);
});

router.get("/:id", checkJWT, async (req: Request, res: Response) => {
    return await (new UserFind).do(req, res);
});

router.post("/", async (req: Request, res: Response) => {
    return await (new UserStore).do(req, res);
});

router.put("/:id", checkJWT, async (req: Request, res: Response) => {
    return await (new UserUpdate).do(req, res);
});

export default router;