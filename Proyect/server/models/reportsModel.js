const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    SKU: {
        type: String,
        required: true,
    },
    token_id: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Reports = mongoose.model('Reports', reportSchema);

module.exports = Reports;