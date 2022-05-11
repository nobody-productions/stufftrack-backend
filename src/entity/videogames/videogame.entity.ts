import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Platform} from "./platform.entity";
import {Developer} from "./developer.entity";
import { User } from '../user.entity';
import { Genre } from './genre.entity';

@Entity()
export class Videogame {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    year: number

    // user library
    @ManyToMany(() => User)
    @JoinTable({
        name: 'user_videogame',
        joinColumn: { name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'videogame_id', referencedColumnName: 'id'}
    })
    users: User[];

    @ManyToMany(() => Platform)
    @JoinTable({
        name: 'videogame_platform',
        joinColumn: { name: 'videogame_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'platform_id', referencedColumnName: 'id'}
    })
    platforms: Platform[];

    @ManyToMany(() => Developer)
    @JoinTable({
        name: 'videogame_developer',
        joinColumn: { name: 'videogame_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'developer_id', referencedColumnName: 'id'}
    })
    developers: Developer[];

    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'videogame_genre',
        joinColumn: { name: 'videogame_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'genre_id', referencedColumnName: 'id'}
    })
    genres: Genre[];

    @ManyToMany(() => Videogame)
    @JoinTable({
        name: 'remake',
        joinColumn: { name: 'original', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'remake', referencedColumnName: 'id'}
    })
    videogames: Videogame[];




}