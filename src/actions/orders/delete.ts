import { Request, Response } from "express";
import { getConnection, getRepository, TransactionManager } from "typeorm";
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
                return res.status(404).json({
                    errors: ['Order not found']
                });
            }

            if (order.status !== StatusOrder.PEDDING) {
                return res.status(403).json({
                    errors: ['Order only with pedding status can be deleted']
                });
            }

            order.deletedAt = new Date();
            await getConnection().transaction(async transactionManager => {
                await transactionManager.save(order);
                await transactionManager.createQueryBuilder()
                        .update(Cashback)
                        .set({ deletedAt: new Date() })
                        .where("cashbacks.orderId = :orderId", { orderId: order.id })
                        .execute();
            });

            return res.json(order);
        } catch (ex) {
            console.log(ex);
        }

        return res.status(422).json({
            errors: ["Failed to delete an order. Contact the administrator system"],
        });
    }
}