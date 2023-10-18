
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const path = require("path");
const app = express();
const facilitiesRoutes = require("./app/routes/facilities.routes");
const roomImagesRoutes = require("./app/routes/room_image.routes");
const apiRouter = express.Router();



var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cloudinary configuration

cloudinary.config({
  cloud_name: 'dhothev66',
  api_key: '656369283374582',
  api_secret: '4f9vjPrU5vf4CGReQBQ7nLQCm3c',
  secure: true
});

app.use(
  express.urlencoded({ extended: true })
); 
app.use("/upload", express.static("public/images"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to server." });
});
console.log(cloudinary.config());
app.post("/image-upload", (request, response) => {
  
  // collected image from a user
  const data = {
    image: request.body.image,
  }
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  console.log('reqes', data)

  // upload image here
  cloudinary.uploader.upload('https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg', options)
  .then((result) => {
    response.status(200).send({
      message: "success",
      result,
    });
  }).catch((error) => {
    response.status(500).send({
      message: "failure",
      error,
    });
  });

});

require("./app/routes/typeroom.routes.js")(app);
require("./app/routes/typeservice.routes.js")(app);
require("./app/routes/service.routes.js")(app);
require("./app/routes/employee.routes.js")(app);
require("./app/routes/reviews.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/voucher.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/orders.routes.js")(app);
require("./app/routes/room_service.routes.js")(app);
require("./app/routes/room_image.routes.js")(app);
app.use("/api/facilities", facilitiesRoutes);
// app.use("/api/room-image", roomImagesRoutes);

const uploadRouter = require('./app/routes/image.routes.js');

app.use('/uploads', uploadRouter);

// set port, listen for requests
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
