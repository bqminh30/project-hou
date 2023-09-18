module.exports = app => {
    const services = require("../controllers/service.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Typerooms
    router.post("/", services.create);
  
    // Retrieve all Typeroomss
    router.get("/", services.findAll);
  
    // Retrieve a single Typerooms with id
    router.get("/:id", services.findOne);
  
    // Update a services with id
    router.put("/:id", services.update);
  
    // Delete a services with id
    router.delete("/:id", services.delete);
  
    // Delete all servicess
    router.delete("/", services.deleteAll);
  
    app.use('/api/services', router);
  };
  