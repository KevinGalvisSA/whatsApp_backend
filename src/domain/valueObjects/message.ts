import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Conversation } from '../entities/conversation';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    sender!: string;

    @Column()
    text!: string;

    @Column({ type: 'timestamp' })
    timestamp!: Date;

    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    conversation!: Conversation;

    constructor(sender: string, text: string) {
        this.sender = sender;
        this.text = text;
        this.timestamp = new Date();
    }
}
