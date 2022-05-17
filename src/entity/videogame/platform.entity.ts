import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'vg_platform'})
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 128
    })
    name: string;

    @Column({
        unique: true,
        length: 5
    })
    codename: string;
}