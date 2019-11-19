import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import Order from "./order";

@Entity()
export default class Cashback {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        //enum: ["debit", "credit"]
    })
    type: string;

    @Column()
    value: number;

    @ManyToMany(type => Order, order => order.cashbacks)
    order: Order;
}