import bodyParser from 'body-parser';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './db/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';


const app=express();

dotenv.config();
app.use(cors({
    origin:["https://aigen-client.onrender.com","http://localhost:5173"]
}));
app.use(bodyParser.json({limit:"50mb"}));
app.use(express.json({limit:"50mb"}));

app.use("/api/v1/post",postRoutes);
app.use("/api/v1/dalle",dalleRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>hello from dalle</h1>");
})


try{
    connectDB(process.env.MONGO_URI);
}catch(err){
    console.log(err);
}
app.listen(3000,()=>{
    console.log("server started and running in port 3000");
})