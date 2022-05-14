import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../user.entity";
import {Videogame} from "./videogame.entity";

@Entity({name: 'vg_rating'})
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    ranking: number;

    @Column()
    is_public_comment: boolean

    @Column()
    is_public_ranking: boolean

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "user_id"})
    user: User

    @OneToOne(() => Videogame)
    @JoinColumn({name: 'videogame_id'})
    videogame: Videogame
}