import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from "./role.entity";
import {JoinColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    nickname: string;
    
    @Column()
    propic: string;

    @Column()
    bio: string;

    @Column()
    active: boolean;

    // un utente puo avere piu ruoli
    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role: Role;
}