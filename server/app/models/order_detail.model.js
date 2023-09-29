const sql = require("../config/db.js");

// constructor
const Order_Detail = function(data) {
  this.createdDate = data.createdDate;
  this.order_id = data.order_id;
  this.room_id = data.room_id;
  this.createdAt = data.createdAt;
  this.updatedAt = data.updatedAt;
};

Order_Detail.create = (newOrder_detail, result) => {
    sql.query("INSERT INTO order_detail SET ?", newOrder_detail, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created order: ", { id: res.insertId, ...newOrder_detail });
      result(null, { id: res.insertId, ...newOrder_detail });
    });
  };

  module.exports = Order_Detail;