import { Request, Response } from "express";
import express from "express";
import OrderDelete from "../actions/orders/delete";
import OrderList from "../actions/orders/list";
import OrderStore from "../actions/orders/store";
import OrderUpdate from "../actions/orders/update";
import checkJWT from "../middlewares/checkJWT";

const router = express.Router();

router.get('/', checkJWT, async (req: Request, res: Response) => {
    return (new OrderList()).do(req, res);
});

router.post('/', checkJWT, async (req: Request, res: Response) => {
    return (new OrderStore()).do(req, res);
});

router.put('/:id', checkJWT, async (req: Request, res: Response) => {
    return (new OrderUpdate()).do(req, res);
});

router.delete('/:id', checkJWT, async (req: Request, res: Response) => {
    return (new OrderDelete()).do(req, res);
});

export default router;