require('dotenv').config();
let CONSTANTS = require("./constantsProject");

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const autenticationRoutes = require('./Routes/autenticationRouter');
const adminRoutes = require('./Routes/adminRouter');
const productRoutes = require('./Routes/productRouter');

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use(cors());

app.get((req, res, next) => {
    console.log(req.path, req.method);
    next;
});

// Routes
app.use('/api/autentication', autenticationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(CONSTANTS.LISTENPORT, process.env.PORT)
        });   
    })
    .catch((error) => {
        console.log(error);
    });