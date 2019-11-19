import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt  from "jsonwebtoken";
import User from "../entity/user";

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        const user = (decoded as User);

        const findUser = await getRepository(User).findOne(user.id);
        if (findUser) {
            req.body.user = user;
            return next();
        }

        return res.status(404).send({
            auth: false,
            message: "User not found"
        });
    });
}