 import axios from "axios";
import FormData from "form-data"

 
 
 const generateImage=async(req,res)=>{
        try{
            const {prompt}=req.body
            if(!prompt){
                return res.json({success:false,message:"Missing details"});
            }
            const formData=new FormData();
            formData.append("prompt",prompt);
            const {data}=await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,
               { headers:{
                    'x-api-key': process.env.API_KEY,
                  },
                  responseType:"arraybuffer"
                }
            )
            const base64Image=Buffer.from(data,"binary").toString("base64");
            const resultImage=`data:image/png;base64,${base64Image}`
            res.json({success:true,message:"images are",resultImage:resultImage})
        }catch(err){
                console.log(err);
                return res.json({success:false,message:err.message})
        }
}


export default generateImage