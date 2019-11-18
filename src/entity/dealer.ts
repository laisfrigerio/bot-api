import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Dealer {
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

    // TODO make cpf hashed
    @Column({
        length: 11,
        unique: true,
    })
    cpf: string;

    constructor(cpf: string, email: string, name: string, password: string) {
        this.cpf = cpf;
        this.email = email;
        this.name = name;
        this.password = password;
    }
}