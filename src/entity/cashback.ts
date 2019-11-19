import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./order";
import { TypeCashback } from "../enum/type-cashback";

@Entity({
    name: "cashbacks"
})
export default class Cashback {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: TypeCashback,
        default: TypeCashback.CREDIT
    })
    type: string;

    @Column()
    value: number;

    @JoinColumn()
    @ManyToOne(type => Order, order => order.cashbacks, { nullable: false })
    order: Order;

    constructor(order: Order, type: string, value: number) {
        this.order = order;
        this.type = type;
        this.value = value;
    }
}