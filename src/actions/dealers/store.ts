import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import Dealer from "../../entity/dealer";
import Validator from "../../validators/index";

export default class Store {
    private errors: any = [];

    public async do(req: Request, res: Response) {
        try {
            const { cpf, email, name, password } = req.body;

            if (await this.isValidate(cpf, email, name, password)) {
                const hash = await bcrypt.hash(password, 10);
                const dealer = new Dealer(cpf, email, name, hash);
                const response = await getRepository(Dealer).save(dealer);
                return res.json(response);
            }

            return res.status(422).json({
                errors: this.errors
            });
        } catch (ex) {
            res.status(500);
            res.json({error: ex});
            return res;
        }
    }

    private async isValidate(cpf: string, email: string, name: string, password: string): Promise<boolean> {
        if (await Validator.isRequired(name)) {
            this.errors.push("Name is required");
        }

        if (await Validator.isRequired(password)) {
            this.errors.push("Password is required");
        }

        if (await Validator.isRequired(email)) {
            this.errors.push("E-mail is required");
        }

        if (await Validator.isRequired(cpf)) {
            this.errors.push("CPF is required");
        }

        if (await Validator.findCPF(cpf)) {
            this.errors.push("CPF is already registered");
        }

        if (await Validator.findEmail(email)) {
            this.errors.push("E-mail is already registered");
        }

        return this.errors.length === 0;
    }
}