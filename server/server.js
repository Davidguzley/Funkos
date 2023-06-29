require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

// Express app
const app = express();

// Middleware
app.get("/", (req, res, next) => {
    console.log(req.path, req.method);
    next;
});

// Routes
app.get("/", (req, res) => {
    res.json({mssg:"Welcome to the server Funko app"});
});

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
        });   
    })
    .catch((error) => {
        console.log(error);
    });