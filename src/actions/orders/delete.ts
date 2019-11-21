import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import Cashback from "../../entity/cashback";
import Order from "../../entity/order";
import { StatusOrder } from "../../enum/status-order";

export default class Delete {
    private errors: any = [];

    public async do(req: Request, res: Response) {
        try {
            //- Somente pedidos com status "Em avaliação" podem ser removidos
            const { id } = req.params;
            const order = await getRepository(Order).findOne(id);

            if (!order) {
                //- return 404 not found
            }

            const cashbacks = getRepository(Cashback).find({order: order});
            console.log("cashbacks");
            console.log(cashbacks);

            if (order.status === StatusOrder.PEDDING) {
                //- Add transaction to delete order and cashback
                // await getConnection().transaction(async transactionManager => {
                //     await getRepository(Order).delete(order);
                // });
            }
        } catch (ex) {
            //
        }

        return res.json({
            message: "Ok",
        });
    }
}