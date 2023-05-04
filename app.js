const express = require("express");
const { readdirSync } = require("fs");
const app = express();
require("./src/db/conn");
const bodyParser = require('body-parser');



// SECURITY MIDDLEWARE IMPLEMENTS
app.use(express.json());
app.use(express.json());

app.use(bodyParser.json());

// ROUTES MIDDLEWARE
readdirSync("./src/routes").map((i) =>
  app.use("/api/v1", require(`./src/routes/${i}`))
);



module.exports = app 