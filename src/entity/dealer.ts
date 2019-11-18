import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Dealer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255,
    })
    name: String;

    @Column({
        length: 255,
        unique: true,
    })
    email: String;

    @Column({
        length: 255,
    })
    password: String;

    @Column({
        length: 11,
        unique: true,
    })
    cpf: String;

    constructor(cpf: String, email: String, name: String, password: String) {
        this.cpf = cpf;
        this.email = email;
        this.name = name;
        this.password = password;
    }
}