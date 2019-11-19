import { Request, Response } from "express";
import { getRepository } from "typeorm";
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


            if (order.status === StatusOrder.PROGRESS) {
                //- Add transaction to delete order and cashback
                await getRepository(Order).delete(order);
            }
        } catch (ex) {
            //
        }
    }
}