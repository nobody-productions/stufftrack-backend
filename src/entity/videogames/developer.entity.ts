import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}