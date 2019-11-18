import { getRepository } from "typeorm";
import Dealer from "../entity/dealer";

export default class Validator {
    public static isRequired(data: any) {
        return data === null || data === undefined || data === "";
    }

    public static async findCPF(data: String) {
        let dealer = await getRepository(Dealer).findOne({cpf: data});
        return dealer;
    }

    public static async findEmail(data: String) {
        let dealer = await getRepository(Dealer).findOne({email: data});
        return dealer;
    }
}