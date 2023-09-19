const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const Employee = require("../models/employee.model.js");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const cookieParser = require("cookie-parser");

exports.register = (req, res, next) => {
  try {
    const fullName = req.body.fullname;
    const email = req.body.email;
    let password = req.body.passwordHash;

    if (!fullName || !email || !password) {
      res.status(400).send({
        message: "Value not empty!",
      });
      return;
    }
    const salt = genSaltSync(10);
    password = hashSync(password, salt);

    const data = {
      fullName,
      email,
      password,
    };

    Employee.regiser(data, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Employee.",
        });
      else {
        const jsontoken = jsonwebtoken.sign(
          { data: data },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", jsontoken, {
          httpOnly: true,
          secure: true,
          SameSite: "strict",
          expires: new Date(Number(new Date()) + 30 * 60 * 1000),
        }); //we add secure: true, when using https.

        res.send({ token: jsontoken, data: data });
      }
    });
  } catch {
    console.log("errrrrr");
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.passwordHash;

    user = await Employee.getEmployeeByEmail(email);
    if (!user) {
      return res.send({
        message: "Invalid email or password",
      });
    } else {
      const isValidPassword = compareSync(password, user.passwordHash);
      if (isValidPassword) {
        user.passwordHash = undefined;
        const jsontoken = jsonwebtoken.sign(
          { data: user },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", jsontoken, {
          httpOnly: true,
          secure: true,
          SameSite: "strict",
          expires: new Date(Number(new Date()) + 30 * 60 * 1000),
        }); //we add secure: true, when using https.

        res.send({ token: jsontoken, data: user });
      } else {
        return res.send({
          status: 400,
          message: "Invalid email or password",
        });
      }
    }
  } catch {
    return res.send({
      status: 500,
      message: "Invalid email or password",
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const status = req.body.status;
    const address = req.body.address;
    const birthday = req.body.birthday;
    const avatar = req.body.avatar;
    const code = req.body.code;
    const role_id = req.body.role_id;
    const data = {
      fullname,
      email,
      phonenumber,
      status,
      address,
      birthday,
      avatar,
      role_id,
    };
    const userId = req.params.id;

    if (!fullname || !email || !phonenumber || !role_id || !code) {
      return res.send({
        status: 400,
        message: "Invalid data 1 ",
      });
    } else {
      await Employee.updateProfile(data, userId);

      res.send({
        status: 200,
        message: "Update Successfully",
      });
    }
  } catch (e) {
    return res.send({
      status: 500,
      message: "Không có nhân viên",
    });
  }
};
