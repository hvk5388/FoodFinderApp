// models/reviews.js
var db = require("../db");

var Review = db.model("Review", {
    restaurant:    String,
    food:          { type: Number, min: 0, max: 5 },
    service:       { type: Number, min: 0, max: 5 },
    price:         { type: Number, min: 0, max: 5 },
    comments:      [ String ]
});

module.exports = Review;