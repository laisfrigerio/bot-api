import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class WhiteList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    cpf: string;
}