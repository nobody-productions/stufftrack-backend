import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        unique: true
    })
    codename: string;
}