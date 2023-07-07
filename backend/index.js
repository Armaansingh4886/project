
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.js"
const app = express();
// const port = process.env.PORT || 8000

const port = 4000
const MONGO_URL = 'mongodb+srv://projectwork4005:msr1Udkax1BbDzb1@cluster0.txxdkrs.mongodb.net/?retryWrites=true&w=majority'
//databse connection
mongoose.set('strictQuery',false);

const connect = async()=>{
    try {
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser:true,
            // useUndifinedTopology:true
        })
    console.log('mongodb connected successfully')    
    } catch (err) {
        console.log("mongodb connection failed",err);
    }
}

app.use(express.json())
app.use('/api/v1/auth', userRoute);


app.listen(port, () =>{
    connect();
    console.log("server listining on port ",port);
})