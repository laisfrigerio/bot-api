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
            //
        }

        return !response ? res.status(404).json({
            errors: ['Dealer not found']
        }) : res.json(response);
    }
}