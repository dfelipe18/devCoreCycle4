import Sales from "../models/sales.js";
import fs from "fs-extra";

//------------------

export const getSale = async (req, res) => {
  try {
    const sales = await Sales.find();
    res.send(sales);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

//------------------

export const createSales = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const newsale = new Sales({ name, description, price, urlImage, quantity });
    await newsale.save();
    return res.json(newsale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//------------------

export const updateSales = async (req, res) => {
  try {
    const updateSales = await Sales.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, }
    );
    return res.send(updateSales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
};

export const deleteSales = async (req, res) => {
  try {
    const salesRemoved = await Sales.findByIdAndDelete(req.params.id);

    if (!salesRemoved) {
      return res.sendStatus(404);
    } else {

      if (salesRemoved.urlImage.public_id) {
        await deleteImage(salesRemoved.urlImage.public_id);
      }
      return res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSales = async (req, res) => {
  const sales = await Sales.findById(req.params.id);

  if (!sales) {
    return res.sendStatus(404);
  } else {
    return res.json(sales);
  }
};
