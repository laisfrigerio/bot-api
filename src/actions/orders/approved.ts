import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { StatusOrder } from "../../enum/status-order";
import Order from "../../entity/order";

/**
 * Refused an order
 * Soft delete credits/debits
 */
export default class Approved {
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

            this.order.status = StatusOrder.APPROVED;
            this.order = await getRepository(Order).save(this.order);
            return res.json(this.order);
        } catch (ex) {
            console.log(ex);
        }

        return res.status(422).json({
            errors: ["Failed to approved an order. Contact the administrator system"],
        });
    }

    private async isValid(id: any) {
        this.order = await getRepository(Order).findOne(id);

        if (!this.order) {
            this.errors.push("Order not found");
            return this.errors.length === 0;
        }

        if (this.order.status === StatusOrder.REFUSED) {
            this.errors.push("Order is already refused");
        } else if (this.order.status === StatusOrder.APPROVED) {
            this.errors.push("Order is already approved");
        }

        return this.errors.length === 0;
    }
}