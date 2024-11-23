import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import postModel from '../models/postModel.js';
import getData, { postData } from '../controllers/PostController.js';



const router=express.Router();
router.route("/").get(getData).post(postData)
export default router;