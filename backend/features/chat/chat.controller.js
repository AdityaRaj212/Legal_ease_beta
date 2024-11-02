import UserRepository from '../users/user.repository.js';
import ChatRepository from './chat.repository.js';

export default class ChatController {
  constructor() {
    this.userRepository = new UserRepository();
    this.chatRepository = new ChatRepository();
  }

  // Handle chatbot interaction and save chat history
  async handleChat(req, res) {
    try {
      const { userId, message } = req.body;

      // Fetch user and check remaining chats
      const user = await this.userRepository.getUserById(userId);

      if (user.remainingChats <= 0) {
        return res.status(403).json({ message: 'Chat limit reached. Upgrade to chat more.' });
      }

      // Decrease remaining chats count
      user.remainingChats -= 1;
      await user.save();

      // Generate a placeholder bot response (This can be replaced with actual AI logic)
      const botResponse = `You said: ${message}. This is a placeholder response.`;

      // Save the chat to the chat history
      await this.chatRepository.saveChat(userId, message, botResponse);

      return res.status(200).json({
        message: botResponse,
        remainingChats: user.remainingChats
      });
    } catch (error) {
      console.error('Error during chatbot interaction:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Retrieve chat history for a user
  async getChatHistory(req, res) {
    try {
      const { userId } = req.params;
      
      // Fetch chat history from the repository
      const chatHistory = await this.chatRepository.getChatHistory(userId);

      if (!chatHistory.length) {
        return res.status(404).json({ message: 'No chat history found.' });
      }

      return res.status(200).json({ chats: chatHistory });
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}


// import UserRepository from '../users/user.repository.js';

// export default class ChatController {
//   constructor() {
//     this.userRepository = new UserRepository();
//   }

//   // Handle chatbot interaction
//   async handleChat(req, res) {
//     try {
//       // const userId  = "nethrika"; 
//       const { userId } = req.body; 
//       const { message } = req.body;

//       // Fetch user and check remaining chats
//       const user = await this.userRepository.getUserById(userId);
//       console.log('finding')

//       if (user.remainingChats <= 0) {
//         return res.status(403).json({ message: 'Chat limit reached. Upgrade to chat more.' });
//       }

      
//       user.remainingChats -= 1;
//       await user.save();

      
//       const botResponse = `You said: ${message}. This is a placeholder response.`;

      
//       return res.status(200).json({
//         message: botResponse,
//         remainingChats: user.remainingChats
//       });
//     } catch (error) {
//       console.error('Error during chatbot interaction:', error);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   }
// }
