// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import router from './adapters/http/routes';
import { config } from './config/config';
import { initializeDatabase } from './adapters/database/typeORMClient';
import './config/dotenv';

const app = express();
app.use(bodyParser.json());
app.use(router);

initializeDatabase().then(() => {
    app.listen(config.port, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
    });
});

