import { Request, Response } from "express";
import express from "express";
import DealerFind from "../actions/dealers/find";
import DealerList from "../actions/dealers/list";
import DealerStore from "../actions/dealers/store";
import DealerUpdate from "../actions/dealers/update";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    return await (new DealerList).do(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
    return await (new DealerFind).do(req, res);
});

router.post("/", async (req: Request, res: Response) => {
    return await (new DealerStore).do(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    return await (new DealerUpdate).do(req, res);
});

export default router;