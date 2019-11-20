import { getRepository } from "typeorm";
import User from "../entity/user";

export default class UserRepository {

    public static async findUserByCPF(data: string) {
        return await getRepository(User).findOne({cpf: data});
    }

    public static async findUserByEmail(data: string) {
        return await getRepository(User).findOne({email: data});
    }

}