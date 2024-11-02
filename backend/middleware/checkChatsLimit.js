import UserRepository from '../features/users/user.repository.js';

const checkChatsLimit = async (req, res, next) => {
  try {
    // const  userId  = "nethrika";
    console.log('chat limit');
    const  userId  = req.body.userId;  // Get user from JWT auth middleware
    console.log(userId);
    const userRepository = new UserRepository();

    const user = await userRepository.getUserById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (user.remainingChats > 0) {
      return next(); 
    } else {
      console.log('Chat limit exceed code');
      return res.status(200).json({ message: 'Chat limit reached' });
    }
  } catch (error) {
    console.error('Error in checking chat limit:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default checkChatsLimit;
