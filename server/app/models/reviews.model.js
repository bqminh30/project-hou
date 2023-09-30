const sql = require("../config/db.js");

// constructor
const Reviews = function(data) {
  this.content = data.content;
  this.image = data.image;
  this.rating = data.rating;
  this.room_id = data.room_id;
  this.employee_id = data.employee_id;
  this.createdAt = data.createdAt;
  this.updatedAt = data.updatedAt;
};

Reviews.create = (newReview, result) => {
  sql.query("INSERT INTO reviews SET ?", newReview, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new review: ", { id: res.insertId, ...newReview });
    result(null, { id: res.insertId, ...newReview });
  });
};

Reviews.findById = (id, result) => {
  sql.query(`SELECT * FROM service WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found service: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Service with the id
    result({ kind: "not_found" }, null);
  });
};

Reviews.getAll = (title, result) => {
  let query = "SELECT * FROM service";

  if (title) {
    query += ` WHERE name LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("service: ", res);
    result(null, res);
  });
};

Reviews.getAllServiceByTypeService = (id, result) => {
  sql.query(`SELECT * FROM service WHERE type_service_id='${id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("service: ", res);
    result(null, res);
  });
};

Reviews.updateById = (id, service, result) => {
  sql.query(
    "UPDATE service SET name = ?, unit = ?, price =? WHERE id = ?",
    [service.name,service.unit, service.price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Service with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated service: ", { id: id, ...service });
      result(null, { id: id, ...service });
    }
  );
};

Reviews.remove = (id, result) => {
  sql.query("DELETE FROM service WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Service with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted service with id: ", id);
    result(null, res);
  });
};


module.exports = Reviews;
