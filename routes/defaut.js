const express = require('express');

const router = express.Router();

const {getLoggerUser,

} = require('../helper/user_permission');
const Defaut = require('../models/defautModel');




router.get("/defauts", async (req, res) => {
    try {
      const defauts = await Defaut.find({});
    

  
      res.status(200).json(defauts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/defauts/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth ) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      const defaut = await Defaut.findById(id);
      res.status(200).json(defaut);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post("/defauts", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth || !user.administrator) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const defaut = await Defaut.create(req.body);
      res.status(200).json(defaut);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
  // update a defaut
  router.put("/defauts/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth ) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      console.log("Defaut PUT:",req.body);
      const defaut = await Defaut.findByIdAndUpdate(id, req.body);
      // we cannot find any defaut in database
      if (!defaut) {
        return res
          .status(404)
          .json({ message: `cannot find any defaut with ID ${id}` });
      }
      const updatedDefaut = await Defaut.findById(id);
      res.status(200).json(updatedDefaut);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  
  router.delete("/defauts/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth || !user.administrator) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      const defaut = await Defaut.findByIdAndDelete(id);
      if (!defaut) {
        return res
          .status(404)
          .json({ message: `cannot find any defaut with ID ${id}` });
      }
      res.status(200).json(defaut);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports = router;
