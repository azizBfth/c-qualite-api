const express = require('express');
const router = express.Router();
const {getLoggerUser,} = require('../helper/user_permission');
const Departement = require('../models/departementModel');


router.get("/departement", async (req, res) => {
    try {
      const departements = await Departement.find({}); 
  
      res.status(200).json(departements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/depatements/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth ) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      const departement = await Departement.findById(id);
      res.status(200).json(departement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post("/departements", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth || !user.administrator) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const departement = await Departement.create(req.body);
      res.status(200).json(departement);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
  // update a accident
  router.put("/accidents/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth ) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      console.log("Departement PUT:",req.body);
      const departement = await Departement.findByIdAndUpdate(id, req.body);
      // we cannot find any accident in database
      if (!departement) {
        return res
          .status(404)
          .json({ message: `cannot find any departement with ID ${id}` });
      }
      const updatedDepartement = await Departement.findById(id);
      res.status(200).json(updatedDepartement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  
  router.delete("/accidents/:id", async (req, res) => {
    const user = await getLoggerUser(req.userId);

    if (!req.isAuth || !user.administrator) {
      return res.status(401).json({ message: 'Unauthenticated!' });
    }
    try {
      const { id } = req.params;
      const departement = await Departement.findByIdAndDelete(id);
      if (!departement) {
        return res
          .status(404)
          .json({ message: `cannot find any departement with ID ${id}` });
      }
      res.status(200).json(departement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports = router;
