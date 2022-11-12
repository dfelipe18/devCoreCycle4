import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config.js';

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

export const uploadImage = async filePath => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'products'
  });
};

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id);
};