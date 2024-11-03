import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectUsingMongoose } from './config/mongoose.js';

import userRouter from './features/users/user.routes.js';
import chatRouter from './features/chat/chat.routes.js';

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
    secret: 'legal-chatbot-pre-release',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Serve static files from the frontend build directory
const buildPath = path.resolve(__dirname, '../frontend/build');
console.log(`Serving static files from ${buildPath}`);
server.use(express.static(buildPath));

server.use('/api/user', userRouter);
server.use('/api/chat', chatRouter);

server.listen(3400, () => {
    console.log('Server is up and running at 3400');
    connectUsingMongoose();
});