import User from "./user";

enum StatusOrder {
    PROGRESS = 1,
    APPROVED = 2,
    REFUSED = 3,
}

export default class Order {
    id: number;
    code: string;
    dealer: User;
    value: number;
    status: StatusOrder;
    createdAt: Date;
}