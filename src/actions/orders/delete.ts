import { Request, Response } from "express";

export default class Delete {
    private errors: any = [];

    public async do(req: Request, res: Response) {
        try {
            //- Somente pedidos com status "Em avaliação" podem ser removidos
        } catch (ex) {
            //
        }
    }
}