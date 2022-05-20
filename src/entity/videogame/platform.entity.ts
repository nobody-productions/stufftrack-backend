import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'vg_platform'})
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

    @Column({
        default: "images/platforms/default.png"
    })
    path: string;
}