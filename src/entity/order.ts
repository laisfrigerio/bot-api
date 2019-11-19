import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm";
import User from "./user";
import Cashback from "./cashback";
import { StatusOrder } from "../enum/status-order";

@Entity()
export default class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 64
    })
    code: string;

    @Column()
    value: number;

    @Column({
        type: Number
    })
    status: StatusOrder;

    @Column()
    createdAt: Date;

    @ManyToMany(type => User, user => user.orders)
    dealer: User;

    @OneToMany(type => Cashback, cashback => cashback.order)
    cashbacks: Cashback[];
}