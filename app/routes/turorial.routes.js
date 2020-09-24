const db = require("../models");
module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", function(req, res){
    db.login("tpielaszkiewicz", "lubaczow1").then(function () {
      tutorials.create(req, res);
    }.bind(this)).catch(function () {
      process.exit();
    }.bind(this));
  });

  // Retrieve all Tutorials
  router.get("/", function(req, res){
    db.login("tpielaszkiewicz", "lubaczow1").then(function () {
      tutorials.findAll(req, res);
    }.bind(this)).catch(function () {
      process.exit();
    }.bind(this))}
  );

  // Retrieve all published Tutorials
  router.get("/published", function(req, res){
    db.login("tpielaszkiewicz", "lubaczow1").then(function () {
      tutorials.findAllPublished(req, res);
    }.bind(this)).catch(function () {
      process.exit();
    }.bind(this))}
  );

  // Retrieve a single Tutorial with id
  router.get("/:id", function(req, res){
    db.login("tpielaszkiewicz", "lubaczow1").then(function () {
      tutorials.findOne(req, res);
    }.bind(this)).catch(function () {
      process.exit();
    }.bind(this))}
  );

  // Update a Tutorial with id
  router.put("/:id", function(req, res){
    db.login("tpielaszkiewicz", "lubaczow1").then(function () {
      tutorials.update(req, res);
    }.bind(this)).catch(function () {
      process.exit();
    }.bind(this))}
  );

  // Delete a Tutorial with id
  router.delete("/:id", function(req, res){
    db.login("tpielaszkiewicz", "lubaczow1").then(function () {
      tutorials.delete(req, res);
    }.bind(this)).catch(function () {
      process.exit();
    }.bind(this))}
  );

  // Create a new Tutorial
  router.delete("/", function(req, res){
    db.login("tpielaszkiewicz", "lubaczow1").then(function () {
      tutorials.deleteAll(req, res);
    }.bind(this)).catch(function () {
      process.exit();
    }.bind(this))}
  );

  app.use("/api/tutorials", router);
};
