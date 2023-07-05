require('dotenv').config();
let CONSTANTS = require("./constantsProject");

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const authenticationRoutes = require('./Routes/authenticationRouter');
const adminRoutes = require('./Routes/adminRouter');
const productRoutes = require('./Routes/productRouter');
const reportRoutes = require('./Routes/reportRouter');

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
app.use('/api/authentication', authenticationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);
app.use('/api/report', reportRoutes);

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