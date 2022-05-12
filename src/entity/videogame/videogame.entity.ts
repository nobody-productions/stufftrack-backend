import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Platform } from "./platform.entity";
import { Developer } from "./developer.entity";
import { User } from '../user.entity';
import { Genre } from './genre.entity';

export enum Status {
    DA_GIOCARE = "Da giocare",
    IN_CORSO = "In corso",
    FINITO = "Finito",
    COMPLETATO = "Completato",
    ABBANDONATO = "Abbandonato"
}

@Entity('vg_videogame')
export class Videogame {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    year: number

    @Column({default: "/images/videogames/cover/default_videogame.png"})
    image: string

    @ManyToMany(() => Platform)
    @JoinTable({
        name: 'vg_videogame_platform',
        joinColumn: { name: 'videogame_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'platform_id', referencedColumnName: 'id'}
    })
    platforms: Platform[];

    @ManyToMany(() => Developer)
    @JoinTable({
        name: 'vg_videogame_developer',
        joinColumn: { name: 'videogame_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'developer_id', referencedColumnName: 'id'}
    })
    developers: Developer[];

    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'vg_videogame_genre',
        joinColumn: { name: 'videogame_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'genre_id', referencedColumnName: 'id'}
    })
    genres: Genre[];

    @ManyToMany(() => Videogame)
    @JoinTable({
        name: 'vg_remake',
        joinColumn: { name: 'original', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'remake', referencedColumnName: 'id'}
    })
    videogames: Videogame[];
}


@Entity('vg_user_videogame')
export class UserVideogame {
    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date

    @UpdateDateColumn({type: 'timestamptz'})
    updated_at: Date

    @CreateDateColumn({nullable: true, type: 'timestamptz'})
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
}