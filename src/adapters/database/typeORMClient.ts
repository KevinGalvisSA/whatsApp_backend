// src/adapters/database/typeORMClient.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Conversation } from '../../domain/entities/conversation';
import { Message } from '../../domain/valueObjects/message';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Conversation, Message],
    synchronize: true
});

export async function initializeDatabase() {
    await AppDataSource.initialize();
    console.log('📦 Base de datos conectada');
}
