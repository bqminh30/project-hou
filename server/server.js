require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const app = express();
const facilitiesRoutes = require('./app/routes/facilities.routes');

var corsOptions = {
  origin: "http://localhost:6969"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
app.use('/upload', express.static('public/images'));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to server." });
});


require("./app/routes/typeroom.routes.js")(app);
require("./app/routes/typeservice.routes.js")(app);
require("./app/routes/service.routes.js")(app);
require("./app/routes/employee.routes.js")(app);
require("./app/routes/voucher.routes.js")(app);
app.use('/api/facilities', facilitiesRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
