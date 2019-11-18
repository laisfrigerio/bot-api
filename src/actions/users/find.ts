import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../../entity/user";

export default class Find {
    public async do(req: Request, res: Response): Promise<Response> {
        
        const { id } = req.params;
        let response: User = null;

        try {
            response = await getRepository(User).findOne(id);
        } catch (ex) {
            //
        }

        return !response ? res.status(404).json({
            errors: ['User not found']
        }) : res.json(response);
    }
}