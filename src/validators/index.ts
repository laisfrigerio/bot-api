import User from "../entity/user";
import OrderRepository from "../repositories/order-repository";
import UserRepository from "../repositories/user-repository";

export default class Validator {
    public static isRequired(data: any) {
        return data === null || data === undefined || data === "";
    }

    public static async findCPF(data: string) {
        return await UserRepository.findUserByCPF(data);
    }

    public static async findEmail(data: string) {
        return await UserRepository.findUserByEmail(data);
    }

    public static async peddingOrder(user: User) {
        return await OrderRepository.peddingOrder(user);
    }
}