import { Request, Response } from "express";

export default class Update {
    private errors: any = [];

    public async do(req: Request, res: Response) {
        try {
            //- Somente pedidos com status "Em avaliação" podem ser alterados
        } catch (ex) {
            //
        }
    }
}