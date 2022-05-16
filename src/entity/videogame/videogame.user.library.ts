import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn} from "typeorm";
import {User} from "../user.entity";
import {Platform} from "./platform.entity";
import {Videogame} from "./videogame.entity";

export enum Status {
    DA_GIOCARE = "Da giocare",
    IN_CORSO = "In corso",
    FINITO = "Finito",
    COMPLETATO = "Completato",
    ABBANDONATO = "Abbandonato"
}

@Entity('vg_user_videogame')
export class UserVideogame {
    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date

    @UpdateDateColumn({type: 'timestamptz'})
    updated_at: Date

    @Column({type: 'timestamptz', default: null, nullable: true})
    finished: Date

    @Column({default: 0})
    hours: number;

    @Column({default: false})
    bought: boolean;

    @Column({default: Status.DA_GIOCARE})
    status: Status;

    @ManyToOne(() => User)
    @JoinColumn({name: "user"})
    @Column({primary: true})
    user: User

    @ManyToOne(() => Videogame)
    @JoinColumn({name: "videogame"})
    @Column({primary: true})
    videogame: Videogame

    @ManyToOne(() => Platform)
    @JoinColumn({name: "platform"})
    @Column({primary: true})
    platform: Platform
}
