import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../entity/user";
import Validator from "../../validators/index";

export default class Update {
    private errors: any = [];

    public async do(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await getRepository(User).findOne(id);

            if (!user) {
                return res.status(404).json({
                    errors: [
                        "User not found"
                    ],
                });
            }

            const { cpf, email, name, password } = req.body;
            const admin = req.body.isAdmin ? req.body.isAdmin : false;

            if (await this.isValidate(cpf, email, name, password)) {
                const hash = await bcrypt.hash(password, 10);
                user.cpf = cpf;
                user.email = email;
                user.name = name;
                user.password = hash;
                user.isAdmin = admin;
                const response = await getRepository(User).save(user);
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