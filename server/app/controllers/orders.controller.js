const Orders = require("../models/orders.model.js");

exports.booking = (req, res) => {
    // Validate request fields (you may want to add more specific validation)
    const { createdDate, checkinDate, checkoutDate, dateCount, personCount, total, note, customer_id, room_id } = req.body;
  
    if (!createdDate || !checkinDate || !checkoutDate || !dateCount || !personCount || !total || !customer_id || !room_id) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    // Create a new order object
    const order = {
      createdDate,
      checkinDate,
      checkoutDate,
      dateCount,
      personCount,
      status: 1, // Determine the status based on your logic
      total,
      note,
      customer_id,
      room_id,
    };
  
    // Save Order in the database
    Orders.create(order, (err, data) => {
      if (err) {
        // Handle errors more explicitly with meaningful messages
        return res.status(500).json({ message: "An error occurred while booking the room.", error: err.message });
      }
  
      // Return a success response with the created order data
      return res.status(200).json({ message: "Room booked successfully.", data });
    });
  };
