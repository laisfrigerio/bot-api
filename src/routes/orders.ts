import { Request, Response } from "express";
import express from "express";
import OrderApproved from "../actions/orders/approved";
import OrderDelete from "../actions/orders/delete";
import OrderList from "../actions/orders/list";
import OrderStore from "../actions/orders/store";
import OrderRefused from "../actions/orders/refused";
import OrderUpdate from "../actions/orders/update";
import checkJWT from "../middlewares/checkJWT";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    return (new OrderList()).do(req, res);
});

router.post('/', checkJWT, async (req: Request, res: Response) => {
    return (new OrderStore()).do(req, res);
});

router.post('/approved/:id', checkJWT, async (req: Request, res: Response) => {
    return (new OrderApproved()).do(req, res);
});

router.post('/refused/:id', checkJWT, async (req: Request, res: Response) => {
    return (new OrderRefused()).do(req, res);
});

router.put('/:id', checkJWT, async (req: Request, res: Response) => {
    return (new OrderUpdate()).do(req, res);
});

router.delete('/:id', checkJWT, async (req: Request, res: Response) => {
    return (new OrderDelete()).do(req, res);
});

export default router;