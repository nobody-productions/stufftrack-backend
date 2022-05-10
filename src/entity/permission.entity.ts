import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {JoinTable} from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}