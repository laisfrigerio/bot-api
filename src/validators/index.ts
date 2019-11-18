import { getRepository } from "typeorm";
import User from "../entity/user";

export default class Validator {
    public static isRequired(data: any) {
        return data === null || data === undefined || data === "";
    }

    public static async findCPF(data: string) {
        let user = await getRepository(User).findOne({cpf: data});
        return user;
    }

    public static async findEmail(data: string) {
        let user = await getRepository(User).findOne({email: data});
        return user;
    }
}