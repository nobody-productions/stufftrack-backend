import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,

} from 'typeorm';
import { Platform } from "./platform.entity";
import { Author } from './author.entity';
import { Genre } from './genre.entity';

@Entity('bk_book')
export class Book {
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
        name: 'bk_book_platform',
        joinColumn: { name: 'book_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'platform_id', referencedColumnName: 'id'}
    })
    platforms: Platform[];

    @ManyToMany(() => Author)
    @JoinTable({
        name: 'bk_book_author',
        joinColumn: { name: 'book_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'author_id', referencedColumnName: 'id'}
    })
    authors: Author[];

    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'bk_book_genre',
        joinColumn: { name: 'book_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'genre_id', referencedColumnName: 'id'}
    })
    genres: Genre[];
}
