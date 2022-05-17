import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'vg_genre'})
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        length: 32
    })
    name: string
}