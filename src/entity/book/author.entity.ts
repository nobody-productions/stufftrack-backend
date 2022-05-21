import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "bk_author"})
export class Author {
    @PrimaryGeneratedColumn()
    @Column({unique: true})
    @PrimaryColumn()
    id: number;

    @Column({})
    name: string;

    @Column({})
    surname: string;

    @Column({unique: true, nullable: true})
    nickname: string;

    // semplificazione: normalmente si crea una tabella separata per la nazione con una lista di paesi 
    @Column({nullable: true})
    country: string;
}