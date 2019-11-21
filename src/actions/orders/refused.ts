import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { StatusOrder } from "../../enum/status-order";
import Cashback from "../../entity/cashback";
import Order from "../../entity/order";

/**
 * Refused an order
 * Soft delete credits/debits
 */
export default class Refused {
    private errors: any = [];
    private order: Order;

    public async do(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const isValid = await this.isValid(id);

            if (!isValid) {
                return res.status(422).json({
                    errors: this.errors
                });
            }

            this.order.status = StatusOrder.REFUSED;

            await getConnection().transaction(async transactionManager => {
                await transactionManager.save(this.order);
                await transactionManager.createQueryBuilder()
                    .update(Cashback)
                    .set({ deletedAt: new Date() })
                    .where("cashbacks.orderId = :orderId", { orderId: this.order.id })
                    .execute();
            });

            return res.json(this.order);
        } catch (ex) {
            console.log(ex);
        }

        return res.status(422).json({
            errors: ["Failed to refused an order. Contact the administrator system"],
        });
    }

    private async isValid(id: any) {
        this.order = await getRepository(Order).findOne(id);

        if (!this.order) {
            this.errors.push("Order not found");
            return this.errors.length === 0;
        }

        if (this.order.status === StatusOrder.APPROVED) {
            this.errors.push("Order only under evaluation can be refused");
        } else if (this.order.status === StatusOrder.REFUSED) {
            this.errors.push("Order is already refused");
        }

        return this.errors.length === 0;
    }
}