// src/domain/repositories/conversationRepository.ts

import { Conversation } from '../entities/conversation';

export interface IConversationRepository {
    save(conversation: Conversation): Promise<void>;
    getByUserId(userId: string): Promise<Conversation | null>;
}
