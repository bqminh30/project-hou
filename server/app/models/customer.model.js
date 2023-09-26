const sql = require("../config/db.js");

const Customer = function (employee) {
  this.fullname = employee.fullname;
  this.phonenumber = employee.phonenumber;
  this.code = employee.code;
  this.passwordHash = employee.passwordHash;
  this.address = employee.address;
  this.birthday = employee.birthday;
  this.avatar = employee.avatar;
  this.email = employee.email;
  this.createdAt = new Date();
  this.updatedAt = new Date();
};

Customer.regiser = (newEmployee, result) => {
  sql.query(
    "SELECT COUNT(*) AS cnt FROM customer WHERE email = ? ",
    newEmployee.email,
    function (err, data) {
      if (err) {
        result(err, null);
        return;
      } else {
        if (data[0].cnt > 0) {
          result({
            status: 500,
            message: "Email đã bị trùng",
          });
          return;
        } else {
          sql.query(
            "INSERT INTO customer (fullname, email, passwordHash) VALUES (?,?,?)",
            [newEmployee.fullname, newEmployee.email, newEmployee.password],
            (err, res) => {
              if (err) {
                result({
                  status: 400,
                  message: `Lỗi ${err}`,
                });
                return;
              }

              console.log("created employee: ", {
                id: res.insertId,
                ...newEmployee,
              });
              result(null, { id: res.insertId, ...newEmployee });
            }
          );
        }
      }
    }
  );
};
Customer.getEmployeeByEmail = (email) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM customer WHERE email = ?", email, (error, res) => {
      if (error) {
        return reject(error);
      }
      return resolve(res[0]);
    });
  });
};

Customer.checkEmailCodeExist = (email, code, userId) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT COUNT(*) AS count
        FROM customer
        WHERE (email = ? OR code = ?) AND id != ?
      `;
    sql.query(query, [email, code, userId], (error, res) => {
      console.log('res', error, res)
      if (error) {
        return reject(error);
      }
      return resolve(res[0].count);
    });
  });
};

Customer.updateProfile = (data, userId) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE customer SET fullname = ?,phonenumber = ?, email = ?, code = ?, address = ?, birthday = ?, updatedAt =? WHERE id = ?",
      [
        data.fullname,
        data.phonenumber,
        data.email,
        data.code,
        data.address,
        data.birthday,
        data.updatedAt,
        userId,
      ],
      (error, res) => {
        console.log("error", data, userId);
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

module.exports = Customer;
