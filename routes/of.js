const express = require('express');
const router = express.Router();
const {getLoggerUser,} = require('../helper/user_permission');
const OF = require('../models/ofModel');


router.get("/of", async (req, res) => {
    try {
      const ofs = await OF.find({}); 
  
      res.status(200).json(ofs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/of/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth ) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      const of = await OF.findById(id);
      res.status(200).json(of);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post("/of", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth || !user.administrator) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const of = await OF.create(req.body);
      res.status(200).json(of);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
  // update a accident
  router.put("/of/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth ) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      console.log("OF PUT:",req.body);
      const of = await OF.findByIdAndUpdate(id, req.body);
      // we cannot find any accident in database
      if (!of) {
        return res
          .status(404)
          .json({ message: `cannot find any departement with ID ${id}` });
      }
      const updatedOF = await OF.findById(id);
      res.status(200).json(updatedOF);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  
  router.delete("/of/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth || !user.administrator) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      const of = await OF.findByIdAndDelete(id);
      if (!of) {
        return res
          .status(404)
          .json({ message: `cannot find any of with ID ${id}` });
      }
      res.status(200).json(of);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports = router;
