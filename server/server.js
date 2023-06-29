require('dotenv').config();

const express = require("express");

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

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
});