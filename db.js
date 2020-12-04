// db.js
var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://hannah:stevenhaynes@cluster0.fplbw.mongodb.net/mydb?retryWrites=true&w=majority');
module.exports = mongoose;