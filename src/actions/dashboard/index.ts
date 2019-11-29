import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Order from "../../entity/order";
import { StatusOrder } from "../../enum/status-order";

export default class Dashboard {
    public async do(req: Request, res: Response) {
        try {
            const { user } = req.body.user;
            const where: any = {
                deletedAt: null,
                status: StatusOrder.PEDDING
            };

            if (!user.isAdmin) {
                where.dealerId = user.id
            }
            const response = await getRepository(Order).find({
                order: {
                    id: "DESC",
                },
                where: where
            });
            return res.json(response);
            //- List codigo, valor, data, % de cachback aplicado para esta compra, valor de cashback para a próxima compra e status
        } catch (ex) {
            //
        }

        return res.json([]);
    }
}