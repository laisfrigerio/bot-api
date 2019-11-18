import { Request, Response } from "express";
import express from "express";
import DealerFind from "../actions/dealers/find";
import DealerList from "../actions/dealers/list";
import DealerStore from "../actions/dealers/store";
import DealerUpdate from "../actions/dealers/update";
import checkJWT from "../middlewares/checkJWT";

const router = express.Router();

router.get("/", checkJWT, async (req: Request, res: Response) => {
    return await (new DealerList).do(req, res);
});

router.get("/:id", checkJWT, async (req: Request, res: Response) => {
    return await (new DealerFind).do(req, res);
});

router.post("/", checkJWT, async (req: Request, res: Response) => {
    return await (new DealerStore).do(req, res);
});

router.put("/:id", checkJWT, async (req: Request, res: Response) => {
    return await (new DealerUpdate).do(req, res);
});

export default router;