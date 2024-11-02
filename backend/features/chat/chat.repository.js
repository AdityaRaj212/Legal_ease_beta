import Chat from './chat.schema.js';

export default class ChatRepository {
  // Save a new chat
  async saveChat(userId, message, botResponse) {
    const chat = new Chat({
      userId,
      message,
      botResponse
    });
    await chat.save();
    return chat;
  }

  // Retrieve chat history for a user
  async getChatHistory(userId) {
    return Chat.find({ userId }).sort({ timestamp: 1 }).exec(); // Sort by newest first
  }

  // Retrieve limited number of chats for pagination or initial display
  async getChatHistoryWithLimit(userId, limit = 10) {
    return Chat.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .exec(); // Sort by newest first
  }
}
