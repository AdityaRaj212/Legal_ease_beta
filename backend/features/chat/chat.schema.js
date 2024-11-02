import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  message: {
    type: String,
    required: true
  },
  botResponse: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now // Automatically set the current date and time
  }
});

export default mongoose.model('Chat', chatSchema);
