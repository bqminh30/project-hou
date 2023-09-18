const Service = require("../models/service.model.js");

// Create and Save a new TypeRoom
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a TypeRoom
  const service = new Service({
    name: req.body.name,
    unit: req.body.unit,
    price: req.body.price,
    type_service_id: req.body.type_service_id,
  });

  // Save TypeRoom in the database
  Service.create(service, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the service."
      });
    else res.send(data);
  });
};

// Retrieve all TypeRooms from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  TypeRoom.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeRooms."
      });
    else res.send(data);
  });
};

// Find a single TypeRoom by Id
exports.findOne = (req, res) => {
  TypeRoom.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TypeRoom with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TypeRoom with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published TypeRooms
exports.findAllPublished = (req, res) => {
  TypeRoom.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeRooms."
      });
    else res.send(data);
  });
};

// Update a TypeRoom identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TypeRoom.updateById(
    req.params.id,
    new TypeRoom(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TypeRoom with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating TypeRoom with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a TypeRoom with the specified id in the request
exports.delete = (req, res) => {
  TypeRoom.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TypeRoom with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete TypeRoom with id " + req.params.id
        });
      }
    } else res.send({ message: `TypeRoom was deleted successfully!` });
  });
};

// Delete all TypeRooms from the database.
exports.deleteAll = (req, res) => {
  TypeRoom.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all TypeRooms."
      });
    else res.send({ message: `All TypeRooms were deleted successfully!` });
  });
};
