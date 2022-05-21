import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn} from "typeorm";
import {User} from "../user.entity";
import {Platform} from "./platform.entity";
import {Rating} from "./rating.entity";
import { Book } from "./book.entity";

export enum BookStatus {
    DA_LEGGERE = "Da leggere",
    IN_CORSO = "In corso",
    COMPLETATO = "Completato",
    ABBANDONATO = "Abbandonato"
}

@Entity('bk_book_user')
export class UserLibraryBook {
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

    @Column({default: BookStatus.DA_LEGGERE})
    status: BookStatus;

    @ManyToOne(() => User)
    @JoinColumn({name: "user"})
    @Column({primary: true})
    user: User

    @ManyToOne(() => Book)
    @JoinColumn({name: "book"})
    @Column({primary: true})
    book: Book

    @ManyToOne(() => Platform)
    @JoinColumn({name: "platform"})
    @Column({primary: true})
    platform: Platform

    @ManyToOne(() => Rating, {onDelete: "SET NULL"})
    @JoinColumn({name: "rating"})
    @Column({unique: true, nullable: true})
    rating: Rating
}
