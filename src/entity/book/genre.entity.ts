import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'bk_genre'})
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string
}