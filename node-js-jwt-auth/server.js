const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");

const app = express();

const host = '127.0.0.1';
const port = 8000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to auth application." });
});

// routes
require('./node-js-jwt-auth/routes/auth.routes')(app);
require('./node-js-jwt-auth/routes/user.routes')(app);
  
// set port, listen for requests
app.listen(port, host, () => {
    console.log(`Server is running on port ${port}.`);
    console.log(`Server listens http://${host}:${port}`)
});

/* DB */

const db = require("./app/models");
// db.sequelize.sync();
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
   
    Role.create({
        id: 2,
        name: "moderator"
    });
   
    Role.create({
        id: 3,
        name: "admin"
    });
}