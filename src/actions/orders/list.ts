import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Order from "../../entity/order";

export default class List {
    public async do(req: Request, res: Response) {
        try {
            const response = await getRepository(Order).find({
                order: {
                    id: "DESC",
                },
                where: {
                    deletedAt: null,
                }
            });
            return res.json(response);
            //- List codigo, valor, data, % de cachback aplicado para esta compra, valor de cashback para a próxima compra e status
        } catch (ex) {
            //
        }

        return res.json([]);
    }
}