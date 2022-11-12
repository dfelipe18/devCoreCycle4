import product from "../models/product.js";
import { uploadImage, deleteImage } from "../libraries/cluodinary.js";

import fs from "fs-extra";

//------------------

export const getProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.send(products);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

//------------------

export const createProducts = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    let urlImage = null;

    if(req.files.urlImage){
      const fileUpload = await uploadImage(req.files.urlImage.tempFilePath)
      await fs.remove(req.files.urlImage.tempFilePath)
      urlImage = { 
        url: fileUpload.secure_url,
        public_id: fileUpload.public_id
      }
    }

    const newproduct = new product({ name, description, price, urlImage, quantity });
    await newproduct.save();
    return res.json(newproduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//------------------

export const updateProducts = async (req, res) => {
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, }
    );
    return res.send(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
};

export const deleteProducts = async (req, res) => {
  try {
    const productRemoved = await product.findByIdAndDelete(req.params.id);

    if (!productRemoved) {
      return res.sendStatus(404);
    } else {

      if (productRemoved.urlImage.public_id) {
        await deleteImage(productRemoved.urlImage.public_id);
      }
      return res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const deleteProducts1 = async (req, res) => {
//   try {
//     const productRemoved = await product.findByIdAndDelete(req.params.id);

//     if(!productRemoved) return res.status(404)
//     if(productRemoved.urlImage.public_id){
//       await deleteImage(productRemoved.urlImage.public_id)
//     }
//     return res.sendStatus(204)

//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const getProduct = async (req, res) => {
  const product = await product.findById(req.params.id);

  if (!product) {
    return res.sendStatus(404);
  } else {
    return res.json(product);
  }
};
