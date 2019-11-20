import { getRepository } from "typeorm";
import WhiteList from "../entity/white-list";

export default class WhiteListRepository {

    public static async all() {
        return await getRepository(WhiteList).find();
    }

}