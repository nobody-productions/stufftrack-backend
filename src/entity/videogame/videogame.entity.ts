import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,

} from 'typeorm';
import { Platform } from "./platform.entity";
import { Developer } from "./developer.entity";
import { Genre } from './genre.entity';

@Entity('vg_videogame')
export class Videogame {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column({type: "text"})
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
