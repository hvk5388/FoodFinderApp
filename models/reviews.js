// models/reviews.js
var db = require("../db");

var Review = db.model("Review", {
    restaurant: String,
    food: { type: Number, min: 0, max: 5 },
    service: {type: Number, min: 0, max: 5 },
    price: {type: Number, min: 0, max: 5},
    comments: String
});

module.exports = Review;

// const mongoose = require("../db");
// const schema = new mongoose.Schema(
//     {
//         restaurant: {
//             desc: "The restaurant name.",
//             trim: true,
//             type: String,
//             index: true,
//             unique: true,
//         },
//         food: {
//             desc: "The food rating.",
//             trim: true,
//             type: Number,
//             min: 0,
//             max: 5,
//         },
//         service: {
//             desc: "The service rating.",
//             trim: true,
//             type: Number,
//             min: 0,
//             max: 5,
//         },
//         price: {
//             desc: "The price rating.",
//             trim: true,
//             type: Number,
//             min: 0,
//             max: 5,
//         },
//         comments: {
//             desc: "The description.",
//             trim: true,
//             type: String,
//             index: true,
//         }
//     }
// );

// module.exports = mongoose.model("review", schema);
