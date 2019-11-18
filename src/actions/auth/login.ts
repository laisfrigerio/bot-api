import { Request, Response, response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Dealer from "../../entity/dealer";
import Validator from "../../validators";

export default class Login {
    private errors: any = [];
    private statusCode: number = 200;

    public async do(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (this.isValidate(email, password)) {
                const hash = await bcrypt.hash(password, 10);
                console.log("[HASH] " + hash);
                let dealer = await getRepository(Dealer).findOne({email: email});

                if (!dealer) {
                    this.statusCode = 401;
                    this.errors.push('Dealer not found');
                }

                else if (await bcrypt.compare(password, dealer.password)) {
                    res.status(this.statusCode);
                    if (this.errors.length === 0) {
                        const expiresIn = 1440; // expires in 24h
                        const token = await jwt.sign({email: dealer.email, id: dealer.id, password: dealer.password}, process.env.SECRET_KEY, {
                            expiresIn: expiresIn
                        });

                        return res.json({ expiresIn, token, user: dealer });
                    }
                }

                this.statusCode = 401;
                this.errors.push('E-mail and/or password is invalid');
            }
            
            return res.json({ errors: this.errors});

        } catch (ex) {
            console.log(ex);
            res.status(500);
            return res.json({ errors: ex });
        }
    }

    private isValidate(email: String, password: String): boolean {
        if (Validator.isRequired(email)) {
            this.statusCode = 422;
            this.errors.push("E-mail is required");
        }

        if (Validator.isRequired(password)) {
            this.statusCode = 422;
            this.errors.push("Password is required");
        }

        return this.errors.length === 0;
    }
}