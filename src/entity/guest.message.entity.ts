import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class GuestMessage {
    @PrimaryGeneratedColumn()
    id: number

    
    // created_at column
    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date

    @Column()
    name: string
    
    @Column()
    surname: string
    
    @Column()
    email: string
    
    @Column()
    message: string
}
