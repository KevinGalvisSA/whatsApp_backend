import { Request, Response } from 'express';
import { MessageService } from '../../application/services/messageService';
import { WhatsAppClient } from '../whatsapp/whatsappClient';
import { TypeORMConversationRepository } from '../database/conversationRepository';

const service = new MessageService(
    new TypeORMConversationRepository(),
    new WhatsAppClient()
);

export async function handleWebhook(req: Request, res: Response) {
    const entry = req.body.entry?.[0]?.changes?.[0]?.value;
    const message = entry?.messages?.[0];
    if (!message) return res.sendStatus(204);

    const from = message.from;
    const text = message.text?.body || 'Mensaje vacío';
    await service.processIncomingMessage(from, from, text);
    res.sendStatus(200);
}
