/* NPM start*/

const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/*Express*/
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), {extensions:'html'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/restaurants.html', (req, res) => {
	res.redirect('/restaurants.html')
})

/*Use to store favorites, temporarily*/
let favorites = [];

/*Configuring body parser middleware*/
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

/*Add to favorite list*/
app.post('/favorite', (req, res) => {
	const favorite = req.body;

	/*Output the book to the console for debugging*/
	console.log(favorite);
	favorites.push(favorite);

	/*Redirect to favorites page once added to array*/
	res.redirect('../favorites.html')
});

/*Get all favorites API*/
app.get('/RestFavorites', (req, res) => {
	res.json(favorites);
});

/*Return favorite ID using link*/
app.get('/favorite/:id', (req, res) => {
	/* Reading id from the URL */
	const id = req.params.id;

	/*Searching favorties*/
	for (let favorite of favorites) {
		if (favorite.id === id) {
			res.json(favorite);
			return;
		}
	}

	/*Sending 404 when not found something*/
	res.status(404).send('Not found');
});

/*Delete favorite given ID using link*/
app.delete('/favorite/:id', (req, res) => {
	/* Reading id from the URL */
	const id = req.params.id;

	 /*Searching favorties to remove item from array*/
	 favorites = favorites.filter(i => {
        if (i.id !== id) {
            return true;
        }
        return false;
	});

	res.send('Deleting favorite...');
});

module.exports = app;


//hannah's work

var Review = require("./models/reviews");

app.post("/create", function(req, res) {

	// Create a student from the submitted form data
	var rev = new Review(req.body);
 
	rev.save(function(err, rev) {
	   if (err) {
		  res.status(400).send(err);
	   } 
	   else {
		  res.send("Review was saved.");
	   }
	});
 });

 module.exports = app;