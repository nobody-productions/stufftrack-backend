import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'bk_platform'})
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        default: "images/books/platforms/default.png"
    })
    path: string;
}