import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Dealer from "../../entity/dealer";

export default class List {
    public async do(req: Request, res: Response): Promise<Response> {
        
        let response: Dealer[] = [];

        try {
            response = await getRepository(Dealer).find();
        } catch (ex) {
            console.log("[DEALER LIST] - ex " + ex);
        }

        return res.json(response);
    }
}