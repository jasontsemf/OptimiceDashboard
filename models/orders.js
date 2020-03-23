const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addrSchema = new Schema({
    "country": String,
    "street_1": String,
    "street_2": String,
    "city": String,
    "state": String,
    "zip_code": Number,
});
const ordersSchema = new Schema({
    "model_url": String,
    "material": {type: String, enum:["resin", "pbt", "abs"]},
    "color": {type: String, enum:["black", "white"]},
    "connectivity": {type: String, enum:["2.4ghz", "bt", "both"]},
    "sensor": {type: String, enum:["avago", "pixart"]},
    "price": Number,
    "shipping_addr": [addrSchema],
    "status": {type: String, enum:["Paid", "Shipped", "Delivered", "Canceled", "Refunded", "Pending"]},
    "shippped_date": Date
}, {
    timestamps: true
});

const db = mongoose.model('orders', ordersSchema);

module.exports = db;