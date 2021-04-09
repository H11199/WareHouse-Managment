const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product_Detail_Schema = new Schema({
    serial_number: {
        type: String
    },
    manufacturer: {
        type: String
    },
    date_of_entry: {
        type: String
    },
    date_of_expiry: {
        type: String
    },
    item_type: {
        type: String
    },
    x_cord: {
        type: Number
    },
    y_cord: {
        type: Number
    }
});

module.exports = mongoose.model('ProductDetail', Product_Detail_Schema);