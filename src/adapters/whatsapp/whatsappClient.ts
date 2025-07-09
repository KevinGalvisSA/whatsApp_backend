import axios from 'axios';

export interface IWhatsAppClient {
    sendMessage(phoneNumber: string, message: string): Promise<void>;
}

export class WhatsAppClient implements IWhatsAppClient {
    async sendMessage(phoneNumber: string, message: string): Promise<void> {
        await axios.post(
            process.env.WHATSAPP_API_URL || '',
            {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                text: { body: message }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}
