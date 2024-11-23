import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import postModel from '../models/postModel.js';



dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_SECRET
})
export const postData=async(req,res)=>{
    try{
        const {name,prompt,photo}=req.body;
        const photoUrl=await cloudinary.uploader.upload(photo);
        const newPost=await postModel.create({
            name,
            prompt,
            photo:photoUrl.url
        })
        res.status(200).json({success:true,data:newPost});
    }catch(err){
        console.log(err);
        return res.status(500).json({succcess:false,msg:err.message})
    }
    

}
const getData=async(req,res)=>{
    try{
        const posts=await postModel.find({});
        return res.status(200).json({success:true,data:posts});
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:err.message});
    }
}

export default getData