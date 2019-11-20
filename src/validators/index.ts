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
}