import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../user.entity";
import {Videogame} from "./videogame.entity";

@Entity({name: 'vg_rating'})
export class Rating {
    @PrimaryGeneratedColumn()
    @Column({unique: true, primary: true})
    id: number;

    @Column({nullable: true,
        length: 5000})
    comment: string;

    @Column({nullable: true, default: 0})
    ranking: number;

    @Column({default: true})
    is_public_comment: boolean

    @Column({default: true})
    is_public_ranking: boolean

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date
}