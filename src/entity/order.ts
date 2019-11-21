import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
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
        default: StatusOrder.PEDDING
    })
    status: StatusOrder;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        default: null,
        nullable: true,
    })
    deletedAt: Date;

    @ManyToOne(type => User, user => user.orders, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true })
    @JoinColumn()
    dealer: User;

    @OneToMany(type => Cashback, cashback => cashback.order, { eager: true })
    @JoinColumn()
    cashbacks: Cashback[];

    constructor(code: string, dealer: User, status: StatusOrder, value: number) {
        this.code = code;
        this.dealer = dealer;
        this.status = status;
        this.value = value;
    }
}