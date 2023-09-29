module.exports = (app) => {
    const orders = require("../controllers/orders.controller.js");
  
    var router = require("express").Router();
    // Get All Room
    // router.get("/", room.findAll);
    // //Get a Room
    // router.get('/:id',room.findRoomById)
    // //Get Rooms by type Room id
    // router.get('/type/:id',room.findRoomsByTypeRoomId)
    // // Create a new Room
    // router.get("/create", room.createFormRoom);
    router.post("/booking", orders.booking);
  
    //Update a new Room
    // router.put("/update/:id", room.updateRoom);
  
    app.use("/api/orders", router);
  };
  