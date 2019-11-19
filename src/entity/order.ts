import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./user";
import Cashback from "./cashback";
import { StatusOrder } from "../enum/status-order";

@Entity({
    name: "orders"
})
export default class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 64,
        unique: true,
    })
    code: string;

    @Column({
        type: "decimal",
        precision: 10, 
        scale: 2, 
        default: 0
    })
    value: number;

    @Column({
        type: "enum",
        enum: StatusOrder,
        default: StatusOrder.PROGRESS
    })
    status: StatusOrder;

    @Column()
    createdAt: Date;

    @ManyToOne(type => User, user => user.orders, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true })
    @JoinColumn()
    dealer: User;

    @OneToMany(type => Cashback, cashback => cashback.order)
    @JoinColumn()
    cashbacks: Cashback[];

    constructor(createdAt: Date, code: string, dealer: User, status: StatusOrder, value: number) {
        this.createdAt = createdAt;
        this.code = code;
        this.dealer = dealer;
        this.status = status;
        this.value = value;
    }
}