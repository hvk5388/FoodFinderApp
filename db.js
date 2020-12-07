// db.js
var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://hannah:stevenhaynes@cluster0.fplbw.mongodb.net/mydb?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the Atlas MongoDB database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
//mongoose.connect('mongodb+srv://hannah:stevenhaynes@cluster0.fplbw.mongodb.net/mydb?retryWrites=true&w=majority');
module.exports = mongoose;