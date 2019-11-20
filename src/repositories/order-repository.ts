import { getConnection } from "typeorm";
import Cashback from "../entity/cashback";
import User from "../entity/user";
import { TypeCashback } from "../enum/type-cashback";

export default class OrderRepository {
    public static async getCashbacks(user: User, type: TypeCashback) {
        const response = await getConnection()
            .createQueryBuilder()
            .select("SUM(cashbacks.value)", "total")
            .from(Cashback, "cashbacks")
            .innerJoin("cashbacks.order", "orders")
            .where("cashbacks.type = :type AND orders.dealerId = :dealerId", { type: type, dealerId: user.id})
            .getRawOne();
    
        return response.total;
    }
}