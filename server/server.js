require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
<<<<<<< HEAD
const app = express();
const facilitiesRoutes = require('./app/routes/facilities.routes');
=======
const path = require("path");
const app = express();
const facilitiesRoutes = require("./app/routes/facilities.routes");
const apiRouter = express.Router();
const cloudinary = require("cloudinary").v2;
>>>>>>> refs/remotes/origin/master

var corsOptions = {
  origin: "http://localhost:6969",
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */
app.use("/upload", express.static("public/images"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to server." });
});

require("./app/routes/typeroom.routes.js")(app);
require("./app/routes/typeservice.routes.js")(app);
require("./app/routes/service.routes.js")(app);
require("./app/routes/employee.routes.js")(app);
require("./app/routes/voucher.routes.js")(app);
<<<<<<< HEAD
app.use('/api/facilities', facilitiesRoutes);
=======
require("./app/routes/room.routes.js")(app);
app.use("/api/facilities", facilitiesRoutes);
>>>>>>> refs/remotes/origin/master

// set port, listen for requests
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
