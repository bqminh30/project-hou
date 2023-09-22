const sql = require("../config/db.js");

// constructor
const Rooms = function (value) {
  this.name = value.name;
  this.title = value.title;
  this.description = value.description;
  this.price = value.price;
  this.priceSale = value.priceSale;
  this.rating = value.rating;
  this.totalRating = value.totalRating;
  this.totalReview = value.totalReview;
  this.numberBed = value.numberBed;
  this.numberPeople = value.numberPeople;
  this.status = value.status;
  this.label = value.label;
  this.isLiked = value.isLiked;
  this.image = value.image;
  this.voucher_id = value.rating;
  this.typeroom_id = value.typeroom_id;
  this.createdAt = new Date();
  this.updatedAt = new Date();
};

Rooms.createRoom = (newRoom, result) => {
  sql.query("INSERT INTO room SET ?", newRoom, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created room: ", { id: res.insertId, ...newRoom });
    result(null, { id: res.insertId, ...newRoom });
  });
};

Rooms.updateRoomById = (id, value, result) => {
  sql.query(
    "UPDATE room SET "+
    "name=?, title=?, description=?, price=?, priceSale=?, rating=?, totalRating =?, totalReview =?, numberBed =?, numberPeople =?, "+
    "status= ?,label=?, isLiked=?, image=?,voucher_id=?,typeroom_id=?, updatedAt=? WHERE id = ?",
    [
      value.name,
      value.title,
      value.description,
      value.price,
      value.priceSale,
      value.rating,
      value.totalRating,
      value.totalReview,
      value.numberBed,
      value.numberPeople,
      value.status,
      value.label,
      value.isLiked,
      value.image,
      value.voucher_id,
      value.typeroom_id,
      new Date(),
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);

        return;
      }

      if (res.affectedRows == 0) {
        // not found facilities with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated room: ", { id: id, ...value });
      result({ id: id, ...value });
    }
  );
};

Rooms.findRoomById = (id, result) => {
  sql.query(`SELECT * FROM room WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found voucher: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
}

Rooms.getAll = () => {
  sql.query = ("SELECT * FROM room", (err, res) => {
    if(err){
      result({
        status: 400,
        message: "Loi select room"
      });
      return;
    }
    result(null, res);
  })
}

Rooms.findByLabel = (data, result) => {
  sql.query(`SELECT * FROM room WHERE label = ${data}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("room: ", res);
    result(null, res);
  });
}

Rooms.getRoomType = (id, data, result) => {
  
}

module.exports = Rooms;
