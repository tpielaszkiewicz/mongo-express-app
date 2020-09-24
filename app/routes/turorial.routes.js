const db = require("../models");
module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", function(req, res){
    db.call(req, res, tutorials.create); 
  });

  // Retrieve all Tutorials
  router.get("/", function(req, res){
    db.call(req, res, tutorials.findAll);
  });

  // Retrieve all published Tutorials
  router.get("/published", function(req, res){
    db.call(req, res, tutorials.findAllPublished)
  });

  // Retrieve a single Tutorial with id
  router.get("/:id", function(req, res){
    db.call(req, res, tutorials.findOne)
  });

  // Update a Tutorial with id
  router.put("/:id", function(req, res){
    db.call(req, res, tutorials.update)
  });

  // Delete a Tutorial with id
  router.delete("/:id", function(req, res){
    db.call(req, res, tutorials.delete)
  });

  // Create a new Tutorial
  router.delete("/", function(req, res){
    db.call(req, res, tutorials.deleteAll)
  });

  app.use("/api/tutorials", router);
};
