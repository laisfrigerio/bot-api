import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import Dealer from "../../entity/dealer";
import Validator from "../../validators/index";

export default class Store {
    public async do(req: Request, res: Response) {
        try {
            const { cpf, email, name, password } = req.body;
            const response = await this.isValidate(cpf, email, name, password);

            if (response.length === 0) {
                const hash = await bcrypt.hash(password, 10);
                const dealer = new Dealer(cpf, email, name, hash);
                const response = await getRepository(Dealer).save(dealer);
                return res.json(response);
            }

            return res.status(422).json({
                errors: response
            });
        } catch (ex) {
            res.status(500);
            res.json({error: ex});
            return res;
        }
    }

    private async isValidate(cpf: String, email: String, name: String, password: String) {
        const errors = [];

        if (await Validator.isRequired(name)) {
            errors.push("O Campo nome é obriagtório");
        }

        if (await Validator.isRequired(password)) {
            errors.push("O Campo senha é obriagtório");
        }

        if (await Validator.findCPF(cpf)) {
            errors.push("CPF já cadastrado");
        }

        if (await Validator.findEmail(email)) {
            errors.push("E-mail já cadastrado");
        }

        return errors;
    }
}