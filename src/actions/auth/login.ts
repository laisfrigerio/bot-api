import { Request, Response, response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../entity/user";
import Validator from "../../validators";

export default class Login {
    private errors: any = [];
    private statusCode: number = 200;

    public async do(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (this.isValidate(email, password)) {
                let user = await getRepository(User).findOne({email: email});

                if (!user) {
                    res.status(404);
                    return res.json({
                        errors: ['User not found'],
                    });
                }

                if (await bcrypt.compare(password, user.password)) {
                    res.status(this.statusCode);
                    if (this.errors.length === 0) {
                        const expiresIn = 1440; // expires in 24h
                        const token = await jwt.sign({email: user.email, id: user.id, password: user.password}, process.env.SECRET_KEY, {
                            expiresIn: expiresIn
                        });

                        return res.json({ expiresIn, token, user: user });
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