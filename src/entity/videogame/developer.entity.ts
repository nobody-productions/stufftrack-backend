import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "vg_developer"})
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 32
    })
    name: string;
}