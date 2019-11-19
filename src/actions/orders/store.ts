
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Order from "../../entity/order";
import { StatusOrder } from "../../enum/status-order";

export default class Store {
    private errors: any = [];

    public async do(req: Request, res: Response): Promise<Response> {
        try {
            const { value } = req.body;
            const dealer = req.body.user;
            const code = "ORD" + new Date().getTime();
            const createdAt = new Date();
            const status = req.body.status ? req.body.status : StatusOrder.PROGRESS;
            const order = await getRepository(Order).save(new Order(createdAt, code, dealer, status, value));
            return res.json(order);
            //- Salvar pedido com status "Em avaliação", exceto quando CPF for 153.509.460-56 status Aprovado
            //- Calcular o cashback
        } catch (ex) {
            console.log("ex");
            console.log(ex);
        }

        return res.status(422).json({
            errors: ["Failed store a new order"],
        });
    }

    private calcCashback(value: number): Number {
        return 0;
    }
}