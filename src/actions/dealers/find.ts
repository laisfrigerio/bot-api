import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Dealer from "../../entity/dealer";

export default class Find {
    public async do(req: Request, res: Response): Promise<Response> {
        
        const { id } = req.params;
        let response: Dealer = null;

        try {
            response = await getRepository(Dealer).findOne(id);
        } catch (ex) {
            console.log("[DEALER DETAIL] - ex " + ex);
        }

        return !response ? res.sendStatus(404) : res.json(response);
    }
}