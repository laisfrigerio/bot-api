import { getRepository } from "typeorm";
import Cashback from "../entity/cashback";
import User from "../entity/user";
import { TypeCashback } from "../enum/type-cashback";

export async function getCashbacks(user: User, type: TypeCashback) {
    const response = await getRepository(Cashback)
        .createQueryBuilder()
        .select("SUM(value)", "total")
        .from(Cashback, "cashbacks")
        .innerJoin("cashbacks.order", "order")
        .innerJoin("order.user", "users")
        .where("cashbacks.type = :type AND cashbacks.orderId = :orderId", { type: type, orderId: order.id})
        .getRawOne();

    return response.total;
}