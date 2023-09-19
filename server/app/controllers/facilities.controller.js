var multer = require("multer");
var imageMiddleware = require("../middleware/image-middleware");
const Facilities = require("../models/facilities.model.js");
const fs = require("fs");

module.exports = {
  facilitiesUploadForm: function (req, res) {
    res.render("upload-form");
  },
  facilitiesStorage: function (req, res) {
    var upload = multer({
      storage: imageMiddleware.image.storage(),
      allowedImage: imageMiddleware.image.allowedImage,
    }).single("image");

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
        // store image in database
        var imageName = req.file.originalname;
        var inputValues = {
          image: imageName,
          name: req.body.name,
          location: req.body.location,
          phone: req.body.phone,
          logo: req.body.logo,
          title: req.body.title,
        };
        // call model
        Facilities.create(inputValues, function (data) {
          res.render("upload-form", { alertMsg: data });
        });
      }
    });
  },
  updateFacility: function (req, res) {
    try {
      var upload = multer({
        storage: imageMiddleware.image.storage(),
        allowedImage: imageMiddleware.image.allowedImage,
      }).single("image");
      var inputValues = {};
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send(err);
        } else if (err) {
          res.send(err);
        } else {
          // store image in database
          var imageName = req.file.originalname;
          inputValues = {
            image: imageName,
            name: req.body.name,
            location: req.body.location,
            phone: req.body.phone,
            logo: req.body.logo,
            title: req.body.title,
          };
        }
        Facilities.updateFacility(
            req.params.id,
            new Facilities(inputValues),
            (data, err) => {
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found Facilities with id ${req.params.id}.`,
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating Facilities " + err,
                  });
                }
              } else res.status(200).send({
                message: "Update successfully",
                data: data
              });
            }
          );
      });

      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating facility",
        error: error.message,
      });
    }
  },
};
