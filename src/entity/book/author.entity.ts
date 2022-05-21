import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "bk_author"})
export class Author {
    @PrimaryGeneratedColumn()
    @Column({unique: true})
    id: number;

    @Column({})
    @PrimaryColumn()
    name: string;

    @Column({})
    @PrimaryColumn()
    surname: string;

    @Column({unique: true})
    @PrimaryColumn()
    nickname: string;

    // semplificazione: normalmente si crea una tabella separata per la nazione con una lista di paesi 
    @Column({unique: true})
    @PrimaryColumn()
    country: string;
}