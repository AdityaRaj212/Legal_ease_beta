import UserRepository from "./user.repository.js";
import jwt from 'jsonwebtoken';

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req,res){
        console.log('yo');
        const {userName, email, password} = req.body;
        const newUser = await this.userRepository.addUser(userName,email, password);
        res.status(201).json({
            status: true,
            user: newUser
        });
    }

    async getMe(req, res){
        try{
            const userId = req.user.userId;
            console.log('userId: ',userId);
            const user = await this.userRepository.getMe(userId);

            if(!user){
                return res.status(404).json({ message: 'User not found.' });
            }
            
            res.status(200).json({
                status: true,
                user
            })
        }catch(err){
            res.status(500).json({
                message: 'Error while fetching current user',
                error: err.message
            })
        }
    }

    async signIn(req,res){
        const {email,password} = req.body;
        const user = await this.userRepository.getUser(email,password);
        if(user){
            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email
                },
                'secret',
                {
                    expiresIn: '24h'
                }
            );

            res.cookie('jwtToken',token,{
                maxAge: 24*60*60*1000
            });
            res.cookie('userId',user._id,{
                maxAge: 24*60*60*1000
            })
            res.cookie('userInfo',JSON.stringify(user),{
                maxAge: 24*60*60*1000
            });
            res.status(200).json({
                status: true,
                user,
                token
            });
        }else{
            res.status(401).json({
                status: false,
                msg: "Invalid credentials"
            }); 
        }
    }

    async signOut(req,res){
        try{
            const userId = req.params.userId;
            console.log(userId);
            const user = await this.userRepository.signOut(userId);
            user.status = 'Offline';
            await user.save();
            res.status(201).json({
                status: true,
                msg: 'logged out successfully',
                user: user
            });
        }catch(err){
            res.status(500).json({
                status: false,
                msg: 'Failed to logout',
                error: err.message
            })
        }
    }

    async storeEmail(req, res){
        try{
            const {email} = req.body;
            const newUser = await this.userRepository.storeEmail(email);
            res.status(201).json({
                status: true,
                user: newUser
            })
        }catch(err){
            if (err.message === 'Email already exists') {
                res.status(409).json({
                    status: false,
                    msg: 'Email already registered',
                });
            } else {
                res.status(500).json({
                    status: false,
                    msg: 'Failed storing email',
                    error: err.message
                });
            }
        }
    }
}