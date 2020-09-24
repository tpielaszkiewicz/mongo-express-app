const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = async function(req, res) {
 // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a Tutorial
    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database
    var data = await tutorial.save(tutorial);
    if (!data) {
      res.status(404).send({ message: "Error creating the tutorial" });
    } else {
      res.send(data);
    };
};

// Retrieve all Tutorials from the database.
exports.findAll = async function(req, res) {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  var data = await Tutorial.find(condition)
  if (!data) {
    res.status(404).send({ message: "Not found any tutorial" });
  } else {
    res.send(data);
  };
};

// Find a single Tutorial with an id
exports.findOne = async function(req, res){
  const id = req.params.id;

  var data = await Tutorial.findById(id);
  if (!data) {
    res.status(404).send({ message: "Not found Tutorial with id " + id });
  } else {
    res.send(data);
  };
};

// Update a Tutorial by the id in the request
exports.update = async function(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  var data = await Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
  if (!data) {
    res.status(404).send({
      message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
    });
  } else { 
    res.send({ message: "Tutorial was updated successfully." });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async function(req, res) {
  const id = req.params.id;

  var data = await Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
  if (!data) {
    res.status(404).send({
      message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
    });
  } else {
    res.send({
      message: "Tutorial was deleted successfully!"
    });
  }
};

// Delete all Tutorials from the database.
exports.deleteAll = async function(req, res) {
  var data = await Tutorial.deleteMany({})
  if (data) {
    res.send({
      message: `${data.deletedCount} Tutorials were deleted successfully!`
    });
  }
};

// Find all published Tutorials
exports.findAllPublished = async function(req, res) {
  var data = await Tutorial.find({ published: true })
   if (data) {
    res.send(data);
   }
};
