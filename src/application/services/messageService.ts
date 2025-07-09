// src/application/services/messageService.ts

import { IConversationRepository } from '../../domain/repositories/conversationRepository';
import { Conversation } from '../../domain/entities/conversation';
import { Message } from '../../domain/valueObjects/message';
import { IWhatsAppClient } from '../../adapters/whatsapp/whatsappClient';

export class MessageService {
    constructor(
        private repo: IConversationRepository,
        private client: IWhatsAppClient
    ) { }

    async processIncomingMessage(userId: string, phoneNumber: string, text: string) {
        let conv = await this.repo.getByUserId(userId);
        const message = new Message('user', text);

        if (!conv) {
            conv = new Conversation();
            conv.userId = userId;
            conv.phoneNumber = phoneNumber;
            conv.messages = [message];
        } else {
            conv.messages.push(message);
        }

        await this.repo.save(conv);

        const reply = `Gracias por tu mensaje: "${text}"`;
        await this.client.sendMessage(phoneNumber, reply);
    }
}
