import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../../entity/user";

export default class List {
    public async do(req: Request, res: Response): Promise<Response> {
        
        let response: User[] = [];

        try {
            response = await getRepository(User).find();
        } catch (ex) {
            console.log("[USER LIST] - ex " + ex);
        }

        return res.json(response);
    }
}