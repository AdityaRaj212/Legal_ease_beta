import mongoose from "mongoose";


// console.log('MongoDB URI:', process.env.MONGO_URI);

// const url = "mongodb://127.0.0.1:27017/legal-chatbot-pre-release";
const url = "mongodb+srv://adityaeducation212:adityadb212@cluster0.jm0dl8u.mongodb.net/legal-chatbot-pre-release?retryWrites=true&w=majority&appName=Cluster0";


export const connectUsingMongoose = async () => {
    try{
        await mongoose.connect(url);
        console.log('MongoDB is connected using mongoose');
        // await dropIndex();
    }catch(err){
        console.log('Error while connecting to DB: ' + err);
    }
}