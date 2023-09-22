const Room = require("../models/room.model.js");

// Create and Save a new Room
exports.createRoom = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a TypeRoom
  const room = new Room({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    priceSale: req.body.priceSale,
    rating: 0,
    totalRating: 0,
    totalReview: 0,
    numberBed: req.body.numberBed,
    numberPeople: req.body.numberPeople,
    status: req.body.status,
    label: req.body.label,
    isLiked: req.body.isLiked,
    image: req.body.image,
    voucher_id: req.body.voucher_id,
    typeroom_id: req.body.typeroom_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Save TypeRoom in the database
  Room.createRoom(room, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TypeRoom.",
      });
    else
      res.send({
        status: 200,
        data: data,
        message: "Tạo phòng thành công",
      });
  });
};

// get all rooms in the databases
exports.getAll = (req, res) => {

  Room.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeRooms.",
      });
    else
      res.send({
        status: 200,
        data: data,
      });
  });
};

// Find a single Room by Id
exports.findRoomById = (req, res) => {
  Room.findRoomById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Room with id " + req.params.id,
        });
      }
    } else res.send({
      status: 200,
      data: data,
    });
  });
};

// find all published TypeRooms
exports.findAllPublished = (req, res) => {
  TypeRoom.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeRooms.",
      });
    else res.send(data);
  });
};

// Update a TypeRoom identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  TypeRoom.updateById(req.params.id, new TypeRoom(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TypeRoom with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating TypeRoom with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a TypeRoom with the specified id in the request
exports.delete = (req, res) => {
  TypeRoom.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TypeRoom with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete TypeRoom with id " + req.params.id,
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
          err.message || "Some error occurred while removing all TypeRooms.",
      });
    else res.send({ message: `All TypeRooms were deleted successfully!` });
  });
};
