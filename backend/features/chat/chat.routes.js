import express from 'express';
import ChatController from './chat.controller.js';
import checkChatsLimit from '../../middleware/checkChatsLimit.js';

const chatController = new ChatController();
const router = express.Router();

// Route to handle user chats
router.post('/chat', checkChatsLimit, (req, res) => {
  chatController.handleChat(req, res);
});

// Route to fetch chat history for a user
router.get('/history/:userId', (req, res) => {
  chatController.getChatHistory(req, res);
});

export default router;


// import express from 'express';
// import ChatController from './chat.controller.js';
// //import authMiddleware from '../../middleware/auth.js';  
// import checkChatsLimit from '../../middleware/checkChatsLimit.js'; 
// //const ensureAuthenticated = require('../../middleware/auth.js');

// const chatController = new ChatController();
// const router = express.Router();

// // router.post('/chat', authMiddleware, checkChatsLimit, (req, res) => {
// //   chatController.handleChat(req, res);
// // });
// router.post('/chat', checkChatsLimit, (req, res) => {
//     chatController.handleChat(req, res);
// });

// export default router;
