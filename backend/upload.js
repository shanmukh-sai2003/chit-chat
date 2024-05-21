import { v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadFileToCloudinary(localPath) {
    try {
        if(!localPath) return;

        const response = await cloudinary.uploader.upload(localPath, { aspect_ratio: "1.0", width: 400, height: 400, crop: "pad" });
        fs.unlinkSync(localPath);
        
        return response;
    } catch (error) {
        if(localPath) {
            fs.unlinkSync(localPath);
        }

        return null;
    }   
}

export default uploadFileToCloudinary;