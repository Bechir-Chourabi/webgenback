const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");

const Role = db.role;
const app = express();

global.__basedir = __dirname;


var corsOptions = {
    //origin: "http://localhost:8081"
    origin:"*"
};

app.use(cors(corsOptions));
app.use(express.json())


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "welcome to webgen" });
});

// routes
require("./app/routes/auth.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


function initial() {
    
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "Admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'Admin' to roles collection");
            });

            new Role({
                name: "Client"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'Client' to roles collection");
            });
          

        }
    
    });

}