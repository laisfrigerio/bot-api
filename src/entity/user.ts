import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Order from "./order";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255,
    })
    name: string;

    @Column({
        length: 255,
        unique: true,
    })
    email: string;

    @Column({
        length: 255,
    })
    password: string;

    @Column({
        length: 11,
        unique: true,
    })
    cpf: string;

    @Column({
        default: false
    })
    isAdmin: boolean;

    @OneToMany(type => Order, order => order.dealer)
    orders: Order[];

    constructor(cpf: string, email: string, name: string, password: string, isAdmin: boolean) {
        this.cpf = cpf;
        this.email = email;
        this.name = name;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}