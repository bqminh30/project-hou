module.exports = app => {
    const typerooms = require("../controllers/typeroom.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Typerooms
    router.post("/", typerooms.create);
  
    // Retrieve all Typeroomss
    router.get("/", typerooms.findAll);
  
    // Retrieve a single Typerooms with id
    router.get("/:id", typerooms.findOne);
  
    // Update a Typerooms with id
    router.put("/:id", typerooms.update);
  
    // Delete a Typerooms with id
    router.delete("/:id", typerooms.delete);
  
    // Delete all Typeroomss
    router.delete("/", typerooms.deleteAll);
  
    app.use('/api/typerooms', router);
  };
  