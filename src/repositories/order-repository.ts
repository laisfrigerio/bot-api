import { getConnection } from "typeorm";
import Cashback from "../entity/cashback";
import Order from "../entity/order";
import User from "../entity/user";
import { StatusOrder } from "../enum/status-order";
import { TypeCashback } from "../enum/type-cashback";

export default class OrderRepository {

    public static async peddingOrder(user: User) {
        return await getConnection()
            .createQueryBuilder()
            .select("o.*")
            .from(Order, "o")
            .where("o.status = :status", { status: StatusOrder.PEDDING})
            .andWhere("o.dealerId = :dealerId", { dealerId: user.id })
            .getRawOne();
    }

    public static async getCashbacks(user: User, type: TypeCashback) {
        const response = await getConnection()
            .createQueryBuilder()
            .select("SUM(cashbacks.value)", "total")
            .from(Cashback, "cashbacks")
            .innerJoin("cashbacks.order", "orders")
            .where("cashbacks.type = :type AND orders.dealerId = :dealerId", { type: type, dealerId: user.id })
            .andWhere("cashbacks.deletedAt IS NULL AND orders.status = :status", { status: StatusOrder.APPROVED })
            .getRawOne();

        return response.total;
    }
}