import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from '../valueObjects/message';

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId!: string;

    @Column()
    phoneNumber!: string;

    @OneToMany(() => Message, (message) => message.conversation, { cascade: true })
    messages!: Message[];
}
