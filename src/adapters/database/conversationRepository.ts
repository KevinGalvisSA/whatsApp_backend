import { AppDataSource } from './typeORMClient';
import { IConversationRepository } from '../../domain/repositories/conversationRepository';
import { Conversation } from '../../domain/entities/conversation';

export class TypeORMConversationRepository implements IConversationRepository {
    private repo = AppDataSource.getRepository(Conversation);

    async save(conversation: Conversation): Promise<void> {
        await this.repo.save(conversation);
    }

    async getByUserId(userId: string): Promise<Conversation | null> {
        return await this.repo.findOne({
            where: { userId },
            relations: ['messages']
        });
    }
}
