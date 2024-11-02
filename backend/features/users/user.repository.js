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

    async getUserById(userId){
        try{
            const user = await UserModel.findById(userId);
            return user;
        }catch(err){
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