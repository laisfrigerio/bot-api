
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
            console.log("StatusOrder.PROGRESS");
            console.log(StatusOrder.PROGRESS);
            const status = req.body.status ? req.body.status : StatusOrder.PROGRESS;
            const order = new Order(createdAt, code, dealer, status, value);
            console.log("order");
            console.log(order);
            await getRepository(Order).save(order);
            //- Salvar pedido com status "Em avaliação", exceto quando CPF for 153.509.460-56 status Aprovado
            //- Calcular o cashback
        } catch (ex) {
            console.log("ex");
            console.log(ex);
        }

        return res.json({
            message: "Ok"
        });
    }
}