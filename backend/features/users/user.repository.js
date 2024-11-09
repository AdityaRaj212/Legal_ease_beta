import { UserModel } from "./user.schema.js";

export default class UserRepository{
    async addUser(userName, email, password){
        try{
            const newUser = new UserModel({
                userName,
                email, 
                password,
            });
            await newUser.save();
            return newUser;
        }catch(err){
            console.log('Error while creating user account: ' + err);
            throw err;
        }
    }

    async signOut(userId){
        try{
            const user = await UserModel.findById(userId);
            console.log(user);
            return user;
        }catch(err){
            console.log('Error while logging out');
            throw err;
        }
    }

    // async getUserById(userId){
    //     try{
    //         const user = await UserModel.findById(userId);
    //         return user;
    //     }catch(err){
    //         console.error('Error while fetching user: ', err);
    //         throw err;
    //     }
    // }

    async getUserById(userId) {
        try {
            const user = await UserModel.findById(userId);
    
            if (user) {
                // Check if the user is subscribed or not
                if (!user.subscribed) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Set time to midnight
    
                    const lastResetDate = new Date(user.lastChatReset);
                    lastResetDate.setHours(0, 0, 0, 0);
    
                    // If the last reset date is not today, reset the remaining chats
                    if (today > lastResetDate) {
                        user.remainingChats = 5; // Reset to 5 chats
                        user.lastChatReset = new Date(); // Update last reset date
                        await user.save(); // Save the updated user
                    }
                }
            }
    
            return user;
        } catch (err) {
            console.error('Error while fetching user: ', err);
            throw err;
        }
    }
    
    async getMe(userId){
        try{    
            const user = await UserModel.findById(userId);
            return user;
        }catch(err){
            console.error('Error while fetching current user: ', err);
            throw new Error(err);
        }
    }

    async getUser(email,password){
        try{
            const user = await UserModel.findOne({email, password});
            return user;
        }catch(err){
            console.log('Error while searching user: ' + err);
            throw err;
        }
    }
    async storeEmail(email){
        try{
            const newUser = new UserModel({email});
            await newUser.save();
            return newUser;
        }catch(err){
            if (err.code === 11000) {
                throw new Error('Email already exists');
            }
            console.error('Error while storing email address: ', err);
            throw new Error(err);
        }
    }
}