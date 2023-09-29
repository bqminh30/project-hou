const sql = require("../config/db.js");

// constructor
const Orders = function(data) {
  this.createdDate = data.createdDate;
  this.checkinDate = data.checkinDate;
  this.checkoutDate = data.checkoutDate;
  this.dateCount = data.dateCount;
  this.personCount = data.personCount;
  this.status = data.status;
  this.total = data.total;
  this.note = data.note;
  this.customer_id = data.customer_id;
  this.employee_id = data.employee_id;
  this.createdAt = data.createdAt;
  this.updatedAt = data.updatedAt;
};

Orders.create = (newOrder, result) => {
    sql.query(
      `SELECT COUNT(*) AS cnt FROM orders 
      LEFT JOIN order_detail od ON orders.id = od.order_id
      LEFT JOIN room r ON od.room_id = r.id 
        WHERE (checkoutDate > ?) 
        AND r.numberPeople >= ?`,

//         SELECT COUNT(*) AS cnt
// FROM orders
// LEFT JOIN order_detail od ON orders.id = od.order_id
// LEFT JOIN room r ON od.room_id = r.id
// WHERE (orders.checkoutDate > '2023-10-12' OR r.numberPeople <= 10 )
      [newOrder.room_id, newOrder.checkinDate, newOrder.personCount],
      function (err, data) {
        if (err) {
          result({
            status: 500,
            message: `${err}`,
          }, null);
          return;
        } else {
            console.log('data[0].cnt', data)
          if (data[0].cnt > 0) {
            result({
              status: 500,
              message: "Thời gian đặt phòng đã có người đặt",
            }, null);
            return;
          } 
        //   else {
        //     // Chèn dữ liệu vào bảng Orders
        //     sql.query(
        //       "INSERT INTO orders (createdDate, checkinDate, checkoutDate, dateCount, personCount, status, total, note, customer_id, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        //       [
        //         newOrder.createdDate,
        //         newOrder.checkinDate,
        //         newOrder.checkoutDate,
        //         newOrder.dateCount,
        //         newOrder.personCount,
        //         newOrder.status,
        //         newOrder.total,
        //         newOrder.note,
        //         newOrder.customer_id,
        //         new Date(),
        //       ],
        //       (err, orderRes) => {
        //         if (err) {
        //           result({
        //             status: 400,
        //             message: `Lỗi khi tạo đơn đặt phòng ${err}`,
        //           }, null);
        //           return;
        //         }
  
        //         const orderId = orderRes.insertId;
        //         const room_detail_id =newOrder.room_id
  
        //         // Chèn dữ liệu vào bảng order_detail
        //         sql.query(
        //           "INSERT INTO order_detail (createdDate, price, order_id, room_id, createdAt) VALUES (?, ?, ?, ?, ?)",
        //           [
        //             newOrder.checkinDate, 
        //             newOrder.total, 
        //             orderId,
        //             room_detail_id,
        //             new Date(),
        //           ],
        //           (err, orderDetailRes) => {
        //             if (err) {
        //               result({
        //                 status: 400,
        //                 message: `Lỗi khi tạo đơn đặt phòng chi tiết ${err}`,
        //               }, null);
        //               return;
        //             }
  
        //             console.log("Đã tạo đơn đặt phòng và đơn đặt phòng chi tiết.");
        //             result(null, { id: orderId, ...newOrder });
  
        //             // Đối với đơn đặt phòng chi tiết, bạn cũng có thể trả về thông tin chi tiết nếu cần
        //           }
        //         );
        //       }
        //     );
        //   }
        }
      }
    );
  };

Orders.findById = (id, result) => {
  sql.query(`SELECT * FROM type_room WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Orders.getAll = (title, result) => {
  let query = "SELECT * FROM type_room";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("type_room: ", res);
    result(null, res);
  });
};

Orders.getAllPublished = result => {
  sql.query("SELECT * FROM type_room WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("type_room: ", res);
    result(null, res);
  });
};

Orders.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE type_room SET name = ? WHERE id = ?",
    [Orders.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Orders.remove = (id, result) => {
  sql.query("DELETE FROM type_room WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};



module.exports = Orders;
