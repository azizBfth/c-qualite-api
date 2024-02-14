const express = require('express');

const router = express.Router();

const {getLoggerUser,

} = require('../helper/user_permission');
const Product = require('../models/productModel');




router.get("/products", async (req, res) => {
    try {
      const products = await Product.find({});
    

  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/products/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth ) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post("/products", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth || !user.administrator) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
  // update a product
  router.put("/products/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth ) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      console.log("Product PUT:",req.body);
      const product = await Product.findByIdAndUpdate(id, req.body);
      // we cannot find any product in database
      if (!product) {
        return res
          .status(404)
          .json({ message: `cannot find any product with ID ${id}` });
      }
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  
  router.delete("/products/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth || !user.administrator) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `cannot find any product with ID ${id}` });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports = router;
