/*for hannahs form*/
var Review = require("../models/reviews");

exports.create = (req, res) => {
    console.log("create was called");

    if(!req.body.restaurant || !req.body.food || !req.body.service || !req.body.price || !req.body.comments) {
        return res.status(400).send({
            message: "Required field can not be empty",
        });
    }

    	// Create a student from the submitted form data
	var rev = new Review({
        restaurant: req.body.restaurant,
        food: req.body.food,
        service: req.body.service,
        price: req.body.price,
        comments: req.body.comments,
    });

    console.log("New review:" + rev);
  
    rev
     .save()
     .then((data) => {
         res.send(data);
     })
     .catch((err) => {
         res.status(500).send({
             message: err.message || "Some error occured while creating the Review.",
         });
     });
};

exports.findAll =(req, res) => {
    Review.find()
     .then((reviews) => {
         console.log("findAll called");
         res.status(200).send(reviews);
     })
     .catch((err) => {
         res.status(500).send({
             message: err.message || "Error Occured",
         })
     });
};