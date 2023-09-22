module.exports = app => {
    const room = require("../controllers/room.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Room
    // router.get("/create", room.uploadImage);
    router.post("/create", room.createRoom);
  
    // Retrieve all Typeroomss
    // router.get("/", typerooms.findAll);
  
    // // Retrieve a single Typerooms with id
    // router.get("/:id", typerooms.findOne);
  
    // // Update a Typerooms with id
    // router.put("/:id", typerooms.update);
  
    // // Delete a Typerooms with id
    // router.delete("/:id", typerooms.delete);
  
    // // Delete all Typeroomss
    // router.delete("/", typerooms.deleteAll);
  
    app.use('/api/room', router);
  };
  