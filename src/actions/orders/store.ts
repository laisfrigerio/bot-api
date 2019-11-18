
import { Request, Response } from "express";

export default class Store {
    private errors: any = [];

    public async do(req: Request, res: Response) {
        try {
            //- Salvar pedido com status "Em avaliação", exceto quando CPF for 153.509.460-56 status Aprovado
            //- Calcular o cashback
        } catch (ex) {
            //
        }
    }
}