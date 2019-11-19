
import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import Cashback from "../../entity/cashback";
import Order from "../../entity/order";
import { StatusOrder } from "../../enum/status-order";
import { TypeCashback } from "../../enum/type-cashback";

export default class Store {
    private errors: any = [];

    public async do(req: Request, res: Response): Promise<Response> {
        try {
            const { value } = req.body;
            const dealer = req.body.user;
            const code = `ODR${new Date().getTime()}`;
            const createdAt = new Date();
            const status = req.body.status ? req.body.status : StatusOrder.PROGRESS;
            const addCashback = this.calcCashback(value);
            const order = await getConnection().transaction(async transactionManager => {
                const order = await transactionManager.save(new Order(createdAt, code, dealer, status, value));
                await transactionManager.save(new Cashback(order, TypeCashback.CREDIT, addCashback));
                return order;
            });
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

    private calcCashback(value: number): number {
        if (value <= 1000) {
            return (value*10)/100;
        }

        if (value <= 1500) {
            return (value*15)/100;
        }

        return (value*20)/100;
    }
}